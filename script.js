//Use geoCoding api 
$(document).ready(function(){
  //API CAlls---------------------------------------------------------------------
  var userLat; 
  var userLon; 
  function geoCodingAPI (){
    var street = document.getElementById('street').value.trim() + ','; 
    var city = document.getElementById('city').value.trim() + ','; 
    var state = document.getElementById('state').value.trim()  + ',';
    var zipcode = document.getElementById('zipcode').value.trim()  + ','; 
    var country = document.getElementById('country').value.trim()  + ','; 
    var apiKey = 'b779461f362d4375b7fe76ba33e12e1f';
     var queryUrl = `https://api.opencagedata.com/geocode/v1/json?q=${street}${city}${state}${zipcode}${country}&key=${apiKey}`;
    $.ajax({
      url:  queryUrl,
      method: "GET"
    }).then(function(response) {
     // console.log(response.results); 
      console.log(response); 
      userLat = response.results[0].geometry.lat;
      userLon = response.results[0].geometry.lng;
      zomatoCall(userLat, userLon); 
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
      //console.log(data.nearby_restaurants.length);
      //console.log(data.nearby_restaurants);
      var randomRestaurant = Math.floor(Math.random() * data.nearby_restaurants.length + 1)
      //console.log(randomRestaurant);
      var restName = data.nearby_restaurants[randomRestaurant].restaurant.name;
      var restLocation = data.nearby_restaurants[randomRestaurant].restaurant.location.address;
      var restCuisine = data.nearby_restaurants[randomRestaurant].restaurant.cuisines; 
      var restPhoto = data.nearby_restaurants[randomRestaurant].restaurant.featured_image; 
      console.log(data.nearby_restaurants);
      //console.log(`RestName = ${restName}. RestLocation = ${restLocation}, restCuisine = ${restCuisine}, restPhoto = ${restPhoto}`)
      var restaurantInfo = [restName, restLocation, restCuisine,restPhoto];
      renderRestaurant(restaurantInfo);
      }
    })
  } 
  function parkCall(userLat, userLon, state){
    var query = document.getElementById('state').value.trim();
    var apiKey = 'TxE6rx6hQUOue3edfK0WYCJqyrot1uDhW1KRLBvd';
    var URL = 'https://developer.nps.gov/api/v1/parks?';
    var queryURL = `${URL}stateCode=${query}&api_key=${apiKey}`; 
    $.ajax({
        url: queryURL ,
        method: "GET"
      }).then(function(response) {  
        var randomPark = Math.floor(Math.random(response.data.length ))
        //console.log(response.data);
        //var parkName = response.data[randomPark];
        var parkDescription = response.data[randomPark].name;
        var parkName = response.data[randomPark].description;
        //INFO TO BE DISPLAYED
        //console.log(parkDescription);
        //console.log(parkName); 
        var parkInfo = [parkDescription, parkName]; 
        console.log(parkInfo);
        //var displayParkName = createElement("p");
        renderPark(parkInfo);
      })
    }
  function googleBooks(){
    var query = 'flowers+inauthor:'; 
    var apiKey = 'key=AIzaSyAFxlv3833hPBkescVH_W-BiCVlOlKp_Rs';
    var url = 'https://www.googleapis.com/books/v1/volumes?q='
    var queryURL = url+query+apiKey
    $.ajax({
      url: 'https://www.googleapis.com/books/v1/volumes?q=funny+subjects&maxResults=40',
      method: "GET"
    }).then(function(response) { 
      var randomBook = Math.floor(Math.random()*response.items.length)
      //console.log(`Google Books APi = ${response}`)
      //console.log(response.items); 
      var title = response.items[randomBook].volumeInfo.title; 
      var description = response.items[randomBook].volumeInfo.description;
     // console.log(`book title: ${title}, book description: ${description}`); 
      var bookInfo = [title, description,];
      renderBooks(bookInfo);
    })
  }
  //googleBooks();
  //event call------------------------------------------------------> 
  $('.start-button').click(function(event){
    event.preventDefault();
    //console.log('buttton')
    renderMoodDisplay();
  })
  var name; 
  var wind; 
  var temp;
  var main; 
  function weatherCall(city){
   // console.log(city);
    var query = city
    var apiKey = '8510c14918232716bc9743d7f1fc2f0c'
    var weatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=` +apiKey+'&units=imperial'
    $.ajax({
      url: weatherQueryURL,
      method: "GET"
    }).then(function(response) {
     // console.log(response);
      name = response.name;
      wind = response.wind.speed;
      temp = response.main.temp;
      main = response.weather[0].main;
      console.log(typeof wind); 
      var goodWeather; 
      if(main === 'Clear' && temp > 50 && wind < 15){
        //console.log('goodweather')
        goodWeather = true; 
      }else {
        goodWeather = false; 
      }
      //console.log(name, wind, temp, main)
      //console.log(main);
      var happyButton = document.getElementById('happy-button') 
      var sadButton = document.getElementById('sad-button');
      happyButton.onclick = function(){
        submitButton.style.display = 'none';
        happyLogic(goodWeather);
        }
        //console.log('happy');  
      sadButton.onclick = function (){
        submitButton.style.display = 'none';
        sadLogic(goodWeather); 
        }
      })
    }
   //Game Logic ---------------------------------------
  function happyLogic(goodWeather){
    var happy = true; 
   // console.log('happy');
    if(goodWeather){
      //Go to park when happy and weather good
      parkCall(); 
    }else{
      //Book when happy and weather is bad
       googleBooks();
    }
  }
  ///RElaxed 
  function sadLogic(goodWeather){
    console.log(goodWeather)
  //  var sad = true; 
    console.log('relax'); 
    if(goodWeather){
      //Restaurant when relaxed and weather is good
      geoCodingAPI(); 
    }else{
      getMovies();
    }
  }
//modal
//Rendering Information 
//Park rendering information 
function renderPark(parkInfo){
  while(containerForm.firstChild){
    containerForm.removeChild(containerForm.firstChild);
  }
  containerForm.innerHTML += `<div class="display-info-div has-background"></div>`
  var infoDiv = document.querySelector('.display-info-div');
  //var heading = document.createElement('<h3>How about you go to a Park on this nice day!</h3>')
  //infoDiv.appendChild(heading);
  var weather = document.createElement('img');
  weather.setAttribute('src','https://s7d2.scene7.com/is/image/TWCNews/1031_nc_sunny_weather_2-1');
  weather.classList.add('sun-image');
  infoDiv.appendChild(weather);
  //var heading = document.createElement('<h3>How about you go to a Park on this nice day!</h3>')
  //infoDiv.appendChild(heading);
  for(var i = 0; i < parkInfo.length; i++){
    infoDiv.innerHTML += `<p class="park-info">${parkInfo[i]}</p>'`
    }
  }
  //---------------------------------------------------------------
  function renderBooks(bookInfo){
  while(containerForm.firstChild){
    containerForm.removeChild(containerForm.firstChild);
  }
 // console.log(bookInfo.length);
  // var parkDiv = document.createElement('<div>');
  // console.log(parkDiv); 
  containerForm.innerHTML += `<div class="display-books-div"></div>`
  var infoDiv = document.querySelector('.display-books-div');
  var weather = document.createElement('img');
  weather.setAttribute('src','https://images.pexels.com/photos/459451/pexels-photo-459451.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
  weather.classList.add('rain-image');
  infoDiv.appendChild(weather);
  for(var i = 0; i < bookInfo.length; i++){
    infoDiv.innerHTML += `<p class="books-info">${bookInfo[i]}</p>'`
    }
  }
  function renderRestaurant(restaurantInfo){
  while(containerForm.firstChild){
    containerForm.removeChild(containerForm.firstChild);
  }
  console.log(restaurantInfo);
  // var parkDiv = document.createElement('<div>');
  // console.log(parkDiv); 
  var weather = document.createElement('img');
  weather.setAttribute('src','https://s7d2.scene7.com/is/image/TWCNews/1031_nc_sunny_weather_2-1');
  weather.classList.add('sun-image');


  containerForm.innerHTML += `<div class="display-info-div"></div>`
  var infoDiv = document.querySelector('.display-info-div');
  infoDiv.appendChild(weather);

  for(var i = 0; i < restaurantInfo.length; i++){
    if(i === 3){
      var image = document.createElement(`img`);
      image.setAttribute('src',restaurantInfo[i]);
      image.classList.add('rest-image');
      console.log(restaurantInfo[i]); 
      infoDiv.appendChild(image);
      //infoDiv.appendChild(`<img src='${restaurantInfo[i]}'>`);
      break; 
    }
    infoDiv.innerHTML += `<p class='info'>${restaurantInfo[i]}</p>'`
    }
  }

  var button = document.getElementById('sub');
  var modal = document.getElementById('page-modal');
  var close = document.getElementsByClassName('modal-close')[0]
  var containerForm = document.getElementById('main-content'); 
  var happyButton = document.getElementById('happy-button') 
  var sadButton = document.getElementById('sad-button');
  var submitButton = document.getElementById('submit-button');
  button.onclick = function(){
  modal.style.display = 'block';
  var city = document.getElementById('city').value.trim(); 
  //geoCodingAPI(); 
  //console.log(city); 
  weatherCall(city); 
  }
  //closing the modal x button
  close.onclick = function(){
  modal.style.display = 'none';
  //$('.container').empty(); 
  }
  //closing the dark space around the modal background
  window.onclick = function(event){
    if(event.target.className === 'modal-background'){
      modal.style.display = 'none';
    }
  }
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
      //$('.container').empty(); 
  //renderLibrary();
  // while(containerForm.firstChild){
  //   containerForm.removeChild(containerForm.firstChild);
  // }
  // while(submitButton.firstChild){
  //   submitButton.removeChild(submitButton.firstChild);
  // }
  //submitButton.style.display = 'none';
        //console.log(response.data[0].latLong.split(","));
//Trying to get park lat and lon to compare 
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
  //Click Event for Modam------------------->
  // $('#sad-button').click(function(){
  //   $('.modal').addClass('modal')
  // })
  // $('#happy-button').click(function(){
  //   //containerForm.innerHTML = '';
  // })
//---------------------------------------------------------------------------------------------------//
    $('#searchForm').on('submit', (e) => {
        var searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
function getMovies(searchText) {
//console.log(searchText);
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=b489d0e' + '&s=' + searchText)
        .then((response) => {
            console.log(response);
            var movies = response.data.Search;
            var output = '';
            $.each(movies, (index, movie) => {
                output += `
                    <div class = "col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick="movieSelected('${movie.imdbID})" class="btn btn-primary" href="movie.html">Movie Detail</a>
                        </div>
                    </div>
                `;
            });
            $('#movies').html(output);
        }).catch((err) => {
            console.log(err);
        });
}
function movieSelected(id) {
    sessionStorage.setItem('imdbID', id);
    window.location = 'movie.html';
    return false;
}
function getMovie() {
    var movieId = sessionStorage.getItem('imdbID');
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=b489d0e' + '&i=' + movieId)
        .then((response) => {
            console.log(response);
            var movie = response.data;
            var output = `
                <div class = "row>
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8>
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:</strong>${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong>${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong>${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href ="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class="btn btn-default">Go Back To Search</a>
                    </div>
                </div>
            `;
            $('#movie').html(output);
        }).catch((err) => {
            console.log(err);
        });
}
})