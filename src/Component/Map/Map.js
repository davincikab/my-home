import React, {useEffect, useState} from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

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
    const [popupData, setPopupData] = useState({});
    const [zoom, setZoom] = useState(10);
    const [center, setCenter] = useState([34.9321088,-0.6299662865]);
    const [visualType, setVisualType] = useState('symbol');

    useEffect(() =>{
        // get the data from firebase
        props.firebase.homes().on("value", snapshot => {
            // update homes data
            setHomes(snapshot.val().features);
        })
    }, [props.firebase]);

    // update visual type
    const handleVisualTypeChange = (type, field) => {
        setVisualType(type);
    } 

    // load missing images
    const onStyleImageMissing = (map) => {
        // add images
        if(!map.hasImage("home")) {
            map.loadImage(require('../../assets/images/home.png'), function(error, image) {
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

            let activeHome = homes.find(hme => hme.properties.id === feature.properties.id);
            setPopupData(activeHome);
        } else {
            setPopupData({});
        }

        setZoom(currentZoom);
        setCenter(currentCenter);
        
    }

    const onFeatureClick = (event, home) => {
        // update the popupdata
        setPopupData(home);
        event.originalEvent.stopPropagation();

        console.log(event);
    }

    return (
        <div className="container">
          <Map
            style='mapbox://styles/mapbox/light-v10'
            containerStyle={{
                height: '91.3vh',
                width: '100vw'
            }}
            center={center}
            zoom={[zoom]}
            onStyleImageMissing={onStyleImageMissing}
            onClick={onMapClick}
            >
            
            {   
                homes[0] &&
                <Layer type="symbol" id="homes" layout={{ 'icon-image': "home"}}>
                  {
                    homes.map(home => (
                        <Feature 
                            key={home.properties.id} 
                            coordinates={home.geometry.coordinates} 
                            onClick={e => onFeatureClick(e, home)}
                        />
                    ))
                  }
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
           
            </Map>

            {/* filter tab */}
            <FilterTab 
                onVisualTypeChange={handleVisualTypeChange}
            />
        </div>
    );
}


// popup component

const MapContainer = withFirebase(MapComponent);
export default MapContainer;