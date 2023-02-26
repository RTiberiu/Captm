import * as world from './world.js'
import * as engine from './engine.js'

console.log(world.client1)

// Main logic

// Initialise the variables:
engine.addFacility(1, "OrbitAlpha", [5, 3], world.client1, 0)
engine.addFacility(2, "OrbitBravo", [1, 4], world.client1, 0)
engine.addFacility(3, "OrbitCharlie", [2, 6], world.client1, 0)
engine.addFacility(4, "LeoAlpha", [3, 3], world.client2, 0)
engine.addFacility(5, "LeoDelta", [3, 5], world.client2, 0)
engine.addFacility(6, "Port1", [6, 6], null, 1)
engine.addFacility(7, "Port2", [1, 1], null, 1)
engine.addFacility(8, "Port3", [6, 4], null, 1)


engine.addLoad(world.client1, 40, 6, 1) // example of adding load
engine.addLoad(world.client1, 60, 4, 2) // example of adding load
engine.addLoad(world.client1, 100, 1, 5) // example of adding load

engine.addTrip(6, 1, 1)   // example of adding trip
world.trips[0].addLoad(world.loads[0])
world.trips[0].addLoad(world.loads[1])
world.trips[0].addLoad(world.loads[2])

engine.addRain([1,1], [1,2], [2,1], [2,2]) // example of adding rain

// End of Initialise

//Test :
// console.log("trip 0 : " + JSON.stringify(world.trips[0]))
// console.log("\n\n")
// engine.startTrip(world.trips[0])
// console.log("ship : " + JSON.stringify(world.ship))
// console.log("\n\n")
// console.log("ship total weight : " + world.ship.currentTrip.totalLoadWeight)
// console.log("\n\n")

// End of test

