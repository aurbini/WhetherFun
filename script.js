
//Use geoCoding api 
$(document).ready(function(){

  // if (navigator.geolocation) {
  //   var timeoutVal = 10 * 1000 * 1000;
  //   navigator.geolocation.getCurrentPosition(
  //     displayPosition,
  //   //  displayError,
  //     { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
  //   );
  // }
  // else {
  //   alert("Geolocation is not supported by this browser");
  // }
  
  // function displayPosition(position) {
  //   alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
  // }
  // displayPosition();
  
=======
  //Global Variables
  

  //API CAlls---------------------------------------------------------------------

  function geoCodingAPI (){
    var street = document.getElementById('street').value.trim(); 
    var city = document.getElementById('city').value.trim(); 
    var state = document.getElementById('state').value.trim();
    var zipcode = document.getElementById('zipcode').value.trim(); 
    var country = document.getElementById('country').value.trim(); 
    console.log(street, city, state, zipcode, country); 
    var apiKey = 'b779461f362d4375b7fe76ba33e12e1f';
    var queryUrl = `https://api.opencagedata.com/geocode/v1/json?q=${street}${city}${state}${zipcode}${country}&key=${apiKey}`;

    $.ajax({
      url:  queryUrl ,

      method: "GET"
    }).then(function(response) {
     // console.log(response.results); 
      console.log(response); 
      //var lat = response.results[0].geometry.lat;
      //var lon = response.results[0].geometry.lng;
     // console.log(`Lat = ${lat}, lon = ${lon}`); 
      //zomatoCall(lat, lon); 
      })
    }


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
    var query = document.getElementById('state').value.trim();
    ;
    var apiKey = 'TxE6rx6hQUOue3edfK0WYCJqyrot1uDhW1KRLBvd';
    var URL = 'https://developer.nps.gov/api/v1/parks?';
    var queryURL = `${URL}stateCode=${query}&api_key=${apiKey}`; 
    $.ajax({
        url: queryURL ,
        method: "GET"
      }).then(function(response) {  
        //console.log(response); 
      })
     }
  parkCall(); 



//Click Event for Modam------------------->
$('#sad-button').click(function(){
  $('.modal').addClass('modal')
})

$('#happy-button').click(function(){
   
})







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
  var queryURL = `http://openlibrary.org/subjects/humour.json?details=true`
  $.ajax({
    method:"GET",
    url:queryURL,
    crossDomain:true,
    dataType: "json",
    async: true,
  }).then(function(response){
    console.log(response.works[0].availability.status); 
    console.log(response.works[0].title); 
    console.log(response.works[0]); 

  })
}

function renderLibrary (){
  document.getElementsByID('main-content').innerHTML = '';

}
openlibAPI();

//modal
var button = document.getElementById('sub');
var modal = document.getElementById('page-modal');
var close = document.getElementsByClassName('modal-close')[0]
var containerForm = document.getElementById('main-content'); 


button.onclick = function(){
modal.style.display = 'block';
geoCodingAPI(); 
parkCall(); 
containerForm.innerHTML = '';
//$('.container').empty(); 
renderLibrary();
while(containerForm.firstChild){
  containerForm.removeChild(containerForm.firstChild);
}
}



//closing the modal x button
close.onclick = function(){
modal.style.display = 'none';
//$('.container').empty(); 
}

//closing the dark space around the modal background
window.onclick = function(event){
  if (event.target.className == 'modal-background'){
      this.modal.style.display = 'none';
  }

}

















})
//////--------------------------------------------------------------