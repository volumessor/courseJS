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
    
    //Новые обработчики
    const containerParent = document.body;
    containerParent.addEventListener('click', (event) => {
        let target = event.target;
        if(target.closest('.menu')){
            handlerMenu();
        }
        if(target.closest('.close-btn')){
            handlerMenu();
        }
        if(target.closest('ul>li')){
            handlerMenu();
        }
    });
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
});