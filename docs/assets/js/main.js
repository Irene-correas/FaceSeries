"use strict";const button=document.querySelector(".page__btn");let containerList=document.querySelector(".js-container-list"),arrayFilms=[];function getCharacter(){let e=document.querySelector(".page__input").value;fetch("//api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{arrayFilms=e,paintMovies(),listenMovies()})}button.addEventListener("click",getCharacter);const name=localStorage.getItem("favorites");function paintMovies(){let e="",t="";for(const i of arrayFilms)e=null===i.show.image?"//via.placeholder.com/210x295/ffffff/666666/?text = TV":i.show.image.medium,t+=`<li class= "js-movies movies__name" movieId="${i.show.id}" > ${i.show.name}`,t+=`<img class="movies__image" src="${e}">`,t+="</li>";containerList.innerHTML=t}function listenMovies(){const e=document.querySelectorAll(".js-movies");for(let t=0;t<e.length;t++)e[t].addEventListener("click",selectFavorites)}function selectFavorites(e){const t=e.currentTarget;t.classList.toggle("movies-favorite");let i=t.getAttribute("movieId");for(let e=0;e<arrayFilms.length;e++)arrayFilms[e].show.id===parseInt(i)&&(arrayFilms[e].isFavorite=!arrayFilms[e].isFavorite);const s=arrayFilms.filter((function(e){if(!0===e.isFavorite)return e}));localStorage.setItem("favorites",JSON.stringify(s)),paintMoviesFavorites()}function paintMoviesFavorites(){let e="";for(const t of arrayFilms)!0===t.isFavorite&&(e+='<li class= "js-movies movies__name">'+t.show.name,e+=`<img class="movies__image" src="${t.show.image.medium}">`,e+="</li>");document.querySelector(".js-list").innerHTML=e}const reset=document.querySelector(".js-reset");function clickReset(){document.querySelector(".js-list").innerHTML="",localStorage.clear();for(const e of arrayFilms)e.isFavorite=!1}reset.addEventListener("click",clickReset);