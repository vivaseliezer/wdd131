// OtakuVerse Manga Catalog & Store Handler
// Author: Orlando Vivas

// Local Manga Dataset (reusing local downloaded images)
const mangaData = [
    {
        id: 1,
        title: "Naruto, Vol. 1",
        author: "Masashi Kishimoto",
        price: 9.99,
        rating: 9.2,
        genre: "action",
        image: "images/naruto.avif",
        description: "Introducing the world's most popular ninja! Naruto Uzumaki has a great ambition: to become the ultimate Hokage. But first, he must pass his ninja exams!"
    },
    {
        id: 2,
        title: "Bleach, Vol. 1",
        author: "Tite Kubo",
        price: 9.99,
        rating: 8.8,
        genre: "action",
        image: "images/bleach-2004-anime.avif",
        description: "Ichigo Kurosaki never asked for the ability to see ghosts—he was born with the gift. When his family is attacked by a Hollow, Ichigo becomes a Soul Reaper!"
    },
    {
        id: 3,
        title: "InuYasha, Vol. 1",
        author: "Rumiko Takahashi",
        price: 12.99,
        rating: 8.5,
        genre: "fantasy",
        image: "images/inuyasha-cover.jpg",
        description: "Transported back in time to feudal Japan, Kagome meets InuYasha, a legendary half-demon seeking the mystical Shikon Jewel shards."
    },
    {
        id: 4,
        title: "Mushoku Tensei, Vol. 1",
        author: "Rifujin na Magonote",
        price: 13.99,
        rating: 9.0,
        genre: "isekai",
        image: "images/mushoko-tensei.avif",
        description: "Reincarnated into a fantasy world as an infant named Rudeus, a former jobless adult decides to live his new life to the absolute fullest without regrets."
    },
    {
        id: 5,
        title: "Reincarnated as a Slime, Vol. 1",
        author: "Fuse",
        price: 11.99,
        rating: 8.7,
        genre: "isekai",
        image: "images/that-time-i-got-reincarnated.jpg",
        description: "Average corporate worker Rimuru Tempest is reincarnated in a fantasy world as a lowly slime with unique absorption powers, building a nation of monsters."
    },
    {
        id: 6,
        title: "Trinity Blood, Vol. 1",
        author: "Sunao Yoshida",
        price: 10.99,
        rating: 7.9,
        genre: "sci-fi",
        image: "images/trinity-blood.jpg",
        description: "In a post-apocalyptic future, a war between humans and vampires rages. Vatican priest Abel Nightroad secretively fights for peace as a vampire feeding on vampires."
    },
    {
        id: 7,
        title: "Blood+, Vol. 1",
        author: "Asuka Katsura",
        price: 10.99,
        rating: 8.0,
        genre: "sci-fi",
        image: "images/blood-plus.jpg",
        description: "Saya Otonashi is an ordinary schoolgirl living with anemia. Her peaceful life is shattered when she is attacked by a chiropteran monster and remembers her true destiny."
    },
    {
        id: 8,
        title: "Eureka Seven, Vol. 1",
        author: "Jinsei Kataoka",
        price: 11.99,
        rating: 8.4,
        genre: "sci-fi",
        image: "images/euruka-seven.jpg",
        description: "Fourteen-year-old Renton joins the outlaw pilot crew of the Gekkostate, meeting Eureka, the enigmatic pilot of the giant Nirvash mecha."
    }
];

// State variables
let currentGenre = "all";
let searchQuery = "";
let currentSort = "default";

// DOM Elements selection
const mainContainer = document.getElementById("main");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort-select");
const filterBar = document.getElementById("filter-bar");
const searchForm = document.getElementById("form");
const toast = document.getElementById("toast");

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    renderCatalog();
    setupListeners();
});

