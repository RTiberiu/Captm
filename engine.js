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

        // Check the current interest point isn't blocked by a storm
        if (world.stormBlockedLocations.includes(interestPoint)) {
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
    
    // Check if all available locations were visited AND if there are any blockd locations
    if (shortestInterestPoint == undefined && world.stormBlockedLocations.length > 0) {
        // Unblock all location blocked by the storm
        world.makeBlockedLocationsAvailable();

        // Callback to resume with the newly available locations
        console.log('Callback for UNBLOCKED!')
        choosingRouteVariation();
        return;
    }

    // Get travelled coordinates array 
    let gotTravelledCoord = getTravelledCoordArr(world.currentLocName,shortestInterestPoint);

    // Callback choosing different travel variation 
    if (!gotTravelledCoord) {
        console.log('Callback function choosing different location');
        choosingRouteVariation();
        return;
    }

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
    let randomCoordArr;
    let randomIntensity;
    // Find unique location of storms and add them
    while (counter < numberOfStorms) {
        // Randomize location until one it's unique
        let searchingStormLoc = true;
        while (searchingStormLoc) {
            randomCoordArr = getRandomCoordinatesArr(world.worldGrid[0], world.worldGrid[1]);

            // Check if random coordinates are unique 
            let foundStorm = world.storms.some(item => {
                return item[0] === randomCoordArr[0] && item[1] === randomCoordArr[1];
            });

            // Stop searching when unique storm coordinates are found
            if (!foundStorm) {
                searchingStormLoc = false;
            } 
        }
        
        // Get random intensity for the random storm
        randomIntensity = getRandomIntensity(randomCoordArr[0], randomCoordArr[1]);
    
        // Add storm location & intensity
        world.addStorm(randomCoordArr[0], randomCoordArr[1], randomIntensity);
        counter++;
    } 
}

/**
 * Get an array of travelled coordinates between two points in the 2d space.
 * @param {*} startingPoint name of the interest point
 * @param {*} endPoint name of the interest point
 */
export function getTravelledCoordArr(startingPoint, endPoint) {
    let startPointCoord = world.interestPoints[startingPoint];
    console.log("🚀 ~ startPointCoord:", startPointCoord, " startingPoint", startingPoint)
    let endPointCoord = world.interestPoints[endPoint];
    console.log("🚀 ~ endPointCoord:", endPointCoord, " endPoint", endPoint)

    // Move on the Y axis
    if (startPointCoord[1] > endPointCoord[1]) {
        while(startPointCoord[1] > endPointCoord[1]) {
            // Get travel coordinate storm intensity
            let coordStormIntensity = getStormIntensityByCoord(startPointCoord[0], startPointCoord[1] - 1);
            
            // Validate that the storm isn't blocking the location
            if (coordStormIntensity == 3) {
                console.log("🚀 ~ coordStormIntensity:", coordStormIntensity)
                console.log(startPointCoord[0], startPointCoord[1] - 1);
                console.log("🚀 ~ endPoint:", endPoint)
                // Temporarily block current endPoint trajectory and stop function
                world.addStormBlockedLocation(endPoint);
                return false;
            } else if (coordStormIntensity > 0) {
                // Increase fuel consumption + storm percentage

            } else {
                // Increase basic fuel consumption

            }
            

            world.addTempTravelledLocation(startPointCoord[0], startPointCoord[1] - 1);
            startPointCoord[1] -= 1;
        }
    } else {
        while(startPointCoord[1] < endPointCoord[1]) {
            console.log(getStormIntensityByCoord(startPointCoord[0], startPointCoord[1] + 1));
            world.addTempTravelledLocation(startPointCoord[0], startPointCoord[1] + 1);
            startPointCoord[1] += 1;
        }
    }

    // Move on the X axis
    if (startPointCoord[0] > endPointCoord[0]) {
        while(startPointCoord[1] > endPointCoord[1]) {
            console.log(getStormIntensityByCoord(startPointCoord[0] - 1, startPointCoord[1]));

            world.addTempTravelledLocation(startPointCoord[0] - 1, startPointCoord[1]);
            startPointCoord[0] -= 1;
        }
    } else {
        while(startPointCoord[0] < endPointCoord[0]) {
            console.log(getStormIntensityByCoord(startPointCoord[0] + 1, startPointCoord[1]));

            world.addTempTravelledLocation(startPointCoord[0] + 1, startPointCoord[1]);
            startPointCoord[0] += 1;
        }
    }
    
    // Add temp travelled to actually travelled 
    world.addTravelledLocation();
    console.log("🚀 ~ travelledArr:", world.travelledArr)
    return true;
}

export function getStormIntensityByCoord(x, y) {
    let output;
    // Find if given coordinates exist in storms arr
    let stormIndex;
    let foundStorm = world.storms.some(item => {
        let isEqualToStorm = item[0] === x && item[1] === y;
        if (isEqualToStorm) {
            stormIndex = world.storms.indexOf(item);
        }
        return isEqualToStorm;
    });

    if (!foundStorm) {
        output = 0;
    } else {
        output = world.stormsItensity[stormIndex];
    }

    return output;
}

