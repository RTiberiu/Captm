// Global variables used in engine.js ()

// Current X and Y value on the map
let currentLocName;
let currentX;
let currentY;

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

export {interestPoints, currentX, currentY, visitedPlaces, currentLocName};