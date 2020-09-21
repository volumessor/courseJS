const slider = () => {
    const slide = document.querySelectorAll(`.portfolio-item`);

    const newDot = () => {
        const ulDots = document.querySelector(`.portfolio-dots`);
        for(let i = 0; i < slide.length; i++) {
            ulDots.insertAdjacentHTML(`beforeend`, `<li class="dot"></li>`);
            if(i === 0) {
                document.querySelector(`.dot`).classList.add(`dot-active`);
            }
        }
    }
    newDot();

    const dot = document.querySelectorAll(`.dot`),
        slider = document.querySelector(`.portfolio-content`);
        
    let currentSlide = 0,
        interval;

    const prevSlede = (elem, index, thisClass) => {
        elem[index].classList.remove(thisClass);
    };
    const nextSlide = (elem, index, thisClass) => {
        elem[index].classList.add(thisClass);
    };

    const autoPlay = () => {
        prevSlede(slide, currentSlide, 'portfolio-item-active');
        prevSlede(dot, currentSlide, `dot-active`)
        currentSlide++;
        if(currentSlide >= slide.length) currentSlide = 0;
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, `dot-active`);
    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlay, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener(`mouseover`, (event) => {
        if(event.target.matches(`.portfolio-btn`) || event.target.matches(`.dot`)) {
            stopSlide();
        }
    });
    slider.addEventListener(`mouseout`, (event) => {
        if(event.target.matches(`.portfolio-btn`) || event.target.matches(`.dot`)) {
            startSlide();
        }
    })

    slider.addEventListener(`click`, (event) => {
        event.preventDefault();
        let target = event.target;

        if(!target.matches(`#arrow-right, #arrow-left, .dot`)) {
            return;
        }

        prevSlede(slide, currentSlide, 'portfolio-item-active');
        prevSlede(dot, currentSlide, `dot-active`)

        if(target.matches(`#arrow-right`)) {
            currentSlide++;
        } else if(target.matches(`#arrow-left`)) {
            currentSlide--; 
        } else if (target.matches(`.dot`)) {
            dot.forEach((elem, index) => {
                if(elem === target) {
                    currentSlide = index;
                }
            })
        }

        if(currentSlide >= slide.length) currentSlide = 0;
        if(currentSlide < 0) currentSlide = slide.length - 1;

        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, `dot-active`);

    })
    startSlide(5000);
}

export default slider;