
//Use geoCoding api 
$(document).ready(function(){
  //Global Variables
  var mainContent = $('.container'); 
  var street = $('#street');
  var city = $('#city');
  var zipcode = $('#zipcode');
  var state = $('#state');
  var country = $('#country'); 

  //API CAlls---------------------------------------------------------------------
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
  } 
  function parkCall(){
    var query = 'ny';
    var apiKey = 'TxE6rx6hQUOue3edfK0WYCJqyrot1uDhW1KRLBvd';
    var URL = 'https://developer.nps.gov/api/v1/parks?';
    var queryURL = `${URL}stateCode=${query}&api_key=${apiKey}`; 
    $.ajax({
        url: queryURL ,
        method: "GET"
      }).then(function(response) {  
        console.log(response); 
      })
     }
  parkCall(); 

//Helper Function----------------------------------------------->
function renderMoodDisplay(){
  mainContent.empty(); 
  
}








  //event call------------------------------------------------------> 
  $('.start-button').click(function(event){
    event.preventDefault();
    console.log('buttton')


    renderMoodDisplay();
  })



})



































































































































//books


function openlibAPI(){
  var apiKey = ''
  var queryURL = `http://openlibrary.org/subjects/comedy.json?details=true`
  $.ajax({
    method:"GET",
    url:queryURL,
    crossDomain:true,
    dataType: "json",
    async: true,
  }).then(function(response){
    console.log(response); 
  })
}
openlibAPI();

//modal
var button = document.getElementById('sub');
var modal = document.getElementById('page-modal');
var close = document.getElementsByClassName('modal-close')[0]

button.onclick = function(){
modal.style.display = 'block';
}

//closing the modal x button
close.onclick = function(){
modal.style.display = 'none';
}

//closing the dark space around the modal background
window.onclick = function(event){
  if (event.target.className == 'modal-background'){
      this.modal.style.display = 'none';
  }

}


















//////--------------------------------------------------------------