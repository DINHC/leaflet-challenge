// var map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();

var map = L.map('map', {
    center: [34.03, -118.14], 
    zoom: 13
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18, 
}).addTo(map);
var url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(url).then(function(data) {
  // var features = data["features"];
  // for (var i = 0; i < features.length; i++) {
  //   var geometry = features[i]["geometry"]["coordinates"];
  //   var magnitude = features[i]["properties"]["mag"];
  //   var title = features[i]["properties"]["title"];
  //   var coords = {
  //     longitude: geometry["0"],
  //     latitude: geometry["1"]
  //   };

  // var colors = ["#FF0000", "#FF6900", "#FFC100", "#E5FF00", "#8DFF00","#00FF00"]
  // function getColor(magnitude){{
  // if (magnitude < 1){
  //   color = colors[0];
  // } else if (magnitude >= 1 && magnitude < 2){
  //   color = colors[1];
  // } else if (magnitude >= 2 && magnitude < 3){
  //   color = colors[2];
  // } else if (magnitude >= 3 && magnitude < 4){
  //   color = colors[3];
  // } else if (magnitude >= 4 && magnitude < 5){
  //   color = colors[4];
  // } else {
  //   color = colors[5];
  // }
  // return colors;}}

  // var colors = ["#FF0000", "#FF6900", "#FFC100", "#E5FF00", "#8DFF00","#00FF00"]
  function getColor(magnitude){{
  if (magnitude < 1){
    color = "#FF0000";
  } else if (magnitude >= 1 && magnitude < 2){
    color = "#FF6900";
  } else if (magnitude >= 2 && magnitude < 3){
    color = "#FFC100";
  } else if (magnitude >= 3 && magnitude < 4){
    color = "#E5FF00";
  } else if (magnitude >= 4 && magnitude < 5){
    color = "#8DFF00";
  } else {
    color = "#00FF00";
  }
  return color;}}
  
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
    }
    function getRadius(magnitude) {
      if (magnitude === 0) {
        return 1;
      }
      return magnitude * 4;
    }
    L.geoJson(data, {
  
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }
    }).addTo(map);
      
    var legend = L.control({
      position: "bottomright"
    });
  
    var legend = L.control({
      position: "bottomright"
    });
  
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
  
      var grades = [0, 1, 2, 3, 4, 5];
      var colors = ["#FF0000", "#FF6900", "#FFC100", "#E5FF00", "#8DFF00","#00FF00"];
 
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
      return div;
    };
  
    legend.addTo(map);
  })
  

    
      
