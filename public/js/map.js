
 
    
 
mapboxgl.accessToken= mapToken;
 // mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    const map = new mapboxgl.Map({
        container:'map', 
        style:"mapbox:://styles/mapbox/styreets-v12",
        center: [77.209, 28.6139], 
        zoom: 9 // starting zoom
    });
    