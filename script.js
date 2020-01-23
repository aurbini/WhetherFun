$(document).ready(function(){
  var button = document.getElementById('sub');
  var modal = document.getElementById('page-modal');
  var close = document.getElementsByClassName('modal-close')[0]
  var containerForm = document.getElementById('main-content'); 
  var happyButton = document.getElementById('happy-button') 
  var sadButton = document.getElementById('sad-button');
  var submitButton = document.getElementById('submit-button');
  //var modalBox = document.getElementById('buttons');
  //API CAlls-------------------------------------------------------------->
  var userLat; 
  var userLon; 
  //Lat and lon API call--------------------------------------------------->
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
      console.log(response); 
      userLat = response.results[0].geometry.lat;
      userLon = response.results[0].geometry.lng;
      zomatoCall(userLat, userLon); 
    })
  }
    //Zomato API Call-------------------------------------------->
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
      var randomRestaurant = Math.floor(Math.random() * data.nearby_restaurants.length + 1)
      var restName = data.nearby_restaurants[randomRestaurant].restaurant.name;
      var restLocation = data.nearby_restaurants[randomRestaurant].restaurant.location.address;
      var restCuisine = data.nearby_restaurants[randomRestaurant].restaurant.cuisines; 
      var restPhoto = data.nearby_restaurants[randomRestaurant].restaurant.featured_image; 
      console.log(data.nearby_restaurants);
      var restaurantInfo = [restName, restLocation, restCuisine,restPhoto];
      renderRestaurant(restaurantInfo);
      }
    })
  } 
  //Park API call---------------------------------------------------->
  function parkCall(userLat, userLon, state){
    var query = document.getElementById('state').value.trim();
    var apiKey = 'TxE6rx6hQUOue3edfK0WYCJqyrot1uDhW1KRLBvd';
    var URL = 'https://developer.nps.gov/api/v1/parks?';
    var queryURL = `${URL}stateCode=${query}&api_key=${apiKey}`; 
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {  
        var randomPark = Math.floor(Math.random(response.data.length ))
        var parkDescription = response.data[randomPark].name;
        var parkName = response.data[randomPark].description;
        var parkInfo = [parkDescription, parkName]; 
        console.log(parkInfo);
        renderPark(parkInfo);
      })
    }
    //Google API Call------------------------------------------->
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
      var title = response.items[randomBook].volumeInfo.title; 
      var description = response.items[randomBook].volumeInfo.description;
      var bookInfo = [title, description,];
      renderBooks(bookInfo);
    })
  }
  
  var name; 
  var wind; 
  var temp;
  var main; 
  //Weather API Call------------------------------------------------->
  function weatherCall(city){
    var query = city
    var apiKey = '8510c14918232716bc9743d7f1fc2f0c'
    var weatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=` +apiKey+'&units=imperial'
    $.ajax({
      url: weatherQueryURL,
      method: "GET"
    }).then(function(response) {
      name = response.name;
      wind = response.wind.speed;
      temp = response.main.temp;
      main = response.weather[0].main;
      console.log(temp); 
      var goodWeather; 
      if(temp > 50){
        goodWeather = true; 
      }else {
        goodWeather = false; 
      }
      var happyButton = document.getElementById('happy-button') 
      var sadButton = document.getElementById('sad-button');
      happyButton.onclick = function(){
        this.classList.toggle('is-active');
        //modalBox.style.display = 'none';
        happyLogic(goodWeather);
        }
      sadButton.onclick = function (event){
       // event.style.display = 'none';
        sadLogic(goodWeather); 
        }
      })
    }
    //Movie API Call--------------------------------------------->
    function movieCall() {
      var movies = ["Scrooged", "Groundhog Day", "Friday", "Ted", "Zombieland", "The Nutty Professor", " The Truman Show", "Fear and Loathing in Las Vegas", "The Waterboy", "American Pie", " Bad Boys", " Bad Boys", "Bruce Almighty", "The Longest Yard", "The Bucket List", "Tropic Thunder", " Big Momma's House", "Movie 43", "22 Jump Street", "Central Intelligence"];
      var movie = movies[Math.floor(Math.random()*movies.length)];
      console.log(movie);
      var queryURL = "http://www.omdbapi.com/?t="+movie+"&apikey=b489d0e" ;
          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response)
              // var movieDiv = $('<div class="movie-info">');//
              var title = response.Title;
              var rating = response.Rated;
              var release = response.Released;
              var plot = response.Plot;
              var image = response.Poster;
              //movieDiv.append(title,rating, release, plot, image);//
              //$('#movies-view').append(movieDiv);//
              var movieInfo = [title, rating, release, plot, image];
              renderMovies(movieInfo);         
        })
    }
   //Game Logic --------------------------------------->
  function happyLogic(goodWeather){
    var happy = true; 
   // console.log('happy');---------------------------->
    if(goodWeather){
      //Go to park when happy and weather good
      parkCall(); 
    }else{
      //Book when happy and weather is bad
      googleBooks();
    }
  }
  ///RElaxed------------------------------------------> 
  function sadLogic(goodWeather){
    console.log(goodWeather)
    console.log('relax'); 
    if(goodWeather){
      //Restaurant when relaxed and weather is good
      geoCodingAPI(); 
    }else{
      //Movie when relaxed and weather is bad 
      movieCall();
    }
  }

//Rendering Information 
//Park rendering information \----------------------------------------------->
  function renderPark(parkInfo){
    var submit = document.getElementById('sub');
    submit.style.display = 'none';
    while(containerForm.firstChild){
      containerForm.removeChild(containerForm.firstChild);
    }
    containerForm.innerHTML += `<div class="display-info-div has-background"></div>`
    var infoDiv = document.querySelector('.display-info-div');
    var weather = document.createElement('img');
    weather.setAttribute('src','https://s7d2.scene7.com/is/image/TWCNews/1031_nc_sunny_weather_2-1');
    weather.classList.add('sun-image');
    infoDiv.appendChild(weather);
    for(var i = 0; i < parkInfo.length; i++){
      infoDiv.innerHTML += `<p class="park-info">${parkInfo[i]}</p>'`
      }
  }
  //var movieInfo = [title, rating, release, plot, image];
  function renderMovies(movieInfo){
    var submit = document.getElementById('sub');
    submit.style.display = 'none';
    while(containerForm.firstChild){
      containerForm.removeChild(containerForm.firstChild);
    }
    containerForm.innerHTML += `<div class="display-info-div"></div>`
    var infoDiv = document.querySelector('.display-info-div');
    var weather = document.createElement('img');
    weather.setAttribute('src','https://images.pexels.com/photos/459451/pexels-photo-459451.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
    weather.classList.add('rain-image');
    infoDiv.appendChild(weather);
    for(var i = 0; i < movieInfo.length; i++){
      if(i === 4){
        var imageDiv = document.createElement('div');
        var image = document.createElement(`img`);
        image.setAttribute('src',movieInfo[i]);
        image.classList.add('food-pic');
        //image.classList.add('rest-image');
        imageDiv.appendChild(image);
        // var image = document.createElement(`img`);
        // image.setAttribute('src',movieInfo[i]);
        // image.classList.add('rest-image');
        // infoDiv.appendChild(image);
        break; 
      }
      infoDiv.innerHTML += `<p class="movie-info">${movieInfo[i]}</p>'`
    }containerForm.appendChild(imageDiv); 
  }
  //Render Books---------------------------------------------------->
  function renderBooks(bookInfo){
    var submit = document.getElementById('sub');
    submit.style.display = 'none';
  while(containerForm.firstChild){
    containerForm.removeChild(containerForm.firstChild);
  }
  containerForm.innerHTML += `<div class="display-info-div"></div>`
  var infoDiv = document.querySelector('.display-info-div');
  var weather = document.createElement('img');
  weather.setAttribute('src','https://images.pexels.com/photos/459451/pexels-photo-459451.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
  weather.classList.add('rain-image');
  infoDiv.appendChild(weather);
  for(var i = 0; i < bookInfo.length; i++){
    infoDiv.innerHTML += `<p class="books-info">${bookInfo[i]}</p>'`
    }
  }
  //Render Restaurant------------------------------------------------>
  function renderRestaurant(restaurantInfo){
    console.log(restaurantInfo);
    var submit = document.getElementById('sub');
    submit.style.display = 'none';
    while(containerForm.firstChild){
      containerForm.removeChild(containerForm.firstChild);
    }
    var weather = document.createElement('img');
    weather.setAttribute('src','https://s7d2.scene7.com/is/image/TWCNews/1031_nc_sunny_weather_2-1');
    weather.classList.add('sun-image');
    containerForm.innerHTML += `<div class="display-info-div"></div>`
    var infoDiv = document.querySelector('.display-info-div');
    infoDiv.appendChild(weather);
    for(var i = 0; i < restaurantInfo.length; i++){
      if(i === 3){
        var imageDiv = document.createElement('div');
        var image = document.createElement(`img`);
        image.setAttribute('src',restaurantInfo[i]);
        image.classList.add('food-pic');
        image.classList.add('rest-image');
        imageDiv.appendChild(image);
        break; 
      }
      infoDiv.innerHTML += `<p class='rest-info'>${restaurantInfo[i]}</p>'`
    }containerForm.appendChild(imageDiv); 
  }
  
//EVENTS------------------------------------------------>
 
  button.onclick = function(){
  modal.style.display = 'block';
  var city = document.getElementById('city').value.trim(); 
  weatherCall(city); 
  }
  close.onclick = function(){
  modal.style.display = 'none';
  }
  window.onclick = function(event){
    if(event.target.className === 'modal-background'){
      modal.style.display = 'none';
    }
  }

})