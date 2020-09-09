window.addEventListener('DOMContentLoaded', function() {
'use strict';
	// timer
	function countTimer(deadLine) {
		let timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
            
        function getTimeRemainig(){
            let dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemainig = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemainig % 60),
                minutes = Math.floor((timeRemainig / 60) % 60),
                hours = Math.floor(timeRemainig / 60 / 60);

            return {timeRemainig, hours, minutes, seconds};
        }

        function uppdateClock(){
            let timer = getTimeRemainig();
            if(getTimeRemainig().timeRemainig > 0) {
                timerHours.textContent = ((timer.hours <10) ? '0' + timer.hours : timer.hours);
                timerMinutes.textContent = ((timer.minutes <10) ? '0' + timer.minutes : timer.minutes);
                timerSeconds.textContent = ((timer.seconds <10) ? '0' + timer.seconds : timer.seconds);
            } else {
                clearInterval(init);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
            
        } 
        let init = setInterval(uppdateClock, 1000);
	}
    countTimer('2 september 2020');


//Пишем меню

const toggleMenu = () => {
    //Получаем элементы со страницы
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };   
    
    //Новый обработчик
    document.addEventListener(`click`, (event) => {
        let target = event.target;
        if(!menu.matches(`.active-menu`)) {
            target = target.closest(`.menu`);
            if(target) handlerMenu();
        } else {
            if (target.matches(`.close-btn`) || !target.matches(`menu`)) {
                handlerMenu();
            }
        }
    })
};
toggleMenu();

//Всплывашка

const togglePopUp = () => {
    //Поулчаем элементы
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent =document.querySelector('.popup-content');

    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            popup.style.display = 'block';
            if(window.screen.availWidth > 768) modalAnimation();
        });
    });
    //Анимация
    const modalAnimation = () => {
        let count = 0;
        popupContent.style.left = 0;
        function newAnimation () {
            popupContent.style.left = count + `%`;
            count++;
            if(count <= 38){
                requestAnimationFrame(newAnimation);
            }
        };
        newAnimation();
    };

    popup.addEventListener('click', (event)=>{
        let target = event.target;

        if(target.classList.contains('popup-close')){
            popup.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
        if(!target){
            popup.style.display = 'none';
        }
        }
       
    });
};

togglePopUp();

//Делаем табы

    const tabs = () => {
        const tabHeader =document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
    //Функция смены контента
    const toggleTabContent = (index) => {
        for(let i = 0; i < tabContent.length; i++){
            if(index === i){
                tab[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
            } else {
                tab[i].classList.remove('active');
                tabContent[i].classList.add('d-none');
            }
        }
    };
    //Пишем обработчик события
    tabHeader.addEventListener('click', (event) => {
        let target = event.target;
        target = target.closest('.service-header-tab');
        if(target){
            tab.forEach((item, i) => {
                if(item === target){
                    toggleTabContent(i);
                }
            }); 
        }
    });
    };
    tabs();

//Пишем слайдер

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

    //Получаем элементы со страницы
        const dot = document.querySelectorAll(`.dot`),
        slider = document.querySelector(`.portfolio-content`),
        btn = document.querySelectorAll('.portfolio-btn');
    //Определние слайда на экране
        let currentSlide = 0;  //Номер слайда
        let interval = 0;
    

const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
};
const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
};
    //Автоматическая прокрутка
    const autoPlaySlider = () => {
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        currentSlide++;
        if(currentSlide >= slide.length){
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    };
    //Запуск слайдера
    const startSlide  = (time = 3000) => {
        interval = setInterval(autoPlaySlider, time);
    };
    //Остановка слайдера
    const stopSlide  = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (event) =>{
        event.preventDefault();
        let target = event.target;

        if(!target.matches('.portfolio-btn, .dot')){
                    return;
        }

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');     
        
        if(target.matches('#arrow-right')){
            currentSlide++;
        } else if(target.matches('#arrow-left')){
            currentSlide--;
        } else if(target.matches('.dot')){
            dot.forEach((elem, index) => {
                if(elem === target){
                    currentSlide = index;
                }
            })  
        }
        
        if(currentSlide >= slide.length){
            currentSlide = 0;
        }

        if(currentSlide < 0){
            currentSlide = slide.length -1;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) =>{
        if(event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')){
            stopSlide();
        }
    });
    slider.addEventListener('mouseout', (event) =>{
        if(event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')){
            startSlide();
        }
    });

    startSlide(1500);


    

}
slider();

// Пишем смену картинок
    let imageTeam = document.querySelectorAll('.command__photo');
    console.log(imageTeam);
    imageTeam.forEach((item) => {
        item.addEventListener('mouseenter', (event) => {
            item.dataset.oneImg = item.src;
            item.src = item.dataset.img;
        });
        item.addEventListener('mouseout', (event) => {
            item.dataset.twoImg = item.src;
            item.src = item.dataset.oneImg;
        });
    });
    //Валидация
    const someValid = () => {
        document.querySelector(`.calc-block`).querySelectorAll(`input`).forEach((item) => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/, "");
            })
        })
    }
    someValid();

//Калькулятор

const calc = (price = 100) => {
    //Получаем элементы
    const calcBlock = document.querySelector('.calc-block'),
        calcTipe = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');

    //Считаем итоговую сумму
    const countSum = () => {
        let total = 0;
        let countValue = 1;
        let dayValue = 1;
        const typeValue = calcTipe.options[calcTipe.selectedIndex].value; //селекты
        let squareValue = +calcSquare.value; //площадь


        if(calcCount.value > 1){
            countValue += (calcCount.value - 1) /10;
        }

        if(calcDay.value && calcDay.value < 5){
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10){
            dayValue *= 1.5;
        }

        if(typeValue && squareValue){
            total = price * typeValue * squareValue * countValue * dayValue;
        }
        totalValue.textContent = total;
    };


        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if(target === calcTipe || target === calcSquare || 
               target === calcDay || target === calcCount){
                    countSum();
                }

        });
};

calc(100);

});