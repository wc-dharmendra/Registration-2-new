import React, { useCallback, useState, useEffect, Fragment } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '306px',
    height: '170px', // Adjust the height as needed
};

const GoogleMapComponent = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        libraries: ['places']
    });

    const [map, setMap] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [infoWindowVisible, setInfoWindowVisible] = useState(false);

    const onLoad = useCallback((map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete?.getPlace();
            if (place?.geometry) {
                setMap((prevMap) => {
                    if (prevMap) {
                        const newCenter = {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                        };
                        prevMap.panTo(newCenter);
                        setCurrentLocation(newCenter);
                    }
                    return prevMap;
                });
            }
        }
    };

    useEffect(() => {
        // Get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        }
    }, []);

    return isLoaded ? (
        <Fragment>
            <Autocomplete
                key="autocomplete"
                onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                onUnmount={() => setAutocomplete(null)}
                onPlaceChanged={onPlaceChanged}
            >
                <div className="w-full">
                    <input
                        placeholder="Enter Location"
                        className="SearchLocation"
                    />
                </div>
            </Autocomplete>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentLocation}
                zoom={currentLocation ? 12 : 5} // Adjust zoom level based on current location availability
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <Marker onClick={() => {
                    // Handle marker click (e.g., show a popup)
                    console.log('Marker clicked:', currentLocation);
                }} position={{ lat: currentLocation.lat, lng: currentLocation.lng }}>

                    {infoWindowVisible && (
                        <InfoWindow
                            position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
                            onCloseClick={() => setInfoWindowVisible(false)}
                        >
                            <div>
                                <p>Predefined Popup Content</p>
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            </GoogleMap>
        </Fragment>

    ) : <></>;
};

export default React.memo(GoogleMapComponent);