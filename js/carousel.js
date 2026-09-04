const carousel = document.getElementById("carousel");
const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const dotsContainer = document.getElementById("dots");

let currentIndex = 0;
let autoPlay;



slides.forEach((slide, index) => {

    const dot = document.createElement("button");

    dot.classList.add("carousel-dot");

    dot.addEventListener("click", () => {
        goToSlide(index);
        restartAutoPlay();
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".carousel-dot");


function goToSlide(index) {

    if (index >= slides.length) {
        currentIndex = 0;
    }
    else if (index < 0) {
        currentIndex = slides.length - 1;
    }
    else {
        currentIndex = index;
    }

    track.style.transform =
        `translateX(-${currentIndex * 100}%)`;

    updateDots();
}

function updateDots() {

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });
}

nextButton.addEventListener("click", () => {

    goToSlide(currentIndex + 1);

    restartAutoPlay();
});

prevButton.addEventListener("click", () => {

    goToSlide(currentIndex - 1);

    restartAutoPlay();
});

function startAutoPlay() {

    autoPlay = setInterval(() => {

        goToSlide(currentIndex + 1);

    }, 4000);
}

function restartAutoPlay() {

    clearInterval(autoPlay);

    startAutoPlay();
}

carousel.addEventListener("mouseenter", () => {

    clearInterval(autoPlay);

});

carousel.addEventListener("mouseleave", () => {

    startAutoPlay();

});


let startX = 0;

carousel.addEventListener("touchstart", (event) => {

    startX = event.touches[0].clientX;

});


carousel.addEventListener("touchend", (event) => {

    const endX = event.changedTouches[0].clientX;

    const difference = startX - endX;

    if (Math.abs(difference) > 50) {

        if (difference > 0) {

            // Swipe Left
            goToSlide(currentIndex + 1);

        }
        else {

            // Swipe Right
            goToSlide(currentIndex - 1);

        }

        restartAutoPlay();
    }

});


goToSlide(0);

startAutoPlay();

