<template>
  <div class="movie-detail">
    <h2>{{ movie.Title }}</h2>
    <p class="movie" data-release-year="">{{ movie.Year }}</p>
    <p class="imdbID" data-imdbID="">{{ movie.imdbID }}</p>
    <p class="Type" data-Type="">{{ movie.Type }}</p>
    <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
  </div>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      movie: {}
    }
  },
  mounted() {
    this.movie = JSON.parse(this.$route.query.movie)
    console.log(this.movie)
  }
}
</script>

<style lang="scss">
.movie-detail {
  padding: 16px;

  h2 {
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .featured-img {
    display: block;
    max-width: 200px;
    margin-bottom: 16px;
  }

  p {
    color: #fff;
    font-size: 18px;
    line-height: 1.4;
  }
  .movie::before {
    content: 'Release Year: ' attr(data-release-year);
  }
  .imdbID::before {
    content: 'imdbID: ' attr(data-imdbID);
  }
  .Type::before {
    content: 'Type: ' attr(data-Type);
  }
}
</style>
