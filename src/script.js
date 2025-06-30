const productMenu = document.querySelectorAll(".product-section__tab");

productMenu.forEach(item => {
    item.addEventListener("click", () => {
        productMenu.forEach(tab => tab.classList.remove("product-section__tab--click"));

        item.classList.add("product-section__tab--click");
    })
});