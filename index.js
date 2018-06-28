"use strict";

var urlOMDB = 'http://www.omdbapi.com/?apikey=e477ed6a';

var app = new Vue({
  el: "#app",
  data: {
    movies: [],
    totalMovies: 0,    
    elementsPerPage: 10,
    movieSearchText: ''
  },
  methods: {
    httpGETRequest() {
        let urlSearch = urlOMDB + '&s=' + this.movieSearchText;
        fetch(urlSearch)
        .then((response) => {
            return response.json();
        })
        .then((jsonMovies) => {
            console.log(jsonMovies);
            this.movies = jsonMovies.Search;
            this.totalMovies = jsonMovies.totalResults;
        })
        .finally(() => {
            console.log('Fetch OMDB API OK');
        });
    },
    httpPOSTRequest() {}
  },
  computed: {
    totals() {
      return (
        "Tenemos " +
        this.totalMovies +
        " resultados en total, distribuídos en " +
        this.totalPages +
        " páginas, a razón de " +
        this.elementsPerPage +
        " películas por página"
      );
    },
    allowSearch() {
        if(this.movieSearchText.length > 2) {
            return true;
        } else {
            return false;
        }
    },
    totalPages() {
        if(this.totalMovies > 0) {
            return Math.ceil(this.totalMovies / this.elementsPerPage);
        } else {
            return 0;
        }
    }
  }
});
