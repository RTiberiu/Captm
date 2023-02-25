import * as world from './world.js'

// Functions of all the logic
export function choosingRouteVariation() {
    let a;
    let b;
    let distance = 0;
    let shortestDistance;
    let shortestInterestPoint; 

    // Loop through all points and use pythagoras to find the shortest distance
    for (let interestPoint in world.interestPoints) {
        // Check the current interest point wasn't visited
        if (world.visitedPlaces.includes(interestPoint)) {
            continue;
        }

        // Get interest points X and Y values
        let interestPointX = world.interestPoints[interestPoint][0];
        let interestPointY = world.interestPoints[interestPoint][1];

        // Get distance using pythagoras
        a = world.currentX - interestPointX;
        b = world.currentY - interestPointY;
        distance = Math.sqrt(a * a + b * b);

        // Decide if it's the shortest route
        if (distance < shortestDistance || shortestDistance == 0) {
            shortestDistance = distance;
            shortestInterestPoint = interestPoint;
        }
    }

    console.log("🚀 ~ shortestInterestPoint:", shortestInterestPoint)
    console.log("🚀 ~ shortestDistance:", shortestDistance)
}
