// OtakuVerse Live Movie Explorer - TMDB API integration
// Author: Orlando Vivas

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// HTML Elements selection (from your original tags)
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Initial call to load popular titles on load
if (main) {
    getMovies(APIURL);
}

async function getMovies(url) {
    try {
        const resp = await fetch(url);
        const respData = await resp.json();

        // Output results to console
        console.log(respData);

        // Render movies
        showMovies(respData.results);
    } catch (error) {
        console.error("Error retrieving TMDB movies:", error);
        main.innerHTML = `<p class="empty-message">Could not load movies from TMDB. Please check your internet connection.</p>`;
    }
}

function showMovies(movies) {
    // Clear main container
    main.innerHTML = "";

    if (!movies || movies.length === 0) {
        main.innerHTML = `<p class="empty-message">No results found for your search query.</p>`;
        return;
    }

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        // Construct poster image URL (with a placeholder fallback if poster_path is null)
        const posterUrl = poster_path 
            ? IMGPATH + poster_path 
            : "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&q=80";

        // Generate innerHTML with template literals and loading="lazy" for posters
        movieEl.innerHTML = `
            <img src="${posterUrl}" alt="${title} poster" loading="lazy"/>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div> 
            <div class="overview">
                <h2>Overview:</h2>
                <p>${overview ? overview : 'No overview description available.'}</p>
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Add event listener to form search submit
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const searchTerm = search.value;

        if (searchTerm && searchTerm.trim() !== "") {
            getMovies(SEARCHAPI + encodeURIComponent(searchTerm));
            search.value = "";
        }
    });
}
