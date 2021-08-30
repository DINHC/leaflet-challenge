// var map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();

var url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

var map = L.map('map', {
    center: [34.03, -118.14], 
    zoom: 13
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18, 


}).addTo(map);

d3.json(url, function(data) {
// function styleInfo(feature) {
  //     return {
  //         opacity: .5,
  //         color: "#0000000",
  //         weight: 0.8
  //         fillOpacity: .7,
  //         fillColor: getColor(feature.properties.mag),
  //         radius: feature.properties.mag * 4
  //     };
  //   }
    
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }})