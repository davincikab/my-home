import React, {useEffect, useState} from "react";

import fs from 'fs';

import ReactMapboxGl, {Source, Layer, Popup, MapContext } from 'react-mapbox-gl';
import { useLocation } from 'react-router-dom';

// firebase
import {withFirebase } from '../Firebase';
import './Map.css';

import FilterTab from "../FilterSection";
import { GeolocateControl } from "mapbox-gl";

// access token
const ACCESS_TOKEN = 'pk.eyJ1IjoiZGF1ZGk5NyIsImEiOiJjanJtY3B1bjYwZ3F2NGFvOXZ1a29iMmp6In0.9ZdvuGInodgDk7cv-KlujA'
const Map = ReactMapboxGl({
    accessToken:ACCESS_TOKEN  
});

const MapboxDirections = window.MapboxDirections;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function MapComponent(props) {
    const [homes, setHomes] = useState([]);
    const [data, setData] = useState(null);
    const [popupData, setPopupData] = useState({});
    const [zoom, setZoom] = useState(10);
    const [center, setCenter] = useState([34.9321088,-0.6299662865]);
    const [visualType, setVisualType] = useState('symbol');
    const [visualField, setVisualField] = useState("");
    const [isDirectionAdded, setIsDirectionAdded] = useState(false);
    const [activeHome, setActiveHome] = useState();
    const [userLocation, setUserLocation] = useState();

    let query = useQuery();
    useEffect(() => {
        // get the data from firebase
        props.firebase.homes().on("value", snapshot => {
            let homesSnapshot = snapshot.val();

            // update homes data
            setHomes(homesSnapshot);
            setData(homesSnapshot);

            if(query.get('id')) {
                // update active home object
                let home = homesSnapshot.features.find(feature => feature.properties.id == query.get('id'));
                setCenter(home.geometry.coordinates);
                setZoom(12);

                setActiveHome(home);

                console.log('activeHome');
                console.log(data);
            }
    
        });
        
        return function cleanup() {
            props.firebase.homes().off();
        }
        
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
        setActiveHome(null);
        
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
        console.log(map);

        if(!isDirectionAdded) {
            const directionControl = new MapboxDirections({
                unit: 'metric',
                accessToken:ACCESS_TOKEN
            });

            // this.
            map.addControl(directionControl, 'top-right');
            setIsDirectionAdded(true);

        }
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
                visualField && visualType === "circle" &&
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
                    <PopupComponent popupData={popupData} />
                </Popup>
            }
            {
                activeHome &&
                <Popup
                    coordinates={activeHome.geometry.coordinates}
                    offset={{
                        'bottom-left': [12, -38],  'bottom': [0, 0], 'bottom-right': [-12, -38]
                    }}
                >
                    <PopupComponent popupData={activeHome} />
                </Popup>
            }

                <MapContext.Consumer>
                    {(map) => {
                        // use `map` here
                        addControl(map);
                        
                    }}
                </MapContext.Consumer>
                <GeolocationControl />
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
const PopupComponent = ({popupData}) => (
    <div className="popup-content">
        <h1 className="popup-title">{popupData.properties.Name}</h1>
        <div className="popup-body">
            <p><b>Owner</b> {popupData.properties.Owner}</p>
            <p><b>Population</b> {popupData.properties.Population}</p>
            <p><b>Tel Phone</b> {popupData.properties.telephone_no}</p>
        </div>
    </div>
);

const GeolocationControl = (props) => {
    // geolocation logic
    return (
        <div style={{...positions['bottom-right'], position:'absolute'}}>
            <button>
                <img src={require('../../assets/images/geolocate.svg')}/>
            </button>
        </div>
    )
}

var positions = {
    'top-right': { top: 10, right: 10, bottom: 'auto', left: 'auto' },
    'top-left': { top: 10, left: 10, bottom: 'auto', right: 'auto' },
    'bottom-right': { bottom: 20, right: 10, top: 'auto', left: 'auto' },
    'bottom-left': { bottom: 10, left: 10, top: 'auto', right: 'auto' }
};

var containerStyle = {
    position: 'absolute',
    zIndex: 10,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, .3)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    right: 50,
    backgroundColor: '#fff',
    opacity: 0.85,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    padding: '3px 7px'
};

const MapContainer = withFirebase(MapComponent);
export default MapContainer;