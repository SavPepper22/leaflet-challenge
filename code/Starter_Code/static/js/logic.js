// create the URL for the geoJason
 // Create the tile layer that will be the background of our map.
 let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});




// Create the map object with options.
let map = L.map("map", {
center: [40.73, -74.0059],
zoom: 3,

});
streetmap.addTo(map);

let earthquakes = new L.LayerGroup();
 // Create a baseMaps object to hold the streetmap layer.
 let baseMaps = {
  "Street Map": streetmap
};

// Create an overlayMaps object to hold the bikeStations layer.
let overlayMaps = {
  "Earthquakes": earthquakes
};
// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
collapsed: false
}).addTo(map);

// test URL
// 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

//production URL
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"


// Perform a GET request to the query URL/
d3.json(url).then(function (data) {
  console.log(data)
    // Once we get a response, send the data.features object to the createFeatures function.
    function addStyle(feature)
     {
      return{
      radius: addRadius(feature.properties.mag),
      fillColor: addColor (feature.geometry.coordinates[2]),
      fillOpacity: 1, 
      color: "#000000",
      weight: 0.5
    };
  }
    function addColor(depth){
           if(depth > 90)
       {
        return "#ea2c2c"
       }
       if(depth > 70)
       {
        return "#ea2c2c"
       }
       if(depth > 50)
       {
        return "#ea2c2c"
       }
       if(depth > 30)
       {
        return "#ea2c2c"
       }
      return "#ea2c2c"
    }
    function addRadius(mags){
      if(mags === 0){
        return 1;
      }
      return mags * 4;
    }
    L.geoJson(data,{
        onEachFeature : function(feature, layer) {
            layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
          },
          pointToLayer: function(feature,latlng){
            return L.circleMarker(latlng)
          },
          style: addStyle
        
    }).addTo(earthquakes)
    earthquakes.addTo(map)


    // Put legend here. 
    

  });
  

  // function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that will describe the place and time of the earthquake.
    // function onEachFeature (feature, layer) {
        // onEachFeature : function(feature, layer) {
        //   layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
        // }
      
        // Create a GeoJSON layer that contains the features array on the earthquakeData object.
        // Run the onEachFeature function once for each piece of data in the array.
        // let earthquakes = L.geoJSON(earthquakeData, {
        //   onEachFeature : function(feature, layer) {
        //     layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
        //   }
        // });
      
            
        
        
          // Sending our earthquakes layer to the createMap function
          // createMap(earthquakes);
  //   }
  // }
  // Now moving on to making the map itself





    