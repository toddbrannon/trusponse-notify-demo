
/*global axios*/

function geocode() {
            
            var locationArray = [
                "whiskey cake irving", 
                "cowboy chicken irving",
                "hard 8 coppell"
                ]
                
            locationArray.forEach(function(item, index, array){
                var location = item;
                
                axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: location,
                        key: 'AIzaSyA3a2Rc2t4xNF4L7YgQT-4JEJIgrrZ9ioU'
                    }
                })
                .then(function(response) {
                    // Log components of the response that you want (formatted address, etc.)
                    var formattedAddy = response.data.results[0].formatted_address;
                    var lat = response.data.results[0].geometry.location.lat;
                    var lng = response.data.results[0].geometry.location.lng;
                    console.log(location + "; " + formattedAddy);
                    console.log("Latitude: " + lat);
                    console.log("Longitude: " + lng);
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                });
            });
        }