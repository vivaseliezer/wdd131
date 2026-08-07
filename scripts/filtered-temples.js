// W04 Filtered Temple Album JavaScript

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "images/aba-nigeria-temple.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "images/manti-utah-temple.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Salt_Lake_Temple_UT2.jpg/500px-Salt_Lake_Temple_UT2.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/LDS_Rome_Temple.jpg/500px-LDS_Rome_Temple.jpg"
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 53997,
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Tokyo_Japan_Temple.jpg/500px-Tokyo_Japan_Temple.jpg"
    },
    {
        templeName: "London England",
        location: "Newchapel, Surrey, England",
        dedicated: "1958, September, 7",
        area: 34985,
        imageUrl:
            "images/London-Temple.jpg"
    }
];

// Builds one temple card (section.card element) from a temple object
function createTempleCard(temple) {
    const card = document.createElement("section");
    card.className = "card";

    const figure = document.createElement("figure");

    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";
    if (temple.templeName === "London England") {
        img.classList.add("fit-contain");
    }

    imageContainer.appendChild(img);

    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = `
        <h3>${temple.templeName}</h3>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    `;

    figure.appendChild(imageContainer);
    figure.appendChild(figcaption);
    card.appendChild(figure);

    return card;
}

// Renders a list of temples into the gallery grid
function displayTemples(templeList) {
    const galleryGrid = document.querySelector(".gallery-grid");
    if (!galleryGrid) return;

    galleryGrid.innerHTML = "";
    templeList.forEach((temple) => {
        galleryGrid.appendChild(createTempleCard(temple));
    });
}

// Returns the dedication year as a number from a "YYYY, Month, Day" string
function getDedicatedYear(temple) {
    return parseInt(temple.dedicated.split(",")[0], 10);
}

// Applies a named filter to the temples array
function filterTemples(filterName) {
    switch (filterName) {
        case "old":
            return temples.filter((temple) => getDedicatedYear(temple) < 1900);
        case "new":
            return temples.filter((temple) => getDedicatedYear(temple) > 2000);
        case "large":
            return temples.filter((temple) => temple.area > 90000);
        case "small":
            return temples.filter((temple) => temple.area < 10000);
        default:
            return temples;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Hamburger Menu Toggle Logic
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.querySelector("nav");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            menuBtn.classList.toggle("active");

            if (menuBtn.classList.contains("active")) {
                menuBtn.innerHTML = "&#10060;"; // ❌ unicode symbol
                menuBtn.setAttribute("aria-expanded", "true");
            } else {
                menuBtn.innerHTML = "&#9776;"; // ☰ unicode symbol
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });
    }

    // 2. Navigation Filtering Logic
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            // Update active link styling
            navLinks.forEach((navLink) => navLink.classList.remove("active"));
            link.classList.add("active");

            // Filter and display temples based on the clicked link
            const filterName = link.dataset.filter;
            displayTemples(filterTemples(filterName));

            // Close mobile menu after selection
            if (navMenu.classList.contains("open")) {
                navMenu.classList.remove("open");
                menuBtn.classList.remove("active");
                menuBtn.innerHTML = "&#9776;";
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });
    });

    // 3. Initial render: show all temples
    displayTemples(temples);
});
