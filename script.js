
//Use geoCoding api 
$(document).ready(function(){
  //API CAlls---------------------------------------------------------------------

  function geoCodingAPI (){
    var street = document.getElementById('street').value.trim() + ','; 
    var city = document.getElementById('city').value.trim() + ','; 
    var state = document.getElementById('state').value.trim()  + ',';
    var zipcode = document.getElementById('zipcode').value.trim()  + ','; 
    var country = document.getElementById('country').value.trim()  + ','; 
    var apiKey = 'b779461f362d4375b7fe76ba33e12e1f';
     var queryUrl = `https://api.opencagedata.com/geocode/v1/json?q=${street}${city}${state}${zipcode}${country}&key=${apiKey}`;

    $.ajax({
      url:  queryUrl ,

      method: "GET"
    }).then(function(response) {
     // console.log(response.results); 
      console.log(response); 
      var userLat = response.results[0].geometry.lat;
      var userLon = response.results[0].geometry.lng;
      parkCall(userLat, userLon,state); 
      console.log(`User Lat = ${userLat},  User lon = ${userLon}`); 
      zomatoCall(userLat, userLon); 
      weatherCall(city); 
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
      var randomRestaurant = Math.floor(Math.random(data.nearby_restaurants.length + 1))
      var restName = data.nearby_restaurants[randomRestaurant].restaurant.name;
      var restLocation = data.nearby_restaurants[randomRestaurant].restaurant.location.address;
      var restCuisine = data.nearby_restaurants[randomRestaurant].restaurant.cuisines; 
      var restPhoto = data.nearby_restaurants[randomRestaurant].restaurant.photos_url; 
      console.log(`RestName = ${restName}. RestLocation = ${restLocation}, restCuisine = ${restCuisine}, restPhoto = ${restPhoto}`)
      }
    })
  } 

  function parkCall(userLat, userLon, state){
    var query = state; 
    //document.getElementById('state').value.trim();
    var apiKey = 'TxE6rx6hQUOue3edfK0WYCJqyrot1uDhW1KRLBvd';
    var URL = 'https://developer.nps.gov/api/v1/parks?';
    var queryURL = `${URL}stateCode=${query}&api_key=${apiKey}`; 
    $.ajax({
        url: queryURL ,
        method: "GET"
      }).then(function(response) {  
        var randomPark = Math.floor(Math.random(response.data.length ))
        console.log(response.data);
        console.log(response.data[randomPark]);
        console.log(response.data[randomPark].name);
        console.log(response.data[randomPark].description);
        // // console.log(response.data[0].latLong.split(","));

        // var parkLat; 
        // var parkLon; 
        // for(var i = 0; i < response.data.length; i++){
        //   var cordinates = response.data[i].latLong.split(",");
        //   var cordinatesLat = cordinates[0];
        //   var cordinatesLon = cordinates[1];
        //  // console.log(cordinatesLon)
        //  // console.log(cordinatesLat)
        //   for(var currentIndex = 0; currentIndex < cordinatesLat.length; currentIndex++){
        //     if(cordinatesLat[currentIndex] === ':'){
        //       parkLat = cordinatesLat.slice([currentIndex +1])
        //       parkLat = parseInt(parkLat);
        //       //console.log(parkLat);
        //     }
        //   }
        //   for(var i = 0; i< cordinatesLon.length; i++){
        //     if(cordinatesLon[i] === ':'){
        //       parkLon = cordinatesLon.slice([i +1])
        //       parkLon = parseInt(parkLon)
        //       //console.log(parkLon);

        //     }
        //   }
        //   //console.log(parkLon); 
        //     if((Math.abs(userLon - parkLon)) < 3){
        //       console.log(response.data[0].name)
        //     }
         // }
         })
      }
//Click Event for Modam------------------->
$('#sad-button').click(function(){
  $('.modal').addClass('modal')
})

$('#happy-button').click(function(){
   
})

function googleBooks(){
  var query = 'flowers+inauthor:'; 
  var apiKey = 'key=AIzaSyAFxlv3833hPBkescVH_W-BiCVlOlKp_Rs';
  var url = 'https://www.googleapis.com/books/v1/volumes?q='
  var queryURL = url+query+apiKey
  $.ajax({
    url: 'https://www.googleapis.com/books/v1/volumes?q=comedy+subjects&maxResults=40'
    ,
    method: "GET"
  }).then(function(response) { 
    var randomBook = Math.floor(Math.random()*response.items.length)
    console.log(`Google Books APi = ${response}`)
    console.log(response.items[randomBook].volumeInfo.title); 
    console.log(response.items[randomBook].volumeInfo.description);
    console.log(response.items[randomBook].volumeInfo.imageLinks.smallThumbnail);
    })
}
googleBooks();






  //event call------------------------------------------------------> 
  $('.start-button').click(function(event){
    event.preventDefault();
    console.log('buttton')


    renderMoodDisplay();
  })


  function weatherCall(city){
    var query = city
    var apiKey = '8510c14918232716bc9743d7f1fc2f0c'
    var weatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=` +apiKey+'&units=imperial'
    $.ajax({
        url: weatherQueryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
      
    // $('#city').html('<div>' + response.name + '</div>');
    // $('#state').html('<div>' + response.name + '</div>');
    // $('#zipcode').html('<div>' + response.zipcode + '</div>');
    // $('#country').html('<div>' + response.name + '</div>');
    // $('wind').text("Wind Speed: " + response.wind.speed);
    // $('humidity').text("Humidity: " + response.main.humidity);
    // $('temp').text('Temperature(F) ' + response.main.temp);
    // var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    // $('tempF').text('Temperature (Kelvin)' + tempF);
    // console.log("Wind Speed: " + response.wind.speed);
    // console.log("Humidity: " + response.main.humidity);
    // console.log("Temperature (F): " + response.main.temp);
    // });
  })
}



 































































































































  //modal
  var button = document.getElementById('sub');
  var modal = document.getElementById('page-modal');
  var close = document.getElementsByClassName('modal-close')[0]
  var containerForm = document.getElementById('main-content'); 

  var happyButton = document.getElementById('happy-button') 
  var sadButton = document.getElementById('sad-button');
  var submitButton = document.getElementById('submit-button');

  happyButton.onclick = function (){
      submitButton.style.display = 'none';
  }
  sadButton.onclick = function (){
    submitButton.style.display = 'none';

}

  button.onclick = function(){
  modal.style.display = 'block';
  geoCodingAPI(); 
  weatherCall(); 
  containerForm.innerHTML = '';

  
  //$('.container').empty(); 
  //renderLibrary();
  // while(containerForm.firstChild){
  //   containerForm.removeChild(containerForm.firstChild);
  // }
  // while(submitButton.firstChild){
  //   submitButton.removeChild(submitButton.firstChild);
  // }
  //submitButton.style.display = 'none';

  }



  //closing the modal x button
  close.onclick = function(){
  modal.style.display = 'none';
  //$('.container').empty(); 
  }

  //closing the dark space around the modal background
  window.onclick = function(event){
    if (event.target.className == 'modal-background'){
      // this.modal.style.display = 'none';
    }

  }




})





//books


// function openlibAPI(){
//   var apiKey = ''
//   var queryURL = `http://openlibrary.org/subjects/humour.json?details=true`
//   $.ajax({
//     method:"GET",
//     url:queryURL,
//     crossDomain:true,
//     dataType: "json",
//     async: true,
//   }).then(function(response){
//     // console.log(response.works[0].availability.status); 
//     // console.log(response.works[0].title); 
//     // console.log(response.works[0]); 

//     })
//   }

// function renderLibrary (){
//   document.getElementsByID('main-content').innerHTML = '';

  // }
 // openlibAPI();







//////--------------------------------------------------------------