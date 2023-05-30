var mealCheck = document.querySelector('#meal-check');
var drinkCheck = document.querySelector('#drink-check');
var movieCheck = document.querySelector('#movie-check');
var searchBtn = document.querySelector('#search-btn');
var mealEl = document.querySelector('#meal-card');
var mealTitle = document.querySelector('#meal-title');
var mealDescription = document.querySelector('#meal-description');
var mealList = document.querySelector('#meal-list');
var mealImg = document.querySelector('#meal-img')
var drinkEl = document.querySelector('#drink-card');
var drinkTitle = document.querySelector('#drink-title');
var drinkDescription = document.querySelector('#drink-description');
var drinkList = document.querySelector('#drink-list');
var drinkImg = document.querySelector('#drink-img')
var movieEL = document.querySelector('#movie-card');
var movieTitle = document.querySelector('#movie-title');
var movieDescription = document.querySelector('#movie-description');
var movieList = document.querySelector('#movie-list');
var movieImg =  document.querySelector('#movie-img');
var allCheck = document.querySelector('#all-check');
var movieId;
var mealApiRandom = 'https://www.themealdb.com/api/json/v1/1/random.php';
var drinkApiRandom = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
var submitSearch = document.querySelector('#checkbox-submit');
var movies = ["tt0110912", "tt0038650", "tt0082971", "tt0910970", "tt1375666", "tt0109830", "tt0068646", "tt0111161"]
var mealArr = [];
var drinkArr= [];

function buildMealCard(data){
    mealEl.style.display = null;
    mealTitle.textContent = data.meals[0].strMeal;
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
    // console.log(mealPortions)
    for (var i = 0; i < mealIngredients.length; i++) {
        var mealLi = document.createElement('li')
        mealLi.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
        mealLi.textContent = mealIngredients[i] + ': ' + mealPortions[i];
        mealList.appendChild(mealLi);
    }

}

function buildDrinkCard(data){
    drinkEl.style.display = null; 
    drinkTitle.textContent = data.drinks[0].strDrink;
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
    // console.log(drinkPortions)
    for (var i = 0; i < drinkIngredients.length; i++) {
        var drinkLi = document.createElement('li')
        drinkLi.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
        drinkLi.textContent = drinkIngredients[i] + ': ' + drinkPortions[i];
        drinkList.appendChild(drinkLi);
    }
}

function buildMovieCard(data) {
    movieEL.style.display = null;
    movieTitle.textContent = data.Title;
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
}


function getRandomMeal() {
    fetch(mealApiRandom) 
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            localStorage.setItem('meals', (data.meals[0].idMeal));
            console.log(localStorage.getItem('meals'));
            buildMealCard(data);
        })
}

function getRandomDrink() {
    fetch(drinkApiRandom) 
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            // console.log(data.drinks[0].strInstructions);
            localStorage.setItem('drinks', (data.drinks[0].idDrink));
            console.log(localStorage.getItem('drinks'));
            buildDrinkCard(data);
        })
    

}

function getRandomMovie () {
    var randomIndex = Math.floor(Math.random() * movies.length);
    movieId = movies[randomIndex];
    localStorage.setItem('movie', (movieId));
    console.log(localStorage.getItem('movie'));
    var movieApi = 'http://www.omdbapi.com/?i=' + movieId + '&apikey=b4cf8052'
    
    fetch(movieApi)
        .then(function(response){
        return response.json();
    })
        .then(function(data){
        // console.log(data);
       buildMovieCard(data);
    })
}

searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('recent-search').style.display = 'none';

    var formChecks = document.querySelectorAll('.form-check-input')
    console.log(formChecks.checked);
    // console.log(drinkCheck.value);
    if(allCheck.checked) {
        getRandomDrink();
        getRandomMeal();
        getRandomMovie();
        drinkEl.style.display = null;
        mealEl.style.display = null;
        movieEL.style.display = null;
    }
   if (drinkCheck.checked) {
        getRandomDrink();
        mealEl.style.display = 'none';
        movieEL.style.display = 'none';
        
    }
    if (mealCheck.checked) {
        console.log('Food!');
        getRandomMeal();
        drinkEl.style.display = 'none';
        movieEL.style.display = 'none';
        
    };
    if (movieCheck.checked) {
        console.log('Movie!');
        getRandomMovie();
        drinkEl.style.display ='none';
        mealEl.style.display = 'none';
        
       
    };

});

function getPreviousMeal (){
    var mealName = localStorage.getItem('meals');
    console.log(mealName);
    var mealApiName = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealName;

    fetch(mealApiName)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        buildMealCard(data);
 
    })
}

if (localStorage.getItem('meals')){
    getPreviousMeal();
}

function getPreviousDrink(){
    var drinkName = localStorage.getItem('drinks');
    var drinkApiName ='https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkName;

    fetch(drinkApiName)
        .then(function(response){
            return response.json();
    })
        .then(function(data){
            buildDrinkCard(data);
        })
}


if (localStorage.getItem('drinks')){
    getPreviousDrink();
}

function getPreviousMovie(){
    var pastMovieId = localStorage.getItem('movie');
    var pastMovieApi = 'http://www.omdbapi.com/?i=' + pastMovieId + '&apikey=b4cf8052'

    fetch(pastMovieApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        buildMovieCard(data);
    })
}

if (localStorage.getItem('movie')){
    getPreviousMovie();
}
