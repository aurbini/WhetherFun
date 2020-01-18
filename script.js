//Use geoCoding api 

function geoCodingAPI (){
  var apiKey = 'b779461f362d4375b7fe76ba33e12e1f';
  var queryUrl = `https://api.opencagedata.com/geocode/v1/json?q=${'1859 Gallo Drive, Powell, Ohio, 43065, United States'}&key=${apiKey}`;

  $.ajax({
    url:  queryUrl ,
    method: "GET"
  }).then(function(response) {
    var lat = response.results[0].geometry.lat;
    var lon = response.results[0].geometry.lng;
    //console.log(lat, lon); 
    zomatoCall(lat, lon); 


  })
}
geoCodingAPI(); 


//Zomato API 
function zomatoCall (lat, lon){

var apiKey= '9be8eb8bb66ec64005c8cc43793d3c60'
var queryURL = `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`
//`https://developers.zomato.com/api/v2.1/establishments?city_id=miami${apiKey}`; 
//https://developers.zomato.com/api/v2.1/search?count=50&lat=40.7128&lon=-74.0060
$.ajax({
  method: "GET",
  url: queryURL,
  "user-key": "9be8eb8bb66ec64005c8cc43793d3c60"}).then(function(response){
    console.log(response); 
  })


    // crossDomain: true,

  // dataType: "json",
  // async: true,
  // headers: {
  //   "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
  //     }, success: function(data){
       // console.log(data); 
      }
//   })
// }
// zomatoCall(); 


// $.ajax({
//   url: URL ,
//   method: "GET"
// }).then(function(response) {
//   console.log(response); 






//Trying to find movie api by zipcode but not working 
// var movie = 'Terminator'; 

// var genre = "action"; 

// var queryURL = "https://www.omdbapi.com/?t=" +  "&apikey=trilogy";

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   console.log(response); 


// }); 

//Fandango API Key 

// function fandangoCall (){
// var apiKey = 'ar5fp4yqxxx3cekmk9v6gd4s'; 
// var url = '/developer.fandango.com/forum/read/161673';
// var query = 'Miami'; 
// var queryURL = 'http/developer.fandango.com/forum/read/161673?'

// $.ajax({
//   url: `https://ee.iva-api.com/api/Fandango/movies/?Offset=0&Limit=50&Type=InTheaters&ZipCode=10028&Radius=50&subscription-Key=${apiKey}`, 
//   method: "GET"
// }).then(function(response) {
//   console.log(response); 


// }); 
// }
// fandangoCall()