const movies = [
  { id: crypto.randomUUID(), title: "The Matrix", genre: "Sci-Fi", year: 1999 },
  { id: crypto.randomUUID(), title: "Inception", genre: "Sci-Fi", year: 2010 },
  {
    id: crypto.randomUUID(),
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
  },
  { id: crypto.randomUUID(), title: "Fight Club", genre: "Drama", year: 1999 },
  {
    id: crypto.randomUUID(),
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
  },
  {
    id: crypto.randomUUID(),
    title: "Pulp Fiction",
    genre: "Crime",
    year: 1994,
  },
  { id: crypto.randomUUID(), title: "Gladiator", genre: "Action", year: 2000 },
];

console.log(movies);

const favorites = [];

const container = document.getElementById("movie-container");
const favList = document.getElementById("favorites-list");

function renderMovies(data) {
  container.replaceChildren();
  data.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <h3>${movie.title}</h3>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Year:</strong> ${movie.year}</p>
        <button class="btn" onclick="addToFavorites('${movie.id}')">Add to Favorites</button>
      `;
    container.appendChild(card);
  });
}

function filterMovies() {
  const searchText = document.getElementById("search").value.toLowerCase();
  const genre = document.getElementById("genre").value;
  const minYear = parseInt(document.getElementById("minYear").value) || 0;

  const filtered = movies.filter((movie) => {
    const matchName = movie.title.toLowerCase().includes(searchText);
    const matchGenre = genre === "all" || movie.genre === genre;
    const matchYear = movie.year >= minYear;
    console.log(matchName && matchGenre && matchYear);

    return matchName && matchGenre && matchYear;
  });

  renderMovies(filtered);
}

function addToFavorites(id) {
  console.log(id);

  const movie = movies.find((m) => m.id === id);
  if (movie && !favorites.some((f) => f.id === id)) {
    favorites.push(movie);
    renderFavorites();
  }
}

function deleteFromFavs(id) {
  const index = favorites.findIndex((f) => f.id === id);
  if (index !== -1) {
    favorites.splice(index, 1);
    renderFavorites();
  }
}

function renderFavorites() {
  favList.replaceChildren();
  favorites.forEach((fav) => {
    const li = document.createElement("li");
    li.innerHTML = `${fav.title} (${fav.year}) - ${fav.genre} <button onclick="deleteFromFavs('${fav.id}')">Delete</button>`;
    favList.appendChild(li);
  });
}

document.getElementById("search").addEventListener("input", filterMovies);
document.getElementById("genre").addEventListener("change", filterMovies);
document.getElementById("minYear").addEventListener("input", filterMovies);

renderMovies(movies);
