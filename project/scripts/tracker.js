// OtakuVerse Watchlist Tracker Logic
// Author: Orlando Vivas

// Retrieve watchlist array from local storage
function getWatchlist() {
    const list = localStorage.getItem("otakuverse_watchlist");
    return list ? JSON.parse(list) : [];
}

// Save watchlist array to local storage
function saveWatchlist(list) {
    localStorage.setItem("otakuverse_watchlist", JSON.stringify(list));
}

// Convert status values to readable badges
function getStatusLabel(status) {
    if (status === "plan") return "Plan to Watch/Play";
    if (status === "watching") return "In Progress";
    return "Completed";
}

// Convert status values to css status tags
function getStatusClass(status) {
    if (status === "plan") return "low";
    if (status === "watching") return "medium";
    return "high";
}

// Generate template literal for dynamic list rendering
function createWatchlistCard(item, index) {
    const statusClass = getStatusClass(item.status);
    const statusLabel = getStatusLabel(item.status);
    return `
        <div class="watchlist-card" data-index="${index}">
            <div class="watchlist-info">
                <span class="priority-badge ${statusClass}">${statusLabel}</span>
                <h4>${item.title}</h4>
                <div class="watchlist-details">
                    <p><strong>Type:</strong> ${item.type === "anime" ? "Anime" : "Video Game"}</p>
                    <p><strong>Progress:</strong> ${item.progress} ${item.type === "anime" ? "Episodes" : "Hours"}</p>
                </div>
            </div>
            <button class="remove-btn" aria-label="Remove ${item.title}" onclick="deleteItem(${index})">Remove</button>
        </div>
    `;
}

// Render list of watchlist cards in DOM
function renderWatchlist() {
    const container = document.getElementById("watchlist-items");
    if (!container) return;

    const list = getWatchlist();

    if (list.length === 0) {
        container.innerHTML = `
            <div class="empty-message">
                <p>🎮 Your watchlist is empty.</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Queue up some anime or games you want to play/watch using the form!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = list.map((item, index) => createWatchlistCard(item, index)).join("");
}

// Delete item handler
window.deleteItem = function(index) {
    let list = getWatchlist();
    if (index >= 0 && index < list.length) {
        list.splice(index, 1);
        saveWatchlist(list);
        renderWatchlist();
    }
};

// Form listeners & validations
document.addEventListener("DOMContentLoaded", () => {
    // Initial display
    renderWatchlist();

    const form = document.getElementById("watchlist-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Select inputs
            const titleInput = document.getElementById("item-title");
            const typeInput = document.getElementById("item-type");
            const progressInput = document.getElementById("item-progress");
            const statusInput = document.getElementById("item-status");

            // Validations (Conditional branching)
            if (!titleInput.value.trim()) {
                alert("Please enter a valid title.");
                titleInput.focus();
                return;
            }

            const progressValue = parseInt(progressInput.value);
            if (isNaN(progressValue) || progressValue < 0) {
                alert("Please enter a valid progress number (0 or higher).");
                progressInput.focus();
                return;
            }

            // Create watch item object
            const item = {
                title: titleInput.value.trim(),
                type: typeInput.value,
                progress: progressValue,
                status: statusInput.value
            };

            // Retrieve, append, save, and update display
            const list = getWatchlist();
            list.push(item);
            saveWatchlist(list);
            renderWatchlist();

            // Reset form
            form.reset();
        });
    }
});
