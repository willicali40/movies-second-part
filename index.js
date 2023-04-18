let page = 1;

const API_KEY = "bd92795a62f0bc500027cd3dd29942a3";

const fetchData = async () => {
  try {
    const data = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${page}`);
    console.log(data);
    if (data.status === 200) {
      const dataJson = await data.json();
      console.log(dataJson);

      let containerCard = '';

      dataJson.results.forEach(movie => {
        containerCard += `
          <div class="container_cards-card">
              <img class="container_cards-img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Movie ${movie.title} Poster">
              <h4>${movie.title}</h4>
          </div>
        `;
      });


      document.getElementById('container_cards').innerHTML = containerCard;

    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
};

fetchData();

