import * as world from './world.js'

// Constructors: 
export function addFacility(id, name, coordinates, client, isPort) {
    let facility = {
        id : id,
        name : name,
        coordinates : coordinates,
        client : client,
        isPort : isPort
        }
    facilities.push(facility)
}    


export function addLoad(client, weight, destinationFac, originFac) {
    let load = {
        client : client,
        weight : weight,
        destinationFac : destinationFac,
        originFac : originFac,
        emissionsProduced : null  // to be updated during the demonstration
    }
    loads.push(load)
}

export function addTrip(originFac, destinationFac, distance, sequenceNr) {
    let trip = {
        originFac : originFac,
        destinationFac : destinationFac,
        distance : distance,
        loads : [],   // it'll be a collection of all the loads in that trip
        totalLoadWeight : 0,
        sequenceNr : sequenceNr,
        emissionsProduced : null,

        addLoad : function(load) {  
            this.loads.push(load)  //  add a load to that trip
            this.totalLoadWeight += load.weight // update the totalLoadWeight of the trip
        }
    }
    trips.push(trip)
}

export function addRain(coordinate1, coordinate2, coordinate3, coordinate4) {
    let rain = {
        coordinate1 : coordinate1,
        coordinate2 : coordinate2,
        coordinate3 : coordinate3,
        coordinate4 : coordinate4
    }
    rains.push(rain)
}


// End of Constructors


// Other functions:
export function startTrip(trip) {
    ship.currentTrip = null // reset the current trip
    ship.currentTrip = JSON.parse(JSON.stringify(trip)) // assign a new trip
}