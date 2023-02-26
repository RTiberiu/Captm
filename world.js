// Global variables used in engine.js ()

// Examples of how the objects will be populated :
// var load = {
//     'client' : 1,
//     'weight' : 40,
//     'destinationFac' : 2,
//     'originFac' : 3,
//     'emissionsProduced' : 0  // to be updated during the demonstration
// }


// var facility = {
// name : "FordCharlie",
// coordinates : [20, 67],
// client : 1,
// isPort : 0
// }

// var ship = {
// capacity : 1500,
// currentTrip : tripObject
// } 

// var client = {
// name : "Client1",
// emissionsProduced : 0
// }

// var trip = {
// originFac : 4,
// destinationFac : 6,
// distance : 20.6,
// load : [],
// totalLoadWeight : 0,
// sequenceNr : 2,
// emissionsProduced : 0
// }

// var rain = {
//     coordinate1 : [],
//     coordinate2 : [],
//     coordinate3 : [],
//     coordinate4 : []
// }
// End of objects examples


// Initialise the variables:
var client1 = {
    'name' : "Frank",
    'emissionsProduced' : 0
    }

var client2 = {
    name : "Freddy",
    emissionsProduced : 0
    }

var ship = {
    capacity : 1500,
    currentTrip : null
} 

var facilities = []
var loads = []
var trips = []
var rains = []

export {client1, client2, ship, facilities, loads, trips, rains}

// Current X and Y value on the map
let currentLocName;
let currentX;
let currentY;
let worldGrid = [12, 8]; // X and Y threshold of the map 

// Fuel consumption

// Coordinates of each interest point in X and Y format
let interestPoints = {
    'port1': [0, 3],
    'port2': [5, 8],
    'port3': [12, 1],
    'oilrig1': [2, 6],
    'oilrig2': [3, 2],
    'oilrig3': [6, 4],
    'oilrig4': [9, 7],
    'oilrig5': [11, 3]
}

let locationsLeftToVisit = Object.keys(interestPoints).length - 1;
let storms = [];
let stormsItensity = [];
let stormBlockedLocations = [];
let visitedPlaces = [];

// Travelled locations (coordinates X and Y)
let travelledArr = [];

// Temporary route locations
let tempTravelledArr = [];

// Setters 
export function setCurrentX(value) {
    currentX = value;
}

export function setCurrentY(value) {
    currentY = value;
}

export function setCurrentLocName(value) {
    currentLocName = value;
}

export function addVisitedPlace(place) {
    visitedPlaces.push(place);
}

export function updateShipLocation(location, x, y) {
    currentLocName = location;
    currentX = x;
    currentY = y;
}

/**
 * Add storm coordinates to game
 * @param {Integer} x 
 * @param {Integer} y 
 * @param {Integer} intensity between 0 and 3; 3 locks off an area.
 */
export function addStorm(x, y, intensity) {
    storms.push(new Array(x, y));
    stormsItensity.push(intensity);
} 

export function addTravelledLocation() {
    travelledArr.push(tempTravelledArr);
    
    // Clear temp travelled arr
    tempTravelledArr = [];
}

export function addTempTravelledLocation(x, y) {
    tempTravelledArr.push(new Array(x, y));
}

export function addStormBlockedLocation(nameOfBlockedLoc) {
    stormBlockedLocations.push(nameOfBlockedLoc);
}

export function makeBlockedLocationsAvailable() {
    stormBlockedLocations = [];
    stormsItensity = [];
    storms = [];
}


export {interestPoints, currentX, currentY, visitedPlaces, currentLocName, storms, worldGrid, stormsItensity, travelledArr, tempTravelledArr, stormBlockedLocations, locationsLeftToVisit};
