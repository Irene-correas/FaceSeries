"use strict";

const button = document.querySelector(".page__btn");
let containerList = document.querySelector(".js-container-list");
let arrayFilms = [];

function getCharacter() {
  let input = document.querySelector(".page__input").value;
  fetch(`//api.tvmaze.com/search/shows?q=${input}`)
    .then((result) => {
      return result.json();
    })
    // respuesta de fetch
    .then((data) => {
      arrayFilms = data;
      paintMovies();
      listenMovies();
    });
}
button.addEventListener("click", getCharacter);

if (localStorage.getItem("favorites") != null) {
  let liFavorite = localStorage.getItem("favorites");
  liFavorite = JSON.parse(liFavorite);
  console.log(liFavorite);
  paintMoviesFavorites();
}


function paintMovies() {
  let src = "";
  let html = "";

  for (const serie of arrayFilms) {
    if (serie.show.image === null) {
      src = "//via.placeholder.com/210x295/ffffff/666666/?text = TV";
    } else {
      src = serie.show.image.medium;
    }

    html += `<li class= "js-movies movies__name" movieId="${serie.show.id}" > ${serie.show.name}`;
    html += `<img class="movies__image" src="${src}">`;
    html += `</li>`;
  }
  containerList.innerHTML = html;
}

function listenMovies() {
  const liMovies = document.querySelectorAll(".js-movies");

  for (let index = 0; index < liMovies.length; index++) {
    // Este es el click de la pelicula favorita
    liMovies[index].addEventListener("click", selectFavorites);
  }
}
function selectFavorites(event) {
  const liFavorite = event.currentTarget;
  liFavorite.classList.toggle("movies-favorite");
  let movieId = liFavorite.getAttribute("movieId");

  // Iteración al array de films
  for (let index = 0; index < arrayFilms.length; index++) {
    if (arrayFilms[index].show.id === parseInt(movieId)) {
      arrayFilms[index].isFavorite = !arrayFilms[index].isFavorite;
    }
  }
  // Funcion filter (crea una array con los elementos que cumplan la condicion (current,index,array))
  const favoritesArray = arrayFilms.filter(function (current) {
    if (current.isFavorite === true) {
      return current;
    }
  });
  // Guardar el resultado de la funcion filter en LocalStorage
  localStorage.setItem("favorites", JSON.stringify(favoritesArray));



  paintMoviesFavorites();
}

function paintMoviesFavorites() {
  let html = "";
  for (const serie of arrayFilms) {
    if (serie.isFavorite === true) {
      html += `<li class= "js-movies movies__name">${serie.show.name}`;
      html += `<img class="movies__image" src="${serie.show.image.medium}">`;
      html += `</li>`;
    }
  }
  if (liFavorite != null) {
    for (const serie of liFavorite) {
      html += `<li class= "js-movies movies__name">${serie.show.name}`;
      html += `<img class="movies__image" src="${serie.show.image.medium}">`;
      html += `</li>`;
    }
  }
  document.querySelector(".js-list").innerHTML = html;
}

// reset
const reset = document.querySelector(".js-reset");
function clickReset() {
  document.querySelector(".js-list").innerHTML = "";
  localStorage.clear();
  for (const serie of arrayFilms) {
    serie.isFavorite = false;
  }
}

reset.addEventListener("click", clickReset);
