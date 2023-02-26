import * as world from './world.js'
import * as engine from './engine.js'


// Main logic

// Initialise the variables:
addFacility(1, "OrbitAlpha", [5, 3], client1, 0)
addFacility(2, "OrbitBravo", [1, 4], client1, 0)
addFacility(3, "OrbitCharlie", [2, 6], client1, 0)
addFacility(4, "LeoAlpha", [3, 3], client2, 0)
addFacility(5, "LeoDelta", [3, 5], client2, 0)
addFacility(6, "Port1", [6, 6], null, 1)
addFacility(7, "Port2", [1, 1], null, 1)
addFacility(8, "Port3", [6, 4], null, 1)


addLoad(client1, 40, 6, 1) // example of adding load
addLoad(client1, 60, 4, 2) // example of adding load
addLoad(client1, 100, 1, 5) // example of adding load

addTrip(6, 1, 1)   // example of adding trip
trips[0].addLoad(loads[0])
trips[0].addLoad(loads[1])
trips[0].addLoad(loads[2])

addRain([1,1], [1,2], [2,1], [2,2]) // example of adding rain

// End of Initialise

//Test :
// console.log("trip 0 : " + JSON.stringify(trips[0]) + '/n')
// startTrip(trips[0])
// console.log("ship : " + JSON.stringify(ship) + '/n')
// console.log("ship total weight : " + ship.currentTrip.totalLoadWeight)

// End of test

