// OtakuVerse Home Page Script - Featured local anime
// Author: Orlando Vivas

const animeDatabase = [
    {
        title: "InuYasha: Castle Beyond the Looking Glass",
        rating: 7.8,
        genre: "Action / Fantasy",
        year: 2002,
        image: "images/inuyasha-cover.jpg",
        description: "InuYasha and his companions have finally defeated Naraku. But a new adversary arises from Naraku's remains, threatening the stability of the feudal era."
    },
    {
        title: "That Time I Got Reincarnated as a Slime",
        rating: 8.2,
        genre: "Isekai / Fantasy",
        year: 2018,
        image: "images/that-time-i-got-reincarnated.jpg",
        description: "After being killed by a thief, a regular corporate worker is reincarnated as a slime monster in a magical fantasy world, building his own nation of monsters."
    },
    {
        title: "Trinity Blood",
        rating: 7.4,
        genre: "Sci-Fi / Vampire Action",
        year: 2005,
        image: "images/trinity-blood.jpg",
        description: "In a dark post-apocalyptic future, a global war between humans and vampires rages. Vatican priest Abel Nightroad secretively fights to protect humanity."
    },
    {
        title: "Blood+",
        rating: 7.6,
        genre: "Action / Horror / Mystery",
        year: 2005,
        image: "images/blood-plus.jpg",
        description: "An ordinary high school student, Saya Otonashi, suffers from amnesia. Her life changes forever when she is attacked by a chiropteran vampire beast."
    },
    {
        title: "Eureka Seven",
        rating: 7.9,
        genre: "Sci-Fi / Mecha / Drama",
        year: 2005,
        image: "images/euruka-seven.jpg",
        description: "Fourteen-year-old Renton Thurston leaves his grandfather's mechanics workshop to join the mercenary pilot group Gekkostate, meeting the mysterious Eureka."
    },
    {
        title: "Featured Spotlight Masterpiece",
        rating: 8.5,
        genre: "Fantasy / Adventure",
        year: 2026,
        image: "images/spotlight-of-the-day.jpg",
        description: "Our handpicked special recommendation of the day. Explore, discuss, and track your anime experiences directly on OtakuVerse!"
    },
    {
        title: "Bleach (2004)",
        rating: 8.4,
        genre: "Action / Supernatural / Adventure",
        year: 2004,
        image: "images/bleach-2004-anime.avif",
        description: "High school student Ichigo Kurosaki, who has the ability to see ghosts, obtains the powers of a Soul Reaper to protect his town from evil spirits."
    },
    {
        title: "Mushoku Tensei: Jobless Reincarnation",
        rating: 8.4,
        genre: "Isekai / Fantasy",
        year: 2021,
        image: "images/mushoko-tensei.avif",
        description: "An unemployed 34-year-old NEET dies and is reincarnated in a fantasy realm of sorcery as Rudeus Greyrat, resolved to make something of his new life."
    },
    {
        title: "Naruto",
        rating: 8.3,
        genre: "Action / Martial Arts / Shonen",
        year: 2002,
        image: "images/naruto.avif",
        description: "Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the leader of his village."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Populate Spotlight Card randomly
    const spotlightContainer = document.getElementById("featured-anime-container");
    if (spotlightContainer) {
        const randomIndex = Math.floor(Math.random() * animeDatabase.length);
        const item = animeDatabase[randomIndex];
        
        let rateClass = 'red';
        if (item.rating >= 8.0) {
            rateClass = 'green';
        } else if (item.rating >= 5.0) {
            rateClass = 'orange';
        }

        spotlightContainer.innerHTML = `
            <figure class="movie spotlight-card">
                <div class="spotlight-img-container">
                    <img class="spotlight-img" src="${item.image}" alt="${item.title} Spotlight Poster" loading="lazy">
                </div>
                <figcaption class="spotlight-caption">
                    <span class="eyebrow">Spotlight of the Day</span>
                    <h3 class="spotlight-title">${item.title}</h3>
                    <p class="spotlight-detail"><strong>Score:</strong> <span class="${rateClass}">${item.rating}</span></p>
                    <p class="spotlight-detail"><strong>Genre:</strong> ${item.genre}</p>
                    <p class="spotlight-detail"><strong>Release:</strong> ${item.year}</p>
                    <p class="spotlight-desc">${item.description}</p>
                </figcaption>
            </figure>
        `;
    }

    // 2. Populate Local Recommendations Grid
    const recommendationsGrid = document.getElementById("recommendations-grid");
    if (recommendationsGrid) {
        recommendationsGrid.innerHTML = ""; // Clear
        
        animeDatabase.forEach((anime) => {
            let rateClass = 'red';
            if (anime.rating >= 8.0) {
                rateClass = 'green';
            } else if (anime.rating >= 5.0) {
                rateClass = 'orange';
            }

            const animeCard = document.createElement("div");
            animeCard.classList.add("movie");
            
            animeCard.innerHTML = `
                <img src="${anime.image}" alt="${anime.title} cover" loading="lazy">
                <div class="movie-info">
                    <h3>${anime.title}</h3>
                    <span class="${rateClass}">${anime.rating}</span>
                </div>
                <div class="overview">
                    <h2>Overview:</h2>
                    <p>${anime.description}</p>
                </div>
            `;
            recommendationsGrid.appendChild(animeCard);
        });
    }
});
