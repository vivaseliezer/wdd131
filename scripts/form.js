document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("productName");
    if (select) {
        products.forEach((product) => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name;
            select.appendChild(option);
        });
    }
});