// Render the manga cards dynamically based on filters & sorting
function renderCatalog() {
    if (!mainContainer) return;

    // 1. Filter by Genre
    let filteredList = mangaData.filter(manga => {
        const matchesGenre = (currentGenre === "all" || manga.genre === currentGenre);
        return matchesGenre;
    });

    // 2. Filter by Search Query
    if (searchQuery.trim() !== "") {
        filteredList = filteredList.filter(manga => {
            return manga.title.toLowerCase().includes(searchQuery) ||
                   manga.author.toLowerCase().includes(searchQuery) ||
                   manga.description.toLowerCase().includes(searchQuery);
        });
    }

    // 3. Sort List
    if (currentSort === "price-asc") {
        filteredList.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
        filteredList.sort((a, b) => b.price - a.price);
    } else if (currentSort === "rating-desc") {
        filteredList.sort((a, b) => b.rating - a.rating);
    }

    // Clear main container
    mainContainer.innerHTML = "";

    if (filteredList.length === 0) {
        mainContainer.innerHTML = `<p class="empty-message">No volumes match your search or filter criteria.</p>`;
        return;
    }

    // Generate cards using template literals
    filteredList.forEach(manga => {
        const card = document.createElement("div");
        card.classList.add("movie"); // reuse card animation classes

        // Color coding score border
        const scoreClass = manga.rating >= 9.0 ? 'green' : manga.rating >= 8.3 ? 'orange' : 'red';

        card.innerHTML = `
            <img src="${manga.image}" alt="${manga.title} Manga Cover" loading="lazy">
            <div class="movie-info">
                <h3>${manga.title}</h3>
                <span class="${scoreClass}">${manga.rating}</span>
            </div>
            <div class="manga-details-strip">
                <p class="manga-price">$${manga.price.toFixed(2)}</p>
                <p class="manga-author">By ${manga.author}</p>
            </div>
            <div class="manga-action-container">
                <button class="btn add-to-watchlist-btn" data-title="${manga.title}">Queue Volume</button>
            </div>
            <div class="overview">
                <h2>Plot Summary:</h2>
                <p class="manga-desc-text">${manga.description}</p>
                <span class="manga-genre-badge">${manga.genre.toUpperCase()}</span>
            </div>
        `;

        mainContainer.appendChild(card);
    });

    // Add event listeners to newly rendered buttons
    const addBtns = document.querySelectorAll(".add-to-watchlist-btn");
    addBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const title = e.target.getAttribute("data-title");
            addToWatchlist(title);
        });
    });
}

// Add a selected manga volume to localStorage watchlist
function addToWatchlist(title) {
    let watchlist = [];
    try {
        const stored = localStorage.getItem("watchlist");
        if (stored) {
            watchlist = JSON.parse(stored);
        }
    } catch (e) {
        console.error("Error loading watchlist from localStorage:", e);
    }

    // Check if title is already in watchlist
    const exists = watchlist.some(item => item.title.toLowerCase() === title.toLowerCase());
    if (exists) {
        showToast("Already in your watchlist!");
        return;
    }

    // Create watchlist object
    const newItem = {
        id: Date.now(),
        title: title,
        type: "anime", // manga acts as watchable reading
        progress: 0,
        status: "plan",
        priority: "medium"
    };

    watchlist.push(newItem);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    showToast(`Added "${title}" to your queue!`);
}

// Show a simple toast banner
function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Set up UI Event listeners
function setupListeners() {
    // 1. Live Search Input
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderCatalog();
        });
    }

    // 2. Prevent search form reload
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
        });
    }

    // 3. Sorting select box
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            currentSort = e.target.value;
            renderCatalog();
        });
    }

    // 4. Genre Filter Buttons
    if (filterBar) {
        filterBar.addEventListener("click", (e) => {
            if (e.target.classList.contains("filter-btn")) {
                // Remove active from all buttons
                const buttons = filterBar.querySelectorAll(".filter-btn");
                buttons.forEach(btn => btn.classList.remove("active"));

                // Add active to clicked button
                e.target.classList.add("active");

                // Update genre and render
                currentGenre = e.target.getAttribute("data-genre");
                renderCatalog();
            }
        });
    }
}
