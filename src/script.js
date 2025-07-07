const productMenu = document.querySelectorAll(".product-section__tab");

productMenu.forEach(item => {
    item.addEventListener("click", () => {
        productMenu.forEach(tab => tab.classList.remove("product-section__tab--click"));

        item.classList.add("product-section__tab--click");
    })
});

const header = document.querySelector(".header");
const headerTop = document.querySelector(".header__top");
const headerAddress = document.querySelector(".header__address");
const headerContact = document.querySelector(".header__contact");

const uniqueContent = document.querySelector(".product-section__unique--content");
const smallUnique = document.querySelector(".product-section__small--unique");
const itemProduct1 = document.querySelector(".product-section__right--1");
const itemProduct2 = document.querySelector(".product-section__right--2");
const itemProduct3 = document.querySelector(".product-section__right--3");
const itemProduct4 = document.querySelector(".product-section__right--4");

let headerSwiper = null;
let productSwiper = null;

function handleResize() {
    if (window.innerWidth <= 500) {
        header?.classList.add("swiper");
        headerTop?.classList.add("swiper-wrapper");
        headerAddress?.classList.add("swiper-slide");
        headerContact?.classList.add("swiper-slide");

        uniqueContent?.classList.add("swiper");
        smallUnique?.classList.add("swiper-wrapper");
        itemProduct1?.classList.add("swiper-slide");
        itemProduct2?.classList.add("swiper-slide");
        itemProduct3?.classList.add("swiper-slide");
        itemProduct4?.classList.add("swiper-slide");

        if (!headerSwiper) {
            headerSwiper = new Swiper(".header", {
                loop: true,
                navigation: {
                    prevEl: ".swiper-button-next",
                    nextEl: ".swiper-button-prev",
                },
            });
        }

        if (!productSwiper) {
            productSwiper = new Swiper(".product-section__unique--content", {
                slidesPerView: 1.5,
                centeredSlides: false,
                loop: true,
                grabCursor: true,
            });
        }

    } else {
        if (headerSwiper) {
            headerSwiper.destroy(true, true);
            headerSwiper = null;
        }

        if (productSwiper) {
            productSwiper.destroy(true, true);
            productSwiper = null;
        }

        header?.classList.remove("swiper");
        headerTop?.classList.remove("swiper-wrapper");
        headerAddress?.classList.remove("swiper-slide");
        headerContact?.classList.remove("swiper-slide");

        uniqueContent?.classList.remove("swiper");
        smallUnique?.classList.remove("swiper-wrapper");
        itemProduct1?.classList.remove("swiper-slide");
        itemProduct2?.classList.remove("swiper-slide");
        itemProduct3?.classList.remove("swiper-slide");
        itemProduct4?.classList.remove("swiper-slide");
    }
}

handleResize();

window.addEventListener("resize", handleResize);

function onclickExplore() {
    const product = document.querySelector(".product-section");
    product.scrollIntoView({ behavior: "smooth" });
}


function closePopup() {
    const popupWrapper = document.querySelector(".page-section-popup");

    popupWrapper.classList.add("page-section-popup__out");

    setTimeout(() => {
        popupWrapper.style.display = "none";
    }, 500);
}

window.addEventListener("load", () => {
    const popupWrapper = document.querySelector(".page-section-popup");
    const popup = popupWrapper.querySelector(".popup");

    let hasInteracted = false;

    const showPopup = () => {
        if (hasInteracted) return;
        hasInteracted = true;

        setTimeout(() => {
            popupWrapper.style.display = "flex";
            popupWrapper.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            popup.classList.add("show");
        }, 3000);

        window.removeEventListener("mousemove", showPopup);
        window.removeEventListener("touchmove", showPopup);
    };

    window.addEventListener("mousemove", showPopup);
    window.addEventListener("touchmove", showPopup);
});


