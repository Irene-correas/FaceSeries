"use strict";

const button = document.querySelector(".page__btn");
// const containerMovies = document.querySelector("js-movies-container");
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

      console.log(arrayFilms);
    });
}
button.addEventListener("click", getCharacter);

function paintMovies() {
  // let containerList = "";
  for (const serie of arrayFilms) {
    containerList.innerHTML += `<li class= "js-movies movies__name">${serie.show.name}`;
    containerList.innerHTML += `<img class="movies__image" src="${serie.show.image.medium}"></img>`;
    containerList.innerHTML += "</li>";
  }
}
function listenMovies() {
  const liMovies = document.querySelectorAll(".js-movies");

  for (let index = 0; index < liMovies.length; index++) {
    liMovies[index].addEventListener("click", selectFavorites);

  }
}
function selectFavorites(event) {
  console.log('entro click');
  const liFavorite = event.currentTarget;
  liFavorite.classList.toggle("movies-favorite");
  console.log(liFavorite);
}



// borrar
button.click();
