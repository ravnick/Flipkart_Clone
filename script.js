// Togale Dropdown none bootstrap using 
function toggleDropdown() {
    let dropdown = document.getElementById("dropdown");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

// MouseEvent Hover Mouse 
window.onload = function () {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const button = dropdown.querySelector('[data-bs-toggle="dropdown"]');
        const bsDropdown = new bootstrap.Dropdown(button);

        dropdown.addEventListener('mouseenter', () => bsDropdown.show());
        dropdown.addEventListener('mouseleave', () => bsDropdown.hide());
    });
};



// Container Three Scroller Section 
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".scroller-track");
    const slides = document.querySelectorAll(".scroller-img");
    const prevBtn = document.querySelector(".scroller-btn.prev");
    const nextBtn = document.querySelector(".scroller-btn.next");
    const dots = document.querySelectorAll(".dot");

    let index = 0;
    const realSlides = slides.length - 1; // last one is clone
    const slideWidth = slides[0].clientWidth;

    function goToSlide(i) {
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${i * slideWidth}px)`;

        if (i < realSlides) {
            dots.forEach(dot => dot.classList.remove("active"));
            dots[i % dots.length].classList.add("active");
        }
    }

    function nextSlide() {
        index++;
        goToSlide(index);

        if (index === slides.length - 1) {
            setTimeout(() => {
                track.style.transition = "none";
                index = 0;
                track.style.transform = `translateX(0px)`;

                // Reset active dot
                dots.forEach(dot => dot.classList.remove("active"));
                dots[0].classList.add("active");
            }, 500);
        }
    }

    function prevSlide() {
        if (index === 0) {
            index = realSlides - 1;
            track.style.transition = "none";
            track.style.transform = `translateX(-${index * slideWidth}px)`;
            setTimeout(() => {
                track.style.transition = "transform 0.5s ease-in-out";
                goToSlide(index);
            }, 20);
        } else {
            index--;
            goToSlide(index);
        }
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            goToSlide(index);
        });
    });

    setInterval(nextSlide, 4000);
});



// Fourth Container Button Scroller 

function setupScroller(container) {
    const scroller = container.querySelector('.scroller-images');
    const leftBtn = container.querySelector('.scroll-left');
    const rightBtn = container.querySelector('.scroll-right');
    const itemWidth = 216;
    const gap = 15;
    const scrollAmount = itemWidth + gap;

    function updateButtons() {
        const scrollLeft = scroller.scrollLeft;
        const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

        leftBtn.style.display = scrollLeft > 10 ? 'block' : 'none';
        rightBtn.style.display = scrollLeft < maxScrollLeft - 10 ? 'block' : 'none';
    }

    function scrollRight() {
        scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    function scrollLeft() {
        scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }


    leftBtn.addEventListener('click', scrollLeft);
    rightBtn.addEventListener('click', scrollRight);

    scroller.addEventListener('scroll', function () {
        if (!this.scrollTimer) {
            this.scrollTimer = setTimeout(() => {
                updateButtons();
                this.scrollTimer = null;
            }, 100);
        }
    });


    updateButtons();
    window.addEventListener('resize', updateButtons);
}


document.addEventListener('DOMContentLoaded', function () {

    const containers = document.querySelectorAll('.fourth-container, .fifth-container');


    containers.forEach(container => {
        setupScroller(container);
    });
});
