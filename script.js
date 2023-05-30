var mealCheck = document.querySelector('#meal-check');
var drinkCheck = document.querySelector('#drink-check');
var movieCheck = document.querySelector('#movie-check');
var searchBtn = document.querySelector('#search-btn');
var featuredMeal = document.querySelector('#featured-meal');
var featuredMealTitle = document.querySelector('#featured-meal-title');
var mealDescription = document.querySelector('#meal-description');
var mealList = document.querySelector('#meal-list');
var mealImg = document.querySelector('#meal-img')
var featuredDrink = document.querySelector('#featured-drink');
var featuredDrinkTitle = document.querySelector('#featured-drink-title');
var drinkDescription = document.querySelector('#drink-description');
var drinkList = document.querySelector('#drink-list');
var drinkImg = document.querySelector('#drink-img')
var featuredMovie = document.querySelector('#featured-movie');
var featuredMovieTitle = document.querySelector('#featured-movie-title');
var movieDescription = document.querySelector('#movie-description');
var movieList = document.querySelector('#movie-list');
var movieImg =  document.querySelector('#movie-img');
var movieId;
var mealApiRandom = 'https://www.themealdb.com/api/json/v1/1/random.php';
var drinkApiRandom = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

var movies = ["tt0110912", "tt0038650", "tt0082971", "tt0910970", "tt1375666", "tt0109830", "tt0068646", "tt0111161"]

function getRandomMeal() {
    fetch(mealApiRandom) 
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data.meals[0].strInstructions);
            featuredMealTitle.textContent = data.meals[0].strMeal;
            mealDescription.textContent = data.meals[0].strInstructions;
            mealImg.setAttribute('src', data.meals[0].strMealThumb);
            var mealIngredients = Object.keys(data.meals[0]).filter(function(item) {
                if (/^strIngredient/.test(item) && data.meals[0][item]) {
                    return true;
                }
            }).map(function(key){
                return data.meals[0][key];

            })
            var mealPortions = Object.keys(data.meals[0]).filter(function(item) {
                if (/^strMeasure/.test(item) && data.meals[0][item]) {
                    return true;
                }
            }).map(function(key){
                return data.meals[0][key];

            })
            console.log(mealPortions)
            for (var i = 0; i < mealIngredients.length; i++) {
                var mealLi = document.createElement('li')
                mealLi.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
                mealLi.textContent = mealIngredients[i] + ': ' + mealPortions[i];
                mealList.appendChild(mealLi);
            }

        })
    

}
getRandomMeal();

function getRandomDrink() {
    fetch(drinkApiRandom) 
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data.drinks[0].strInstructions);
            featuredDrinkTitle.textContent = data.drinks[0].strDrink;
            drinkDescription.textContent = data.drinks[0].strInstructions;
            drinkImg.setAttribute('src', data.drinks[0].strDrinkThumb);
            var drinkIngredients = Object.keys(data.drinks[0]).filter(function(item) {
                if (/^strIngredient/.test(item) && data.drinks[0][item]) {
                    return true;
                }
            }).map(function(key){
                return data.drinks[0][key];

            })
            var drinkPortions = Object.keys(data.drinks[0]).filter(function(item) {
                if (/^strMeasure/.test(item) && data.drinks[0][item]) {
                    return true;
                }
            }).map(function(key){
                return data.drinks[0][key];

            })
            console.log(drinkPortions)
            for (var i = 0; i < drinkIngredients.length; i++) {
                var drinkLi = document.createElement('li')
                drinkLi.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
                drinkLi.textContent = drinkIngredients[i] + ': ' + drinkPortions[i];
                drinkList.appendChild(drinkLi);
            }
        })
    

}
getRandomDrink();

function getRandomMovie () {
    var randomIndex = Math.floor(Math.random() * movies.length);
    movieId = movies[randomIndex];
    var movieApi = 'http://www.omdbapi.com/?i=' + movieId + '&apikey=b4cf8052'
    
    fetch(movieApi)
        .then(function(response){
        return response.json();
    })
        .then(function(data){
        console.log(data);
        featuredMovieTitle.textContent = data.Title;
        console.log(data.Poster);
        movieImg.setAttribute('src', data.Poster);
        movieDescription.textContent = data.Plot;
        var movieLi1 = document.createElement('li');
        movieLi1.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
        movieLi1.textContent = 'Starring: ' + data.Actors;
        var movieLi2 = document.createElement('li');
        movieLi2.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
        movieLi2.textContent = 'Directed by: ' + data.Director;
        var movieLi3 = document.createElement('li');
        movieLi3.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
        movieLi3.textContent = 'Genre: ' + data.Genre;
        var movieLi4 = document.createElement('li');
        movieLi4.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
        movieLi4.textContent = 'IMDb Rating: ' + data.imdbRating;

        movieList.appendChild(movieLi1);
        movieList.appendChild(movieLi2)
        movieList.appendChild(movieLi3);
        movieList.appendChild(movieLi4);
    })
}

getRandomMovie();