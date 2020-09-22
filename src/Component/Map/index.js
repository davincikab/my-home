import React, {useEffect, useState} from "react";
import ReactMapboxGl, {Source, Layer, Feature, Popup, MapContext } from 'react-mapbox-gl';

// firebase
import {withFirebase } from '../Firebase';
import './Map.css';

import FilterTab from "../FilterSection";

// access token
const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiZGF1ZGk5NyIsImEiOiJjanJtY3B1bjYwZ3F2NGFvOXZ1a29iMmp6In0.9ZdvuGInodgDk7cv-KlujA'
});

function MapComponent(props) {
    const [homes, setHomes] = useState([]);
    const [data, setData] = useState(null);
    const [popupData, setPopupData] = useState({});
    const [zoom, setZoom] = useState(10);
    const [center, setCenter] = useState([34.9321088,-0.6299662865]);
    const [visualType, setVisualType] = useState('symbol');
    const [visualField, setVisualField] = useState("");

    useEffect(() => {
        // get the data from firebase
        props.firebase.homes().on("value", snapshot => {
            // update homes data
            setHomes(snapshot.val());
            setData(snapshot.val());
        });
    }, [props.firebase]);

    // filter homes with a given population
    const filterPopulation = (value) => {
        let filterHomes = JSON.parse(JSON.stringify(data));

        filterHomes.features = filterHomes.features.filter(home => home.properties.Population < value);
        setHomes(filterHomes);
    }

    const filterBeds = (value) => {
        let filterHomes = JSON.parse(JSON.stringify(data));

        filterHomes.features = filterHomes.features.filter(home => home.properties.beds < value);
        setHomes(filterHomes);
    }
    // update visual type
    const handleVisualTypeChange = (type, field) => {

        console.log(homes);

        setVisualType(type);
        setVisualField(field);
    } 

    // load missing images
    const onStyleImageMissing = (map) => {
        // add images
        if(!map.hasImage("home")) {
            map.loadImage(require('../../assets/images/location.png'), function(error, image) {
                if (error) {
                    console.log(error);
                    return;
                }
                if(!map.hasImage("home")) map.addImage("home", image);
            });
        }
    };

    const onMapClick = (map, event) => {
        let features = map.queryRenderedFeatures(event.point, {layers:["homes"]});
       
        // get map zoom 
        let currentZoom = map.getZoom();
        let currentCenter = map.getCenter();

        if(features[0]) {
            // get the clicked layer
            let feature = features[0];

            let activeHome = homes.features.find(hme => hme.properties.id === feature.properties.id);
            setPopupData(activeHome);
        } else {
            setPopupData({});
        }

        setZoom(currentZoom);
        setCenter(currentCenter);
        
    }

    const onFeatureEnter = (event) => {
        // update the popupdata
        event.target.getCanvas().style.cursor = "pointer";
    }

    const onFeatureLeave = (event) => {
        // update the popupdata
        event.target.getCanvas().style.cursor = "";
    }

    // add control to the map 
    const addControl = (map) => {
        class WorkControl {
            onAdd(map) {
                this._map = map;
                this._container = document.createElement('div');
                this._container.className = 'mapboxgl-ctrl';
                this._container.textContent = 'Hello, world';
                return this._container;
            }

           onRemove() {
                this._container.parentNode.removeChild(this._container);
                this._map = undefined;
            }
        }


        // map.addControl(new WorkControl()); GoldfishGoldfish66
    };

    return (
        <div className="container">
          <Map
            style='mapbox://styles/mapbox/light-v10'
            containerStyle={{
                height: '90.3vh',
                width: '100vw'
            }}
            center={center}
            zoom={[zoom]}
            onStyleImageMissing={onStyleImageMissing}
            onClick={onMapClick}
            >
            {
                 homes.type &&
                 <Source id="home-source" geoJsonSource={{
                     type:"geojson",
                     data:homes
                 }} />
            }
            
            {  
                visualType === "symbol" && homes.type &&
                <Layer 
                    type="symbol" 
                    id="homes" 
                    layout={{ 'icon-image': "home"}}
                    sourceId="home-source"
                    onMouseEnter={onFeatureEnter}
                    onMouseLeave={onFeatureLeave}
                >
                </Layer>
            }

            {   
                visualField && visualType == "circle" &&
                <Layer 
                    type="circle" 
                    id="homes" 
                    sourceId="home-source"
                    layout={{ 
                        "visibility":"visible"
                    }}
                    paint={{
                        'circle-radius':[
                            'interpolate',
                            ['linear'],
                            ['get', visualField],
                            10,
                            5,
                            200,
                            20
                        ],
                        'circle-color':"#E5573D",
                        'circle-opacity':0.75
                    }}
                    onMouseEnter={onFeatureEnter}
                    onMouseLeave={onFeatureLeave}
                >
                </Layer>
            }

            {
                popupData.geometry &&
                <Popup
                    coordinates={popupData.geometry.coordinates}
                    offset={{
                        'bottom-left': [12, -38],  'bottom': [0, 0], 'bottom-right': [-12, -38]
                    }}
                >
                    <div className="popup-content">
                        <h1 className="popup-title">{popupData.properties.Name}</h1>
                        <div className="popup-body">
                            <p><b>Owner</b> {popupData.properties.Owner}</p>
                            <p><b>Population</b> {popupData.properties.Population}</p>
                            <p><b>Tel Phone</b> {popupData.properties.telephone_no}</p>
                        </div>
                    </div>
                </Popup>
            }

                <MapContext.Consumer>
                    {(map) => {
                        // use `map` here
                        addControl(map);
                    }}
                </MapContext.Consumer>
           
            </Map>

            {
                homes.type &&
                <FilterTab 
                onVisualTypeChange={handleVisualTypeChange}
                filterPopulation={filterPopulation}
                filterBeds={filterBeds}
            />
            }
            
        </div>
    );
}


// popup component

const MapContainer = withFirebase(MapComponent);
export default MapContainer;