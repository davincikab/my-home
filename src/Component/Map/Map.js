import React, {useEffect, useState} from "react";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

// firebase
import {withFirebase } from '../Firebase';

// access token
const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiZGF1ZGk5NyIsImEiOiJjanJtY3B1bjYwZ3F2NGFvOXZ1a29iMmp6In0.9ZdvuGInodgDk7cv-KlujA'
});

function MapComponent(props) {
    const [homes, setHomes] = useState([]);

    useEffect(() =>{
        // get the data from firebase
        props.firebase.homes().on("value", snapshot => {
            // update homes data
            setHomes(snapshot.val().features);
        })
    }, [props.firebase]);

    const onStyleImageMissing = (map, e) => {
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

    console.log(homes);
    return (
        <div>
          <Map
            style='mapbox://styles/mapbox/light-v10'
            containerStyle={{
                height: '91.3vh',
                width: '100vw'
            }}
            center={[34.9321088,-0.6299662865]}
            zoom={[10]}
            onStyleImageMissing={onStyleImageMissing}
            >
            
            {   
                homes[0] &&
                <Layer type="symbol" id="marker" layout={{ 'icon-image': "home"}}>
                  {
                    homes.map(home => (
                        <Feature key={home.properties.id} coordinates={home.geometry.coordinates} />
                    ))
                  }
                </Layer>
            }
           
            </Map>
        </div>
    );
}

const CreateFeatures = (props) => {
    console.log(props);
    console.log("Createing");
    return 
        props.data.map(home => (
            <Feature key={home.properties.id} coordinates={home.geometry.coordinates} />
        ))
    
}

const MapContainer = withFirebase(MapComponent);
export default MapContainer;