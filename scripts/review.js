document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const productId = params.get("productName");
    const product = products.find((p) => p.id === productId);
    const productNameEl = document.getElementById("confirmProduct");
    if (productNameEl) {
        productNameEl.textContent = product ? product.name : "N/A";
    }

    const rating = Number(params.get("rating"));
    const ratingEl = document.getElementById("confirmRating");
    if (ratingEl) {
        ratingEl.textContent = rating
            ? `${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating}/5)`
            : "N/A";
    }

    const dateEl = document.getElementById("confirmDate");
    if (dateEl) {
        dateEl.textContent = params.get("installDate") || "N/A";
    }

    const features = params.getAll("features");
    const featuresEl = document.getElementById("confirmFeatures");
    if (featuresEl) {
        featuresEl.textContent = features.length ? features.join(", ") : "None selected";
    }

    const reviewEl = document.getElementById("confirmReview");
    if (reviewEl) {
        reviewEl.textContent = params.get("review") || "No written review provided.";
    }

    const userNameEl = document.getElementById("confirmUserName");
    if (userNameEl) {
        userNameEl.textContent = params.get("userName") || "Anonymous";
    }

    const countEl = document.getElementById("reviewCount");
    if (countEl) {
        const storedCount = parseInt(localStorage.getItem("reviewCount"), 10) || 0;
        const newCount = storedCount + 1;
        localStorage.setItem("reviewCount", newCount);
        countEl.textContent = newCount;
    }
});
