import React from "react";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

// access token
const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiZGF1ZGk5NyIsImEiOiJjanJtY3B1bjYwZ3F2NGFvOXZ1a29iMmp6In0.9ZdvuGInodgDk7cv-KlujA'
});

function MapContainer(props) {
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
            >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
            </Layer>
            </Map>
        </div>
    );
}

export default MapContainer;