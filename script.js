var queryURL = "http://www.omdbapi.com/?i=tt3896198&apikey=b489d0e"
$.ajax ({
    url:queryURL,
    method:"GET"
})

.then(function(response) {
    console.log(response)
}



function (){
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
      var title = response.items[randomBook].volumeInfo.title; 
      var description = response.items[randomBook].volumeInfo.description;
    })
  }
  //googleBooks();









function movieTheatre() {
    var query = 'ny';
    var apiKey = 'qbrg7qrtgv798gkj8f8gkgdk';
    var URL = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=2020-01-20&zip=78701&api_key=qbrg7qrtgv798gkj8f8gkgdk';
    var queryURL = `${URL}stateCode=${query}&api_key=${apiKey}`; 
    $.ajax({
        url: queryURL ,
        method: "GET"
      }).then(function(response) {  
        console.log(response); 
      })
     }
     movieTheatre();
//----------------------------------------------------------------------------------//
var submit;
var city;
var state;
var zipcode;
var country;
var APIkey = '&appid=559ef9ee4eef6c921d74471722ef2949';
var weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?';
var forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var units = '&units=imperial';

$(document).ready(function() {

var 

//declearing gloabl variables. Display Movies based on sad and happy mood. 
//var movieTheatre
//var sadMood = 
//var happyMood = 
//var sadbtn = 
//var happybtn =

//Once sad or happy button clicked the screen will display the comedy or action movies 
//$(document).ready(function() {

    //function weather() {
    //var city =
   // var state =
   // var zipCode =
   // var country =
   // var temperature =
   // var apiKey = '&appid=559ef9ee4eef6c921d74471722ef2949&units=imperial';
   // var weatherApi = 'http://api.openweathermap.org/data/2.5/weather?q=';
  //  weather()
  













//Declearing global variables. Dispay weather information along with movie list.
//var city =
//var zipCode =
//var street =
//var state =
//var country =
//var temperature =
//var humidity =
//var  windspeed =
//var uvIndex =






































































































    var search ="Austin, Chicago, New York, Orlando, San Francisco, Seatlle, Denver, Atlanta";// $('.text-box').text();//
    var city = $(".list-group").text();
    var icon = $("#icons").text();
    var temperature = $("#temperature").text();
    var humidity = $("#humidity").text();
    var windspeed =  $("#windspeed").text();
    var uvIndex =  $("#uvindex").text();
    
    function weather() {
        
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=559ef9ee4eef6c921d74471722ef2949&units=imperial";
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response) 
    var tem=response.main.temp
    $("#temperature").html(tem)
    var hum=response.main.humidity
    $("#humidity").html(hum)
    var speedWind=response.wind.speed
    $("#windspeed").html(speedWind)
    });
    };
    weather();
    });
    
    
        var movies ="Austin, Chicago, New York, Orlando, San Francisco, Seatlle, Denver, Atlanta";// $('.text-box').text();//
        var city = $(".list-group").text();
        var icon = $("#icons").text();
        var temperature = $("#temperature").text();
        var humidity = $("#humidity").text();
        var windspeed =  $("#windspeed").text();
        var uvIndex =  $("#uvindex").text();
        
        function weather() {
            
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=559ef9ee4eef6c921d74471722ef2949&units=imperial";
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        console.log(response) 
        var tem=response.main.temp
        $("#temperature").html(tem)
        var hum=response.main.humidity
        $("#humidity").html(hum)
        var speedWind=response.wind.speed
        $("#windspeed").html(speedWind)
        });
        };
        weather();


       

        







        bekhruz part 
        $(document).ready(() => {
            $('#searchForm').on('submit', (e) => {
                var searchText = $('#searchText').val();
                getMovies(searchText);
                e.preventDefault();
            });
        });
        
        function getMovies(searchText) {
            console.log(searchText);
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