// create the URL for the geoJason
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// test URL
// 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

//production URL
"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"


// Perform a GET request to the query URL/
d3.json(url).then(function (data) {
  console.log(data)
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.feature);
  });
  

  function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that will describe the place and time of the earthquake.
    function onEachFeature (feature, layer) {
        onEachFeature : function(feature, layer) {
          layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
        }
      
        // Create a GeoJSON layer that contains the features array on the earthquakeData object.
        // Run the onEachFeature function once for each piece of data in the array.
        let earthquakes = L.geoJSON(earthquakeData, {
          onEachFeature: onEachFeature
        });
      
            
        
        
          // Sending our earthquakes layer to the createMap function
          createMap(earthquakes);
    }

  // Now moving on to making the map itself





    