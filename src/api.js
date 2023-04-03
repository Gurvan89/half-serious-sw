const urlApi = 'https://swapi.dev/api/';

/**
 * Get all Space Ships with the pilots
 */
export async function getSpaceShipsWithPilots() {
  let result = await fetchData(`${urlApi}/starships`);
  let spaceShips = result.results;
  while (result.next != null) {
    result = await fetchData(result.next);
    spaceShips = spaceShips.concat(result.results);
  }
  const pilots = await getPilots();
  const minLimit = 5;
  const maxLimit = 85;
  spaceShips.forEach((spaceShip) => {
    spaceShip.pilots = spaceShip.pilots.map((pilotUrl) => pilots[getIdFromUrl(pilotUrl)]).filter((p) => p !== null);
    spaceShip.top = random(minLimit, maxLimit);
    spaceShip.left = random(minLimit, maxLimit);
  });
  return spaceShips;
}

/**
 * Get all the pilots
 */
async function getPilots() {
  let result = await fetchData(`${urlApi}/people`);
  let pilots = result.results.filter((r) => r.starships.length);
  while (result.next != null) {
    result = await fetchData(result.next);
    pilots = [...pilots, ...result.results.filter((r) => r.starships.length)];
  }

  let toReturn = {};
  pilots.forEach((pilot) => {
    toReturn[getIdFromUrl(pilot.url)] = { ...pilot };
  });
  return toReturn;
}

/**
 * Fetch the data from the provided endpoint
 */
async function fetchData(endpoint) {
  return await fetch(endpoint).then((res) => res.json());
}

/**
 * Get the id from the provided url
 */
function getIdFromUrl(url) {
  const match = url.match(/[0-9]+/);
  return match.length ? parseInt(match[0]) : null;
}

/**
 * Calculate a random number between min and max 
 */
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
