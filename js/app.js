const apiKey= "ccf4c128eaeb5d477fbf28d434f6c912";
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1`;
const searchApi = `https://api.themoviedb.org/3/search/movie?&api_key=${apiKey}&query=`
const imgPath = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


const getMovies = async url => {
  try{
    const response = await fetch(url);
    if(response.ok){
      const responseData = await response.json();
      showMovies(responseData.results);
    }

  }catch(error){
    console.log('An Error Occured')
  }
};

getMovies(apiUrl);

const showMovies = movies => {

  main.innerHTML = "";

  movies.forEach((movie)=>{
    const posterPath = movie.poster_path; 
    const title = movie.title;
    const voteAvg= movie.vote_average;
    const overview = movie.overview;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    movieElement.innerHTML = `
    <img src="${imgPath}${posterPath}" alt = "${title}" />
    <div class ="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(voteAvg)}">${voteAvg}</span>
    </div>
    <div class="overview">
      <h3>Overview:</h3>
      ${overview}
    </div>
    `;

    main.appendChild(movieElement);
  })
}

const getClassByRate = vote =>{
  if(vote >= 8){
    return "green"
  }else if(vote >= 5){
    return "orange"
  }else{
    return "red"
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
      getMovies(searchApi + searchTerm);
      search.value = "";
  }
});

