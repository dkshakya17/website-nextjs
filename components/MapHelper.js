export const getDirectionRoute = (maps, map, origin, destination) => {
    return new Promise(function (resolve, reject) {
        const directionsService = new maps.DirectionsService();
        const directionsDisplay = new maps.DirectionsRenderer();
        const strokeColors = ['#054d7f', '#f05c4e', '#000000'];

        try {
            let drivePromise = route(directionsService, origin, destination, maps.DirectionsTravelMode.DRIVING, maps.UnitSystem.IMPERIAL);
            let transitPromise = route(directionsService, origin, destination, maps.DirectionsTravelMode.TRANSIT, maps.UnitSystem.IMPERIAL);
            let walkPromise = route(directionsService, origin, destination, maps.DirectionsTravelMode.WALKING, maps.UnitSystem.IMPERIAL);

            Promise.all([drivePromise, transitPromise, walkPromise]).then((values) => {
                let result = values.map((value, index) => {
                    directionsDisplay.setDirections(value);
                    const routePolyline = new google.maps.Polyline({
                        path: value.routes[0].overview_path,
                        strokeColor: strokeColors[index],
                        strokeWeight: '3'
                    });

                    routePolyline.setMap(map);
                    map.fitBounds(value.routes[0].bounds);
                    return { travelMode: value.request.travelMode, line: routePolyline, legs: { time: value.routes[0].legs[0].duration.text, distance: value.routes[0].legs[0].distance.text } };
                });

                resolve(result);
            })
        }
        catch {
            reject();
        }
    })
}

export const route = (directionsService, origin, destination, travelMode, unitSystem) => {
    return new Promise(function (resolve, reject) {
        directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: travelMode,
            unitSystem: unitSystem
        }, (response, status) => {
            if (status === 'OK') {
                resolve(response);
            }
            else {
                reject("could not fetch");
            }
        })
    });
}