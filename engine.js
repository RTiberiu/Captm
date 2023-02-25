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


