const productMenu = document.querySelectorAll(".product-section__tab");

productMenu.forEach(item => {
    item.addEventListener("click", () => {
        productMenu.forEach(tab => tab.classList.remove("product-section__tab--click"));

        item.classList.add("product-section__tab--click");
    })
});

// header + product -----------------------------------------------------------
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
// ----------------------------------------------------------------------------------

// explore now --------------------------------------------------
function onclickExplore() {
    const product = document.querySelector(".product-section");
    product.scrollIntoView({ behavior: "smooth" });
}
// --------------------------------------------------------------

// popup page --------------------------------------------------
function closePopup() {
    const popupWrapper = document.querySelector(".page-section-popup");

    popupWrapper.classList.add("page-section-popup__out");

    setTimeout(() => {
        popupWrapper.style.display = "none";
    }, 500);

    localStorage.setItem("popupLastShown", Date.now());
}

window.addEventListener("load", () => {
    const popupWrapper = document.querySelector(".page-section-popup");
    const popup = popupWrapper.querySelector(".popup");

    let hasInteracted = false;

    const lastShown = localStorage.getItem("popupLastShown");
    const fourHours = 1 * 60 * 60 * 1000;

    if (lastShown && Date.now() - parseInt(lastShown) < fourHours) {
        return;
    }

    const showPopup = () => {
        if (hasInteracted) return;
        hasInteracted = true;

        setTimeout(() => {
            popupWrapper.style.display = "flex";
            popupWrapper.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            popup.classList.add("show");

            localStorage.setItem("popupLastShown", Date.now());
        }, 3000);

        window.removeEventListener("mousemove", showPopup);
        window.removeEventListener("touchmove", showPopup);
    };

    window.addEventListener("mousemove", showPopup);
    window.addEventListener("touchmove", showPopup);
});
// --------------------------------------------------------------

// FAQ ----------------------------------------------------------------
const list = document.querySelectorAll(".list");

list.forEach((item) => {
    const answer = item.querySelector(".answer");
    const question = item.querySelector(".question");
    const icon = item.querySelector(".question__icon");

    icon.addEventListener("click", function () {

        list.forEach((itemOpen) => {
            if (itemOpen !== item) {
                itemOpen.querySelector(".answer").classList.remove("answer__show");
                itemOpen.querySelector(".question").classList.remove("question__color");
                const otherIcon = itemOpen.querySelector(".question__icon");
                otherIcon.classList.remove("question__icon--color");
                otherIcon.textContent = "+";
            }
        })

        answer.classList.toggle("answer__show");
        question.classList.toggle("question__color");
        icon.classList.toggle("question__icon--color");

        if (answer.classList.contains("answer__show")) {
            icon.textContent = "-";
        } else {
            icon.textContent = "+";
        }

    })
})
// --------------------------------------------------------------------

// animation page------------------------------------------------------
AOS.init({
    duration: 1200,
})
// ---------------------------------------------------------------------


// emial footer --------------------------------------------------------
function sendEmail() {
    const email = document.querySelector("#email").value;
    if (email.length == 0) {
        document.querySelector(".popup-contact__text--2").style.display = "block";
        showPopupContact();
        return 0;
    }

    const emailHopLe = email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    if (emailHopLe) {
        fetch("https://script.google.com/macros/s/AKfycbwlnruolAEFek8x1wUYLxocHdIuwHWrHYXSfzSXZSygslzejM-ppDe76EuK8jkKWyB4/exec", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `email=${encodeURIComponent(email)}`
        }).then(() => {
            document.querySelector(".popup-contact__text--1").style.display = "block";
            showPopupContact();
            document.getElementById("email").value = "";
        });

        // // tao cookie, max-age la thoi gan cookie ton tai
        // document.cookie = "email=" + email + "; path=/; max-age=14400";
        // closePopup();

    } else {
        document.querySelector(".popup-contact__text--2").style.display = "block";
        showPopupContact();
        return 0;
    }
}

// ham lay gia tri cookie
function getCookie(email) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    // console.log("Day la decodedCookie = " + decodedCookie);
    // console.log("Day la chuoi sau dau ; = " + ca);
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(email + "=") == 0) {
            return c.substring(email.length + 1, c.length);
        }
    }
    return "";
}

//ham hien thi email neu cos cookie
function showEmial() {
    const email = getCookie("email");
    if (email != "") {
        console.log("Email: " + email);
    }
}

showEmial();
// ---------------------------------------------------------------------


//form contact----------------------------------------------------------
function closePopupContact() {
    const popupConatct = document.querySelector(".popup-contact");

    popupConatct.classList.add("popup-contact__out");

    setTimeout(() => {
        popupConatct.style.display = "none";
    }, 500);
}

function showPopupContact() {
    const popupConatct = document.querySelector(".popup-contact");
    popupConatct.style.display = "flex";
    popupConatct.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
};

function submitForm() {
    event?.preventDefault?.();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    if (name == "") {
        document.querySelector(".err__name").textContent = "Please enter your name in this field";
        isValid = false;
    } else {
        document.querySelector(".err__name").textContent = "";
    }

    if (email == "") {
        document.querySelector(".err__email").textContent = "Please enter your email in this field";
        isValid = false;
    } else {
        document.querySelector(".err__email").textContent = "";
    }

    if (phone == "") {
        document.querySelector(".err__phone").textContent = "Please enter your phone in this field";
        isValid = false;
    } else {
        document.querySelector(".err__phone").textContent = "";
    }

    if (address == "") {
        document.querySelector(".err__address").textContent = "Please enter your address in this field";
        isValid = false;
    } else {
        document.querySelector(".err__address").textContent = "";
    }

    if (message == "") {
        document.querySelector(".err__mess").textContent = "Please enter your message in this field";
        isValid = false;
    } else {
        document.querySelector(".err__mess").textContent = "";
    }

    const recaptchaToken = grecaptcha.getResponse();
    if (!recaptchaToken) {
        document.querySelector(".contact__errCaptcha").textContent = "Please complete the reCAPTCHA.";
        isValid = false;
    } else {
        document.querySelector(".contact__errCaptcha").textContent = "";
    }

    if (!isValid) {
        return;
    }

    const newContact = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        message: message,
        // price: 100,
        // img: "asadas.jpg",
        // cate: 1,
        // desc: message,
        recaptcha: recaptchaToken
    }

    fetch('https://testapi.demo.wgentech.com/notify.php',
        {
            method: 'POST',
            keepalive: true,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem("data", JSON.stringify(data));
            grecaptcha.reset();
            document.querySelector(".popup-contact__text--1").style.display = "block";
            showPopupContact();
        })
        .catch(error => {
            console.error('Error:', error);
            document.querySelector(".popup-contact__text--2").style.display = "block";
            showPopupContact();
        });

}

const savedData = localStorage.getItem("data");
console.log("Data from localStorage:", JSON.parse(savedData));
// ---------------------------------------------------------------------


