window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};


function staticLoadPlaces() {
    return [
        {
            name: 'UNMC',
            location: {
                lat: 41.15720259671805,
                lng: -96.01390169699364,
            }, 
            path: './assets/unmc.glb'
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        let path = place.path;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-projected-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', path);
        model.setAttribute('rotation', '0 90 0');
        model.setAttribute('scale', '100.0 100.0 100.0');
        model.setAttribute('position', { x: 0, y: 10, z: -20 });

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}