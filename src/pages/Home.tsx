import React from 'react';
import LocationApi from '../components/LocationApi';

export const Home = () => {
  const locationApiKey = "process.env.REACT_APP_LOCATION_API_KEY";

  return (
    <div>
      <LocationApi apiKey={locationApiKey} />
    </div>
  );
};
