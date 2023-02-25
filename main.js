import * as engine from './engine.js'
import * as world from './world.js'

// Main logic

// Decide starting location
let startingLocName = 'port1';

// Add start location to visited places
world.visitedPlaces.push(startingLocName);

// Assign the current X and Y value of the ship 
let currentPoint = world.interestPoints[startingLocName];
world.setCurrentX(currentPoint[0]);
world.setCurrentY(currentPoint[1]);

// Choose route 
engine.choosingRouteVariation(startingLocName);