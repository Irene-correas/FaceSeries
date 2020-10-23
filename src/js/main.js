"use strict";

const button = document.querySelector(".page__btn");
// const containerMovies = document.querySelector("js-movies-container");
let containerList = document.querySelector(".js-container-list");
let arrayFilms = [];

function getCharacter() {
  let input = document.querySelector(".page__input").value;
  fetch(`http://api.tvmaze.com/search/shows?q=${input}`)
    .then((result) => {
      return result.json();
    })
    // respuesta de fetch
    .then((data) => {
      arrayFilms = data;
      paintMovies();
      console.log(arrayFilms);
    });
}
button.addEventListener("click", getCharacter);

function paintMovies() {
  // let containerList = "";
  for (const serie of arrayFilms) {
    containerList.innerHTML += `<li class= "movies__name">${serie.show.name}</li>`;
    containerList.innerHTML += `<img class="movies__image" src="${serie.show.image.medium}"></img>`;
    console.log(arrayFilms);
  }


}
// console.log(containerList);

// borrar
button.click();

