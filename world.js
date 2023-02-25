// Global variables used in engine.js ()

/// Objects we are going to use :
var load = {
    client : 1,
    weight : 40,
    destinationFac : 2,
    originFac : 3,
    emissionsProduced : 0  // to be updated during the demonstration
}


var facility = {
name : "FordCharlie",
coordinates : [20, 67],
client : 1,
isPort : 0
}

var ship = {
capacity : 1500,
totalLoadWeight : 0,
currentTrip : null
} 

var client = {
name : "Client1",
emissionsProduced : 0
}

var trip = {
originFac : 4,
destinationFac : 6,
load : [],
totalLoadWeight : 0,
sequenceNr : 2,
emissionsProduced : 0
}

var rain = {
    coordinate1 : [],
    coordinate2 : [],
    coordinate3 : [],
    coordinate4 : []
}
// End of objects examples
//-----------------------------------


// Initialise the variables:
var client1 = {
    name : "Frank",
    emissionsProduced : 0
    }

var client2 = {
    name : "Freddy",
    emissionsProduced : 0
    }

var ship = {
    capacity : 1500,
    totalLoadWeight : 0,
    currentTrip : null
} 

var facilities = []
var loads = []
var trips = []
var rains = []


