let page = 1;
let containerCard = "";
let lastMovie;

const API_KEY = "bd92795a62f0bc500027cd3dd29942a3";

let options = {
  rootMargin: "0px 0px 200px 0px",
  threshold: 1.0,
};

let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      page++;
      fetchData();
    }
  });
}, options);

const fetchData = async () => {
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    if (data.status === 200) {
      const dataJson = await data.json();

      dataJson.results.forEach((movie) => {
        containerCard += `
          <div class="container_cards-card">
              <img class="container_cards-img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Movie ${movie.title} Poster">
              <h4>${movie.title}</h4>
          </div>
        `;
      });

      document.getElementById("container_cards").innerHTML = containerCard;

      if (page < 1000) {
        if (lastMovie) {
          observer.unobserve(lastMovie);
        }

        const moviesShown = document.querySelectorAll(
          ".container_cards .container_cards-card"
        );
        lastMovie = moviesShown[moviesShown.length - 1];

        observer.observe(lastMovie);
      }
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
};

fetchData();
