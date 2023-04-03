export default function SpaceShipStar({ spaceShip, openDetail }) {
  const numberOfPilots = spaceShip.pilots.length;
  return (
    <>
      <div
        className='space-ship-star'
        style={{ top: `${spaceShip.top}%`, left: `${spaceShip.left}%` }}
        onClick={() => openDetail(spaceShip)}
      >
        <span className='space-ship-star__dot'>
          <span className='space-ship-star__tooltip'>
            <h3>{spaceShip.name}</h3>
            <p>{spaceShip.model}</p>
            <p>
              Was piloted by {numberOfPilots} {numberOfPilots > 1 ? ' pilots' : 'pilot'}
            </p>
          </span>
        </span>
      </div>
    </>
  );
}
