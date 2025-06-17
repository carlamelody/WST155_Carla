const form = document.querySelector('form');
const movieListElement = document.getElementById('movieList');

const movieTitle = document.getElementById('movieTitle');
const movieDescription = document.getElementById('movieDescription');
const movieYear = document.getElementById('movieYear');
const imageUrl = document.getElementById('imageUrl');
const movieRating = document.getElementById('movieRating');
const movieGenre = document.getElementById('movieGenre');
const movieBoxOffice = document.getElementById('movieBoxOffice');
const movieCast = document.getElementById('movieCast');

// Render movies from MongoDB
async function renderMovieList() {
    const res = await fetch('http://localhost:3000/movies');
    const movies = await res.json();
    movieListElement.innerHTML = '';
    movies.forEach(movie => {
        const item = document.createElement('div');
        item.classList.add('movie-item');
        item.innerHTML = `
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <p><strong>Year:</strong> ${movie.year}</p>
            <p><strong>Rating:</strong> ${movie.rating}</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Box Office:</strong> $${movie.boxOffice}M</p>
            <p><strong>Cast:</strong> ${movie.cast}</p>
            <img src="${movie.imageUrl}" alt="${movie.title}">
            <button onclick="deleteMovie('${movie._id}')">Delete</button>
        `;
        movieListElement.appendChild(item);
    });
}

form.addEventListener('submit', async e => {
    e.preventDefault();
    const newMovie = {
        title: movieTitle.value,
        description: movieDescription.value,
        year: movieYear.value,
        imageUrl: imageUrl.value,
        rating: movieRating.value,
        genre: movieGenre.value,
        boxOffice: movieBoxOffice.value,
        cast: movieCast.value
    };

    await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie)
    });

    form.reset();
    renderMovieList();
});

async function deleteMovie(id) {
    await fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE'
    });
    renderMovieList();
}

renderMovieList();
