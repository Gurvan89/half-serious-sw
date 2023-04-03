import { ReactComponent as PilotSvg } from '../image/pilot.svg';
import { ReactComponent as PilotWomanSvg } from '../image/pilot_woman.svg';
import React, { useState } from 'react';

/**
 * Space ship detail modal component
 * To shoe the detail of the space ship and all the related pilots
 */
export default function SpaceShipDetail({ isOpen, spaceShip, onClose }) {
  function onClickOutside(evt) {
    const className = evt.target.className;
    if (typeof className === 'string' && className.includes('space-ship-detail')) {
      onClose();
    }
  }
  return (
    <div
      className={'space-ship-detail ' + (isOpen ? 'space-ship-detail--open' : '')}
      onClick={(evt) => onClickOutside(evt)}
    >
      <div className='space-ship-detail__content'>
        <span onClick={onClose}>&#x2716;</span>
        {spaceShip ? <DetailContent spaceShip={spaceShip} /> : ''}
      </div>
    </div>
  );
}

function DetailContent({ spaceShip }) {
  const pilots = spaceShip.pilots;
  const [pilotSelected, setPilotSelected] = useState(pilots.length ? pilots[0] : null);
  return (
    <div>
      <h1>{spaceShip.name}</h1>
      <div>
        <span>Model: </span> {spaceShip.model}
      </div>
      <div>
        <span>The maximum number of kilograms that this starship can transport: </span> {spaceShip.cargo_capacity}
      </div>
      <div>
        <span>Cost (galactic credits): </span> {spaceShip.cost_in_credits}
      </div>
      <div>
        <span>The Maximum number of Megalights: </span> {spaceShip.MGLT}
      </div>
      <div>
        <span>Manufacturer: </span> {spaceShip.manufacturer}
      </div>
      <div>
        <span> The number of personnel needed to run or pilot this starship: </span> {spaceShip.crew}
      </div>
      <div className='pilots'>
        <span>Was piloted by: </span>
        <div>
          {pilots.length > 0 ? (
            pilots.map((pilot, index) => {
              return pilot !== null ? (
                <div
                  className={'pilots__pilot ' + (pilotSelected.name === pilot.name ? 'pilots__pilot--selected' : '')}
                  key={index}
                  onClick={() => setPilotSelected(pilot)}
                >
                  {pilot.gender === 'male' ? <PilotSvg /> : <PilotWomanSvg />}
                </div>
              ) : (
                ''
              );
            })
          ) : (
            <strong>No pilots available</strong>
          )}
        </div>
      </div>
      {pilotSelected ? <PilotDetail pilot={pilotSelected} /> : ''}
    </div>
  );
}

function PilotDetail({ pilot }) {
  console.log(pilot);
  return (
    <>
      <div>
        <span>Pilot name: </span>
        {pilot.name}
      </div>
      <div>
        <span>Gender: </span>
        {pilot.gender}
      </div>
      <div>
        <span>Height: </span>
        {pilot.height}cm
      </div>
      <div>
        <span>Eye color: </span>
        {pilot.eye_color}
      </div>
      <div>
        <span>Skin color: </span>
        {pilot.skin_color}
      </div>
    </>
  );
}
