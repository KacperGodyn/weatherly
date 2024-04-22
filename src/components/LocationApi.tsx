import React, { useState, useEffect } from 'react';

interface CustomPosition {
    coords: {
        latitude: number;
        longitude: number;
    };
}

interface LocationApiProps {
    apiKey: string;
}

const LocationApi: React.FC<LocationApiProps> = ({ apiKey }) => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [locationName, setLocationName] = useState<string | null>(null); // New state variable to store location name

    const getApproxLocation = async () => {
        try {
            const position = await new Promise<CustomPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
        } catch (error) {
            console.error('Error getting approximate location:', error);
        }
    };

    useEffect(() => {
        // Fetch data when component is mounted
        getApproxLocation();
    }, []); // Empty dependency array means this effect runs only once when the component is mounted

    useEffect(() => {
        // Fetch data only if location is available
        if (location) {
            fetchLocationData();
        }
    }, [location, apiKey]); // Run effect whenever location or apiKey changes

    const fetchLocationData = async () => {
        try {
            if (location) {
                const response = await fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${location.latitude},${location.longitude}&apiKey=${apiKey}`);
                const data = await response.json();
                const locationName = data.items[0].title; // Extract location name from response
                setLocationName(locationName); // Set location name in state
            } else {
                console.error('Location is null');
            }
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    return (
        <div>
            {locationName && <p>Your approx. location: {locationName}</p>}
        </div>
    );
};

export default LocationApi;
