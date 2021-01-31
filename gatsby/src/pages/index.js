import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

// **Note that because Gatsby creates everything at build-time, it isn't (at the moment) geared towards
// adding regularly changing information (eg. Slicemasters working today).
// For now, the solution to this is to pull the data directly from Sanity graphql through a custom hook to fetch the data

const CurrentlySlicing = ({ slicemasters }) => {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On </span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now!</p>
      )}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
};

const HotSlices = ({ hotSlices }) => {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hotslices On</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothing in the case!</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
};

const HomePage = () => {
  const { slicemasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
};
export default HomePage;
