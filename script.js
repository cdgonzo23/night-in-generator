var mealCheck = document.querySelector('#meal-check');
var drinkCheck = document.querySelector('#meal-check');
var movieCheck = document.querySelector('#movie-check');
var searchBtn = document.querySelector('#search-btn');
var featuredMeal = document.querySelector('#featured-meal');
var featuredMealTitle = document.querySelector('#featured-meal-title');
var mealDescription = document.querySelector('#meal-description');
var mealList = document.querySelector('#meal-list');
var featuredDrink = document.querySelector('#featured-drink');
var featuredDrinkTitle = document.querySelector('#featured-drink-title');
var drinkDescription = document.querySelector('#drink-description');
var drinkList = document.querySelector('#drink-list');
var drinkImg = document.querySelector('#drink-img')
var featuredMovie = document.querySelector('#featured-movie');
var featuredMovieTitle = document.querySelector('#featured-movie-title');
var movieDescription = document.querySelector('#movie-description');
var movieList = document.querySelector('#movie-list');
var movieId;
var mealApiRandom = 'http://www.themealdb.com/api/json/v1/1/random.php';
var drinkApiRandom = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

var movies = ["tt0110912", "tt0038650", "tt0082971", "tt0910970", "tt1375666", "tt0109830", "tt0068646", "tt0111161"]

function getRandomMeal() {
    fetch(mealApiRandom) 
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
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
    })
}

getRandomMovie();