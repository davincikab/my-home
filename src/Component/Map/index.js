import React, {useEffect, useState} from "react";

import ReactMapboxGl, {Source, Layer, Popup, Marker } from 'react-mapbox-gl';
import { useLocation, Link, Route } from 'react-router-dom';

import style from '../../assets/mapstyles';

// firebase
import { withFirebase } from '../Firebase';
import './Map.css';

import polyline from '../../utils/polyline';

import FilterTab from "../FilterSection";
import { GeolocateControl } from "mapbox-gl";
import Button from "../Button";

// access token
const ACCESS_TOKEN = 'pk.eyJ1IjoiZGF1ZGk5NyIsImEiOiJjanJtY3B1bjYwZ3F2NGFvOXZ1a29iMmp6In0.9ZdvuGInodgDk7cv-KlujA'
const Map = ReactMapboxGl({
    accessToken:ACCESS_TOKEN  
});

const MapboxDirections = window.MapboxDirections;
const directionControl = new MapboxDirections({
    // styles:[style],
    unit: 'metric',
    accessToken:ACCESS_TOKEN,
    profile:"mapbox/driving",
    interactive:false
});

const geolocateControl =  new GeolocateControl({
    trackUserLocation:true,
    showAccuracyCircle:false,
    showUserLocation:true
});

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
    const [destination, setDestination] = useState([]);
    const [origin, setOrigin] = useState([]);
    const [route, setRoute] = useState({});
    const [userLocation, setUserLocation] = useState([]);

    let query = useQuery();
    useEffect(() => {
        // get the data from firebase
        props.firebase.homes().on("value", snapshot => {
            let homesSnapshot = createGeojson(snapshot.val());

            // update homes data
            setHomes(homesSnapshot);
            setData(homesSnapshot);

            if(query.get('id')) {
                let id = query.get('id');

                // update active home object
                let home = homesSnapshot.features.find(feature => feature.properties.id === parseInt(id));

                setCenter(home.geometry.coordinates);
                setZoom(10.5);

                // active home from the search
                setActiveHome(home);
            }
    
        });
        
        return function cleanup() {
            props.firebase.homes().off();
        }
        
    }, []);

    // filter homes with a given population
    const filterPopulation = (value) => {
        let filterHomes = JSON.parse(JSON.stringify(data));

        filterHomes.features = filterHomes.features.filter(home => home.properties.population < value);
        setHomes(filterHomes);
    }

    const filterBeds = (value) => {
        let filterHomes = JSON.parse(JSON.stringify(data));

        filterHomes.features = filterHomes.features.filter(home => home.properties.beds < value);
        setHomes(filterHomes);
    }

    const createGeojson = (data) => {
        let dummyGeojson = {
            "type": "FeatureCollection",
            "features": [
            ]
        };

        data.forEach(home => {
            let feature = {
                "type": "Feature",
                "properties": home,
                "geometry": {
                  "type": "Point",
                  "coordinates": [home.longitude, home.latitude]
                }
            }

            dummyGeojson.features.push(feature)
        });

        console.log(dummyGeojson);

        return dummyGeojson;
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

            setZoom(currentZoom);
            setCenter(currentCenter);
            setActiveHome(null);
        } else {
            setPopupData({});
        }
    }

    const onFeatureEnter = (event) => {
        // update the popupdata
        event.target.getCanvas().style.cursor = "pointer";
    }

    const onFeatureLeave = (event) => {
        // update the popupdata
        event.target.getCanvas().style.cursor = "";
    }

    const updateDestination = (coordinate) => {
        console.log(coordinate);
        setActiveHome(null);
        // setPopupData(null);

        // setDestination(coordinate);

        if(userLocation[0]) {
            directionControl.setOrigin(userLocation);
            setOrigin(userLocation);
        }
        
        directionControl.setDestination(coordinate);
    }

    // add control to the map 
    const addControl = (map) => {

        if(!isDirectionAdded) {
            console.log("directions");

            // this.
            map.addControl(directionControl, 'top-right');
            setIsDirectionAdded(true);

            directionControl.on("route", function(routes) {
                // console.log(routes);
                routes = routes.route;
                let features = routes.map(route => {
                    let coordinates = polyline.decode(route.geometry);

                    // console.log(coordinates);
                    coordinates.forEach(coord => coord.reverse());
                    return {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": coordinates
                        }
                    }
                });

                console.log(features);

                // update popup content
                setPopupData({});

                // update route
                setRoute({
                    "type": "FeatureCollection",
                    "features":features
                });
                
            });

            directionControl.on("clear", function(e) {
                console.log(e);
                setRoute({});
                if(e.type == 'origin') {
                    setOrigin([]);
                } else {
                    setDestination([]);
                }
            });

            directionControl.on("origin", function(e) {
                setOrigin(e.feature.geometry.coordinates);
            });

            directionControl.on("destination", function(e) {
                setDestination(e.feature.geometry.coordinates);
            });

            // geolocation
            geolocateControl.on('geolocate', function(position) {
                console.log(position);

                // update user location
                setUserLocation([
                    position.coords.longitude,
                    position.coords.latitude
                ]);

            });

            map.addControl(
               geolocateControl,
                 'top-left'
            );
        }
    };

    console.log(route);
    return (
        <div className="container-fluid">
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
                onStyleLoad={addControl}
            >
                {
                    route.type &&
                    <Source id="route-source" geoJsonSource={{
                        type:"geojson",
                        data:route
                    }} />
                }
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
                        <PopupComponent popupData={popupData} setDestination={updateDestination} firebase={props.firebase}/>
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
                        <PopupComponent popupData={activeHome} setDestination={updateDestination} firebase={props.firebase}/>
                    </Popup>
                }

                { origin[0] &&
                    <Marker
                        coordinates={origin}
                        anchor="bottom"
                    >
                        <div className="marker-div">A</div>
                    </Marker>
                }

                { destination[0] &&
                    <Marker
                        coordinates={destination}
                        anchor="bottom"
                    >
                        <div className="marker-div marker-destination">B</div>
                    </Marker>
                }

                {
                    route.type && 
                    <Layer 
                        type="line"
                        id="route-layer" 
                        sourceId="route-source"
                        layout={{ 
                            "visibility":"visible"
                        }}
                        paint={{
                            'line-color': '#2d5f99',
                            'line-width': 5
                        }}
                    />
                }
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
const PopupComponent = ({popupData, setDestination, firebase}) => {
    let url = "pictures/" + popupData.properties.name + ".jpg";

    const [imageUrl, setImageUrl] = useState('');
    const picture = firebase.picture(url);

    useEffect(() => {
        picture.getDownloadURL()
        .then(imageUrl => {
            setImageUrl(imageUrl);
            console.log(imageUrl);
        })
        .catch(error => {
            console.error(error);
        });
    
    }, [url]);
   
    return (
        <div className="popup-content">
            <h1 className="popup-title">{popupData.properties.name}</h1>
            <div className="popup-body">
                <p><b>Owner    </b> {popupData.properties.registration_details}</p>
                <p><b>Population</b> {popupData.properties.population}</p>
                <p><b>Tel Phone</b> {popupData.properties.telephone_no}</p>
            </div>

            {
                imageUrl && 
                <img 
                    src={imageUrl} 
                    alt={popupData.properties.name}
                    className="img-thumbnail"
                />
            }

            <div className="d-flex more-info">
                <Button 
                    className="btn my-2 mx-2 btn-outline-none" 
                    onClick={() => setDestination(popupData.geometry.coordinates)} 
                    text="Get Direction"
                />

                <span className="mr-1">
                    <Link to={`/my-home/about/${popupData.properties.name}/${popupData.properties.id}/`} >More info ...</Link>
                </span>
            </div>

        </div>
    );

}


const MapContainer = withFirebase(MapComponent);
export default MapContainer;

// TODO: Sort route display