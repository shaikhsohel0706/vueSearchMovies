<template>
  <div class="home">
    <div class="feature-card">
      <RouterLink to="/movie">
        <img
          src="https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
          alt="Naruto Poster"
          class="featured-img"
        />
        <div class="detail">
          <h3>Naruto</h3>
          <p>
            Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition
            and dreams of becoming the Hokage, the village's leader and strongest ninja.
          </p>
        </div>
      </RouterLink>
    </div>
    <form @submit.prevent="searchMovies" class="search-box">
      <input type="text" placeholder="What are you looking for?" v-model="search" />
      <input type="submit" value="Search" />
    </form>
    <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.imdbID">
        <RouterLink :to="{ name: 'MovieDetail', query: {movie: JSON.stringify(movie)} }" class="movie-link">
          <div class="product-image">
            <img :src="movie.Poster" alt="Movie Poster" />
            <div class="type">{{ movie.Type }}</div>

          </div>
          <div class="detail">
            <p class="year">{{ movie.Year }}</p>
            <h3>{{ movie.Title }}</h3>
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="showmassage" v-if="showMovieNotFound">
      <p>Movie not found</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import env from '@/env.js'

const search = ref('')
const movies = ref([])
 
const showMovieNotFound = ref(false)

const searchMovies = () => {
  if (search.value !== '') {
    fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&s=${search.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.Search,"data");
        if (data.Search && data.Search.length > 0) {
          movies.value = data.Search
          showMovieNotFound.value = false
        } else {
          movies.value = []
          showMovieNotFound.value = true
          console.log('Movie not found')
        }

        search.value = ''
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }
}
 
// eslint-disable-next-line no-unused-vars
const navigateToMovieDetail = (movie) => {
  console.log(movie);
}
</script>

<style lang="scss">
.home {
  .feature-card {
    position: relative;

    .featured-img {
      display: block;
      width: 100%;
      height: 300px;
      object-fit: cover;

      position: relative;
      z-index: 0;
    }

    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      z-index: 1;

      h3 {
        color: #fff;
        margin-bottom: 16px;
      }

      p {
        color: #fff;
      }
    }
  }

  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &[type='text'] {
        width: 100%;
        color: #fff;
        background-color: #496583;
        font-size: 20px;
        padding: 10px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        transition: 0.4s;

        &::placeholder {
          color: #f3f3f3;
        }

        &:focus {
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        }
      }

      &[type='submit'] {
        width: 100%;
        max-width: 300px;
        background-color: rgb(30, 158, 135);
        padding: 16px;
        border-radius: 8px;
        color: #fff;
        font-size: 20px;
        text-transform: uppercase;
        transition: 0.4s;

        &:active {
          background-color: #3b8070;
        }
      }
    }
  }

  .movies-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0px 8px;

    .movie {
      max-width: 50%;
      flex: 1 1 50%;
      padding: 16px 8px;

      .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;

        .product-image {
          position: relative;
          display: block;

          img {
            display: block;
            width: 100%;
            height: 275px;
            object-fit: cover;
          }

          .type {
            position: absolute;
            padding: 8px 16px;
            background-color: #42b883;
            color: #fff;
            bottom: 16px;
            left: 0px;
            text-transform: capitalize;
          }
        }

        .detail {
          background-color: #496583;
          padding: 16px 8px;
          flex: 1 1 100%;
          border-radius: 0px 0px 8px 8px;

          .year {
            color: #aaa;
            font-size: 14px;
          }

          h3 {
            color: #fff;
            font-weight: 600;
            font-size: 18px;
          }
        }
      }
    }
  }
  .showmassage {
    color: rgb(163, 89, 89);
    font-size: 40px;
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
}
</style>
