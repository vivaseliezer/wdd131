// OtakuVerse Global Script
// Author: Orlando Vivas

document.addEventListener("DOMContentLoaded", () => {
    // 1. Populate current year in footer
    const currentYearSpan = document.getElementById("currentyear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Populate last modified date in footer
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
    }

    // 3. Hamburger Menu Toggle
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.querySelector("nav");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            menuBtn.classList.toggle("active");

            // Change icon between hamburger (☰) and close (❌)
            if (menuBtn.classList.contains("active")) {
                menuBtn.innerHTML = "&#10060;"; // ❌ close unicode
                menuBtn.setAttribute("aria-expanded", "true");
            } else {
                menuBtn.innerHTML = "&#9776;"; // ☰ menu unicode
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });
    }

    // 4. Highlight active navigation links dynamically
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (currentPath.includes(href) && href !== "#") {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else if ((currentPath.endsWith("/") || currentPath.endsWith("index.html")) && href === "index.html") {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
});
