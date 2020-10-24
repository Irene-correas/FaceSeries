"use strict";

const button = document.querySelector(".page__btn");
// const containerMovies = document.querySelector("js-movies-container");
let containerList = document.querySelector(".js-container-list");
let arrayFilms = [];
let arrayFavorites = [];

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

      console.log(arrayFilms);
    });
}
button.addEventListener("click", getCharacter);

function paintMovies() {
  let html = "";
  for (const serie of arrayFilms) {
    html += `<li class= "js-movies movies__name" movieId="${serie.show.id}" > ${serie.show.name}`;
    html += `<img class="movies__image" src="${serie.show.image.medium}">`;
    html += `</li>`;
    containerList.innerHTML = html;
  }
}
function listenMovies() {
  const liMovies = document.querySelectorAll(".js-movies");

  for (let index = 0; index < liMovies.length; index++) {
    liMovies[index].addEventListener("click", selectFavorites);
  }
}
function selectFavorites(event) {
  const liFavorite = event.currentTarget;
  liFavorite.classList.toggle("movies-favorite");
  console.log(liFavorite);
  let movieId = liFavorite.getAttribute("movieId");

  for (let index = 0; index < arrayFilms.length; index++) {
    if (arrayFilms[index].show.id == movieId) {
      arrayFilms[index].isFavorite = !arrayFilms[index].isFavorite;
    }
  }
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
  document.querySelector(".js-list").innerHTML = html;
}

// borrar
button.click();
