import * as engine from 'engine.js'
import * as world from 'world.js'

// Main logic


// Constructors
function addFacility(id, name, coordinates, client, isPort) {
    let facility = {
        id : id,
        name : name,
        coordinates : coordinates,
        client : client,
        isPort : isPort
        }
    facilities.push(facility)
}    


function addLoad(client, weight, destinationFac, originFac) {
    let load = {
        client : client,
        weight : weight,
        destinationFac : destinationFac,
        originFac : originFac,
        emissionsProduced : null  // to be updated during the demonstration
    }
    loads.push(load)
}

function addTrip(originFac, destinationFac, load, totalLoadWeight, sequenceNr) {
    let trip = {
        originFac : originFac,
        destinationFac : destinationFac,
        load : load,
        totalLoadWeight : totalLoadWeight,
        sequenceNr : sequenceNr,
        emissionsProduced : null
    }
    trips.push(trip)
}

function addRain(coordinate1, coordinate2, coordinate3, coordinate4) {
    let rain = {
        coordinate1 : coordinate1,
        coordinate2 : coordinate2,
        coordinate3 : coordinate3,
        coordinate4 : coordinate4
    }
    rains.push(rain)
}


// End of Constructors

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
addTrip(6, 1, null, 0, 1)   // example of adding trip

// End of Initialise