import * as world from './world.js'

// Functions of all the logic
export function choosingRouteVariation() {
    let distance;
    let shortestDistance = 0;
    let shortestInterestPoint; 
    let shortestPointCoord = [];
    let interestPointX;
    let interestPointY;

    // Loop through all points and use pythagoras to find the shortest distance
    for (let interestPoint in world.interestPoints) {
        // Check the current interest point wasn't visited
        if (world.visitedPlaces.includes(interestPoint)) {
            continue;
        }
        
        // Get interest points X and Y values
        interestPointX = world.interestPoints[interestPoint][0];
        interestPointY = world.interestPoints[interestPoint][1];
        
        // Get distance using pythagoras
        distance = Math.hypot(interestPointX - world.currentX, interestPointY - world.currentY);
        
        // Decide if it's the shortest route
        if (distance < shortestDistance || shortestDistance == 0) {
            shortestDistance = distance;
            shortestInterestPoint = interestPoint;
            shortestPointCoord = [interestPointX, interestPointY];
        }
    }

    console.log("🚀 ~ shortestInterestPoint:", shortestInterestPoint)
    console.log("🚀 ~ shortestDistance:", shortestDistance)
    // Update ship location and coordinates 
    world.updateShipLocation(shortestInterestPoint, shortestPointCoord[0], shortestPointCoord[1]);

    // Add new location to visited place
    world.addVisitedPlace(shortestInterestPoint);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomCoordinatesArr(thresholdX, thresholdY) {
    return new Array(getRandomInt(0, thresholdX), getRandomInt(0, thresholdY))
}

// Get random storm intensity between 1 and 3; 3 is only allowed for interest points
function getRandomIntensity(coordinateX, coordinateY) {
    let output;
    // Decide if the current point is touching interest point
    let isInterestPoint = false;
    
    let interestKeys = Object.keys(world.interestPoints);
    // Cycle through all the interest points
    for (let x = 0; x < interestKeys.length; x++) {
        // Break when match is found
        if(isInterestPoint) {
            break;
        }
        
        let currInterestPointArr = world.interestPoints[interestKeys[x]];
        
        // Check all four storm square coordinates if they match with the interest point 
        let allSidesCoordinates = [
            [coordinateX, coordinateY], [(coordinateX + 1), coordinateY],
            [coordinateX, coordinateY + 1], [coordinateX + 1, coordinateY + 1]
        ];
        for (let i = 0; i < allSidesCoordinates.length; i++) {
            let side = allSidesCoordinates[i];
            if(currInterestPointArr[0] === side[0] && currInterestPointArr[1] === side[1]) {
                isInterestPoint = true;
                break;
            }
        }
    }
    
    // Get random int
    if (isInterestPoint) {
        output = getRandomInt(1, 4);
    } else {
        output = getRandomInt(1, 3);
    }
    return output;
}

export function addRandomStorms(numberOfStorms) {
    // Don't allow more storms than the world has space
    let stormThreshold = world.worldGrid[0] * world.worldGrid[1];
    if (numberOfStorms > stormThreshold) {
        throw new Error(`Can't have more storms than spaces on the map! Please choose a lower number`);
    }

    let counter = 0;
    let randomCoorArr;
    let randomIntensity;
    // Find unique location of storms and add them
    while (counter < numberOfStorms) {
        // Randomize location until one it's unique
        let searchingStormLoc = true;
        while (searchingStormLoc) {
            randomCoorArr = getRandomCoordinatesArr(world.worldGrid[0], world.worldGrid[1]);

            // Check if random coordinates are unique 
            let foundStorm = world.storms.some(item => {
                return item[0] === randomCoorArr[0] && item[1] === randomCoorArr[1];
            });

            // Stop searching when unique storm coordinates are found
            if (!foundStorm) {
                searchingStormLoc = false;
            } 
        }
        
        // Get random intensity for the random storm
        randomIntensity = getRandomIntensity(randomCoorArr[0], randomCoorArr[1]);
    
        // Add storm location & intensity
        world.addStorm(randomCoorArr[0], randomCoorArr[1], randomIntensity);
        counter++;
    } 
}

