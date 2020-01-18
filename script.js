
//Use geoCoding api 

function geoCodingAPI (){
  var street = '285 Fulton St,' ; 
  var city = 'New York,';
  var state = 'NY,'; 
  var zipCode = '10007,'; 
  var country = 'United States'; 


  var apiKey = 'b779461f362d4375b7fe76ba33e12e1f';
  var queryUrl = `https://api.opencagedata.com/geocode/v1/json?q=${street}${city}${state}${zipCode}${country}&key=${apiKey}`;


  $.ajax({
    url:  queryUrl ,
    method: "GET"
  }).then(function(response) {
    var lat = response.results[0].geometry.lat;
    var lon = response.results[0].geometry.lng;
    console.log(lat, lon); 
    zomatoCall(lat, lon); 


  })
}
geoCodingAPI(); 


//Zomato API 
function zomatoCall (lat, lon){

var apiKey= '9be8eb8bb66ec64005c8cc43793d3c60'
var queryURL = `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}&start=0&count=20`
$.ajax({
  method: "GET",
  url: queryURL,
  crossDomain: true,
  dataType: "json",
  async: true,
  headers: {
    "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
      }, success: function(data){
       console.log(data); 
      
    }
   })
























//////--------------------------------------------------------------