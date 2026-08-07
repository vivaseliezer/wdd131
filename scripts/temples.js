// W02 Temple Album JavaScript

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

    // 3. Hamburger Menu Toggle Logic
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.querySelector("nav");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            // Toggle the visibility class of the menu
            navMenu.classList.toggle("open");
            menuBtn.classList.toggle("active");

            // Change icon between burger (☰) and close (❌)
            if (menuBtn.classList.contains("active")) {
                menuBtn.innerHTML = "&#10060;"; // ❌ unicode symbol
                menuBtn.setAttribute("aria-expanded", "true");
            } else {
                menuBtn.innerHTML = "&#9776;"; // ☰ unicode symbol
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });
    }
});
