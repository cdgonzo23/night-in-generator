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
var movies = ["tt0110912", "tt0038650", "tt0082971", "tt0910970", "tt1375666", "tt0109830", "tt0068646", "tt0111161" , "tt0816692", "tt0120689", "tt0088763", "tt0102926", "tt0172495", "tt0407887", "tt2582802", "tt0034583", "tt1853728", "tt1345836", "tt0112573", "tt0119217", "tt0338013", "tt0211915", "tt0097576", "tt0120382", "tt1130884", "tt0107290", "tt0477348", "tt1205489", "tt0405159", "tt2278388"]
var modal = document.querySelector('.modal');
var modalCloseBtn = document.querySelector('.btn-secondary')
var formCheck = document.querySelectorAll('.form-check-input')


// create function to add content to movieEl card using api data
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
    for (var i = 0; i < mealIngredients.length; i++) {
        var mealLi = document.createElement('li')
        mealLi.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
        mealLi.textContent = mealIngredients[i] + ': ' + mealPortions[i];
        mealList.appendChild(mealLi);
    }

}

// create function to add content to drinkEl card using api data
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

    for (var i = 0; i < drinkIngredients.length; i++) {
        var drinkLi = document.createElement('li')
        drinkLi.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
        drinkLi.textContent = drinkIngredients[i] + ': ' + drinkPortions[i];
        drinkList.appendChild(drinkLi);
    }
}

// create function at add content to movieEl card using api data
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

// function to fetch random meal api and call buildMealCard
function getRandomMeal() {

    fetch(mealApiRandom) 
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            // set meal id to local storage to use for recent search
            localStorage.setItem('meals', (data.meals[0].idMeal));
            console.log(localStorage.getItem('meals'));
            buildMealCard(data);
        })
}

// function to fetch random drink api and call buildDrinkCard
function getRandomDrink() {

    fetch(drinkApiRandom) 
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            // set drink id to local storage to use for recent search
            localStorage.setItem('drinks', (data.drinks[0].idDrink));
            console.log(localStorage.getItem('drinks'));
            buildDrinkCard(data);
        })
    

}

// function to fetch random movie by randomly selecting id in movies array to use as movie id in fetch url
function getRandomMovie () {
    var randomIndex = Math.floor(Math.random() * movies.length);
    movieId = movies[randomIndex];
    // set movie id to local storage to use for recent search
    localStorage.setItem('movie', (movieId));
    console.log(localStorage.getItem('movie'));
    var movieApi = 'https://www.omdbapi.com/?i=' + movieId + '&apikey=b4cf8052'
    
    fetch(movieApi)
        .then(function(response){
        return response.json();
    })
        .then(function(data){
       buildMovieCard(data);
    })
}



// function to fetch meal api using id saved from previous searches using local storage
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

// conditional to call getPreviousMeals if local storage contains key 'meals' with value
if (localStorage.getItem('meals')){
    getPreviousMeal();
}

// function to fetch drink api using id saved from previous searches using local storage
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

// conditional to call getPreviousDrink if local storage contains key 'drinks' with value
if (localStorage.getItem('drinks')){
    getPreviousDrink();
}

// function to fetch movie api using id saved from previous searches using local storage
function getPreviousMovie(){
    var pastMovieId = localStorage.getItem('movie');
    var pastMovieApi = 'https://www.omdbapi.com/?i=' + pastMovieId + '&apikey=b4cf8052'

    fetch(pastMovieApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        buildMovieCard(data);
    })
}

function resetCheckboxes (){
    allCheck.checked = false;
    movieCheck.checked = false;
    drinkCheck.checked = false;
    mealCheck.checked = false;
    movieCheck.removeAttribute('disabled', 'disabled');
    mealCheck.removeAttribute('disabled', 'disabled');
    drinkCheck.removeAttribute('disabled', 'disabled');
}

// conditional to call getPreviousMovie if local storage contains key 'movie' with value
if (localStorage.getItem('movie')){
    getPreviousMovie();
}

// add event listener to disable other checkboxes if allCheck is checked
allCheck.addEventListener('click', function(){
    if (!movieCheck.disabled) {
         movieCheck.setAttribute('disabled', 'disabled');
         mealCheck.setAttribute('disabled', 'disabled');
         drinkCheck.setAttribute('disabled', 'disabled');
    } else {
        movieCheck.removeAttribute('disabled', 'disabled');
         mealCheck.removeAttribute('disabled', 'disabled');
         drinkCheck.removeAttribute('disabled', 'disabled');
    }
})

// add event listener to search button 
searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    // set recent-search display to none to remove h2 visibility

    // add conditional to run all three api functions if allcheck is checked, set all display to null
    if(allCheck.checked) {
        getRandomDrink();
        getRandomMeal();
        getRandomMovie();
        
        drinkEl.style.display = null;
        mealEl.style.display = null;
        movieEL.style.display = null; 
        document.getElementById('recent-search').style.display = 'none';

    }
    // add conditional to call random drink api function if drinkCheck is checked; set other elements display to none
   if (drinkCheck.checked) {
        getRandomDrink();
        mealEl.style.display = 'none';
        movieEL.style.display = 'none';
        document.getElementById('recent-search').style.display = 'none';

        
    }
    // add conditional to call random meal api function if mealCheck is checked; set other elements display to none
    if (mealCheck.checked) {
        getRandomMeal();
        drinkEl.style.display = 'none';
        movieEL.style.display = 'none';
        document.getElementById('recent-search').style.display = 'none';

        
    };
    // add conditional to call random movie api function if movieCheck is checked; set other elements display to none
    if (movieCheck.checked) {
        getRandomMovie();
        drinkEl.style.display ='none';
        mealEl.style.display = 'none';
        document.getElementById('recent-search').style.display = 'none';

    };
    if (!movieCheck.checked && !mealCheck.checked && !drinkCheck.checked && !allCheck.checked) {
        modal.style.display = 'block';
    }
    resetCheckboxes();
});


modalCloseBtn.addEventListener('click', function () {
    modal.style.display = 'none';
})