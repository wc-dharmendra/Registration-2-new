import React, { useCallback, useState, Fragment, useLayoutEffect } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';
import Button from '../Button/Button';
import useCreateEvent from '@/CustomHook/useCreateEvent';
import Svg from '../../../public/Assets/Svg';
import Input from '../InputForm/InputForm';
import useEventStore from '@/Store/useEventStore';

const containerStyle = {
    width: '100%',
    height: '170px',
};

const libraries = [process.env.NEXT_PUBLIC_GOOGLE_PLACE];

const GoogleMapComponent = ({
    onMapChange = () => { },
    inputData = {}
}) => {

    const {
        openLocation,
        locationRef,
        mapLoactionRef,
        handleLocationOpen,
    } = useCreateEvent();

    const { setMapData } = useEventStore();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        libraries
    });

    const [map, setMap] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [infoWindowVisible, setInfoWindowVisible] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("Add Event Location");
    const [showInstruction, setShowInstruction] = useState(false);


    const onLoad = useCallback((map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const onPlaceChanged = useCallback(() => {
        if (autocomplete) {
            const place = autocomplete?.getPlace();
            if (place?.geometry) {
                const newCenter = {
                    lat: place?.geometry?.location?.lat(),
                    lng: place?.geometry?.location?.lng(),
                };
                setCurrentLocation(newCenter);
                setSelectedLocation(place?.name);
                setMap((prevMap) => {
                    if (prevMap) {
                        prevMap.panTo(newCenter);
                    }

                    return prevMap;
                });
                if (setMapData) setMapData(place);

                if (locationRef?.current) {
                    locationRef?.current?.click()
                }
            }
        }
    }, [autocomplete, map]);


    useLayoutEffect(() => {
        if (inputData?.event_id && inputData?.map_data?.lat) {
            setCurrentLocation(inputData?.map_data);
            setSelectedLocation(inputData?.address);
        }
    }, [inputData?.event_id]);

    // const findPlace = (lat, lang) => {
    //     fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lang}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data?.status === 'OK') {
    //                 const placeName = data?.results?.[0]?.formatted_address;
    //                 setSelectedLocation(placeName);
    //             } else {
    //                 console.error('Error:', data?.status);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }

    // useEffect(() => {
    //     if (navigator?.geolocation) {
    //         navigator?.geolocation?.getCurrentPosition(
    //             (position) => {
    //                 const { latitude, longitude } = position?.coords;
    //                 findPlace(latitude, longitude);
    //                 setCurrentLocation({ lat: latitude, lng: longitude });
    //             },
    //             (error) => {
    //                 console.error('Error getting current location:', error);
    //             }
    //         );
    //     }
    // }, []);

    return isLoaded ? (

        <Fragment>
            <div className="relative mb-1.5">
                <Button
                    type="button"
                    buttonRef={locationRef}
                    onClick={handleLocationOpen}
                    className="bg-[#EFEFF0] w-full  px-4 py-2.5 text-left rounded-md mb-0 text-[14px] color-[#131517] font-medium"
                >
                    {selectedLocation}
                </Button>
                {openLocation ? (
                    <div
                        ref={mapLoactionRef}
                        className="relative top-[100%] left-0 w-full mt-1.5 z-10 bg-[#ffffff] rounded-md boxShadow"
                    >
                        <div className="w-full">
                            <Autocomplete
                                onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                                onUnmount={() => setAutocomplete(null)}
                                onPlaceChanged={onPlaceChanged}
                            >
                                <div className="w-full">
                                    <input
                                        autoFocus
                                        placeholder="Enter Location"
                                        className="SearchLocation rounded-sm"
                                    />
                                </div>
                            </Autocomplete>
                        </div>
                    </div>
                ) : null}
            </div>
            {selectedLocation && selectedLocation !== "Add Event Location" ? <><div className="bg-[#EFEFF0] w-full pl-1 p-1 rounded-lg mb-1">
                <div className="flex justify-between items-baseline">
                    {currentLocation?.lat ? <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={currentLocation}
                        zoom={currentLocation ? 12 : 5}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={{
                            fullscreenControl: false,
                            keyboardShortcuts: false,
                            mapTypeControl: false,
                            rotateControlOptions: false,
                            streetViewControl: false,  // Disable street view control
                            clickableIcons: false,
                        }}
                    >
                        <Marker onClick={() => {
                            // Handle marker click (e.g., show a popup)
                            console.log('Marker clicked:', currentLocation);
                        }} position={{ lat: currentLocation?.lat, lng: currentLocation?.lng }}>

                            {infoWindowVisible && (
                                <InfoWindow
                                    position={{ lat: currentLocation?.lat, lng: currentLocation?.lng }}
                                    onCloseClick={() => setInfoWindowVisible(false)}>
                                    <div>
                                        <p>Predefined Popup Content</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    </GoogleMap> : null}
                </div>

            </div>
                <div className="w-full">
                    {!inputData?.address_1 && !showInstruction ? <Button
                        type="button"
                        className="bg-[#EFEFF0] text-[#595C5C] text-[14px] rounded-lg px-3 py-2 font-medium flex gap-2 items-center hover:bg-[#969498] hover:text-[#fff] fill-[#595C5C] hover:fill-[#fff]"
                        onClick={() => setShowInstruction(true)}
                    >
                        {Svg().PlusIcon} Add Further Instruction
                    </Button> : null}
                    {showInstruction || inputData?.address_1 ? <Input val={inputData?.address_1} onChange={(e) => { if (onMapChange) onMapChange({ target: { name: "address_1", value: e?.target?.value } }); }} autoFocus inputCls="w-full outline-none" placeholder="Apartment 5, Lane No.9" label="Instruction" /> : null}
                </div>
            </>
                : null}
        </Fragment>

    ) : <></>;
};

export default React.memo(GoogleMapComponent);