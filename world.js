// Global variables used in engine.js ()

// Current X and Y value on the map
let currentLocName;
let currentX;
let currentY;

let worldGrid = [12, 8]; // X and Y threshold of the map 

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

let storms = [];
let stormsItensity = [];

let visitedPlaces = [];

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

export {interestPoints, currentX, currentY, visitedPlaces, currentLocName, storms, worldGrid, stormsItensity};