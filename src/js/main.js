"use strict";

const button = document.querySelector(".page__btn");
// const containerMovies = document.querySelector("js-movies-container");
let containerList = document.querySelector(".js-container-list");
let arrayFilms = [];
let arrayFavorites = [];

function getCharacter() {
  console.log("entro");
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
      // setLocalStorage();

      console.log(arrayFilms);
    });
}
button.addEventListener("click", getCharacter);

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

  console.log(liFavorite);
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
  })
  // Guardar el resultado de la funcion filter en LocalStorage
  localStorage.setItem("favorites", JSON.stringify(favoritesArray));

  const name = localStorage.getItem("favorites");
  console.log(name);

  console.log(arrayFilms);
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
