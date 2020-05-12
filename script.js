window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};


function staticLoadPlaces() {
    return [
        {
            name: 'UNMC',
            location: {
                lat: 41.15720057726485,
                lng: -96.01379709084206,
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
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', path);
        model.setAttribute('rotation', '0 90 0');
        model.setAttribute('scale', '1 1 1');
        model.setAttribute('position', '1 1 1');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}