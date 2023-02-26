
import * as world from './world.js'
import * as engine from './engine.js'

console.log(world.client1)

// Main logic

// Initialise the variables:
engine.addFacility(1, "Orbit Alpha", [2, 6], world.client1, 0)
engine.addFacility(2, "OrbitBravo", [3, 2], world.client1, 0)
engine.addFacility(3, "OrbitCharlie", [6, 4], world.client1, 0)
engine.addFacility(4, "LeoAlpha", [9, 3], world.client2, 0)
engine.addFacility(5, "LeoDelta", [11, 7], world.client2, 0)
engine.addFacility(6, "Port1", [0, 3], null, 1)
engine.addFacility(7, "Port2", [5, 8], null, 1)
engine.addFacility(8, "Port3", [12, 1], null, 1)


engine.addLoad(world.client1, 40, 6, 1) // example of adding load
engine.addLoad(world.client1, 60, 4, 2) // example of adding load
engine.addLoad(world.client1, 30, 3, 5) // example of adding load
engine.addLoad(world.client1, 20, 2, 6) // example of adding load
engine.addLoad(world.client1, 10, 4, 2) // example of adding load
engine.addLoad(world.client1, 30, 4, 5) // example of adding load


 
// world.loads.forEach((load)=> {
//     let x = world.facilities.find(f => f.id === load.originFac);
//     let y = world.facilities.find(f => f.id === load.destinationFac); 
// console.log(x.coordinates, y.coordinates)
// })

//console.log(engine.exportLoads());    -- display all the loads to transport

//const found = array1.find(element => element > 10);


engine.addTrip(6, 1, 1)   // example of adding trip
world.trips[0].addLoad(world.loads[0])
world.trips[0].addLoad(world.loads[1])
world.trips[0].addLoad(world.loads[2])

engine.addRain([1,1], [1,2], [2,1], [2,2]) // example of adding rain

// End of Initialise


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


//Test :
// console.log("trip 0 : " + JSON.stringify(world.trips[0]))
// console.log("\n\n")
// engine.startTrip(world.trips[0])
// console.log("ship : " + JSON.stringify(world.ship))
// console.log("\n\n")
// console.log("ship total weight : " + world.ship.currentTrip.totalLoadWeight)
// console.log("\n\n")

// End of test

