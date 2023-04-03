import './styles/main.scss';
import Galaxy from './components/Galaxy';
import Spinner from './components/Spinner';
import React, { useState, useEffect } from 'react';
import { getSpaceShipsWithPilots } from './api';
import SpaceShipStar from './components/SpaceShipStar';
import SpaceShipDetail from './components/SpaceShipDetail';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [spaceShips, setSpaceShips] = useState(null);
  useEffect(() => {
    getSpaceShipsWithPilots()
      .then((res) => setSpaceShips(res))
      .then(() => setIsLoaded(true));
  }, []);
  return (
    <Galaxy>
      {isLoaded ? <Content spaceShips={spaceShips} isLoading={isLoaded} /> : ''}
      <Spinner isLoading={!isLoaded} />
    </Galaxy>
  );
}

/**
 * Main content of the app
 */
function Content({ spaceShips, isLoading }) {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [spaceShipSelected, setSpaceShipSelected] = useState(null);

  /** Handle the on click star to open the detail modal */
  function openDetailModal(spaceShip) {
    setIsOpenDetail(true);
    setSpaceShipSelected(spaceShip);
  }

  /** Handle the the on close detail modal */
  function onCloseDetail() {
    setIsOpenDetail(false);
    setSpaceShipSelected(null);
  }

  return (
    <>
      <section>
        {spaceShips.map((spaceShip, index) => {
          return <SpaceShipStar spaceShip={spaceShip} key={index} openDetail={openDetailModal}></SpaceShipStar>;
        })}
      </section>
      <section className='text'>
        <div className='crawl'>
          <h1>Technical Project</h1>
          <h2>Episode II</h2>
          <h3>Description:</h3>
          <p>
            To create an Angular or React app that allows users to navigate among the different Star Wars spaceships and
            pilots. It’s not that we are big SW fans, but hey! this is still much more fun than stock exchange ;) See
            the section Web Service for the data.
          </p>
          <h3>Landing page:</h3>
          <ul>
            <li>
              The landing page should show the list of all Star Wars spaceships with a summary of the specifications for
              each of them.
            </li>
            <li>
              When clicking on a starship, it shows the details of the spaceship, including the list of the pilots.
            </li>
            <li>
              When clicking on a pilot listed in the spaceship details, the app leads the user to the details of the
              selected pilot.
            </li>
          </ul>
          <h3>Constraints:</h3>
          <ol>
            <li>
              It’s mandatory to be able to come back to the spaceship list at any moment, or to the last page visited.
            </li>
            <li>
              Data should load only once when the app is launched. It should not call the API thereafter, as long as the
              page is not refreshed.
            </li>
            <li>You can’t use the “wrapper swapi” offered on the site for the calls made to the web service.</li>
          </ol>
          <h3>How did I deal with this exercise?</h3>
          <p>
            I tried to be original in the design of this exercise. So, instead of making a traditional list of
            spaceships, all the spaceships are dispatched in the galaxy ({spaceShips.length} items). You have to search
            for them with your mouse by flying over the stars. When you hover over a ship, you see a summary of it. You
            can then click on it to see the details and the associated pilots.
          </p>
          <p>Have fun...</p>
        </div>
      </section>
      <SpaceShipDetail isOpen={isOpenDetail} spaceShip={spaceShipSelected} onClose={onCloseDetail} />
    </>
  );
}

export default App;
