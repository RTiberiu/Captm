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

// End of objects examples
