import * as engine from './engine.js'
import * as world from './world.js'

// Main logic

// Decide starting location
world.setCurrentLocName('port1');

// Add start location to visited places
world.addVisitedPlace(world.currentLocName);

// Assign the current X and Y value of the ship 
let currentPoint = world.interestPoints[world.currentLocName];
world.setCurrentX(currentPoint[0]);
world.setCurrentY(currentPoint[1]);

// Add random storms to the game
engine.addRandomStorms(15);

// console.log(world.storms);

// Visit each place -- testing
let visits = 0;
let maxVisits = 7;
console.log("🚀 ~ world.locationsLeftToVisit:", world.locationsLeftToVisit)
while (visits < world.locationsLeftToVisit) {
    engine.choosingRouteVariation(world.currentLocName);
    console.log("🚀 ~ visits:", visits)
    visits++;
}

// // Print storms locations
console.log('Storm locations below! ----');
console.log(world.storms);
console.log(world.stormsItensity);
