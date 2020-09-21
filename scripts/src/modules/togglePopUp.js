const togglePopUp = () => {
    const popup = document.querySelector(`.popup`),
        btnPopup = document.querySelectorAll(`.popup-btn`),
        popupContent = popup.querySelector(`.popup-content`);
    
    btnPopup.forEach((item) => {
        item.addEventListener('click', () => {
            popup.style.display = `block`;
            if(window.screen.availWidth >= 768) modalAnimation();
            window.addEventListener(`resize`, () => {
                popupContent.removeAttribute(`style`);
            })
        });
    });
    popup.addEventListener(`click`, (event) => {
        let target = event.target;
        if(target.matches(`.popup-close`)) {
            popup.style.display = `none`;
        } else {
            target = target.closest(`.popup-content`);
            if (!target) {
                popup.style.display = `none`;
            }
        }
    });
    //Анимация
    const modalAnimation = () => {
        let counter = 0;
        popupContent.style.left = 0;
        function newAnimation () {
            popupContent.style.left = counter + `%`;
            counter++;
            if (counter <= 38) {
                requestAnimationFrame(newAnimation);
            }
        };
        newAnimation();
    }
    //Прокрутка страницы
    const scroll = () => {
        const menu = document.querySelector('menu'),
        main = document.querySelector(`main`),
        btnMain = main.querySelector(`a`),
        //Услуги
        menuItem1 = menu.querySelectorAll('li')[0],
        serviceBlock = document.querySelector('#service-block'),
        //Портфолио
        menuItem2 = menu.querySelectorAll('li')[1],
        portfilio = document.querySelector(`#portfolio`),
        //Калькулятор
        menuItem3 = menu.querySelectorAll('li')[2],
        calc = document.querySelector(`#calc`),
        //Команда
        menuItem4 = menu.querySelectorAll('li')[3],
        command = document.querySelector(`#command`),
        //Вопросы
        menuItem5 = menu.querySelectorAll('li')[4],
        connect = document.querySelector(`#connect`);

        btnMain.addEventListener('click', (e) => {
            e.preventDefault();
            serviceBlock.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
        menuItem1.addEventListener('click', (e) => {
            e.preventDefault();
            serviceBlock.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
        menuItem2.addEventListener('click', (e) => {
            e.preventDefault();
            portfilio.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
        menuItem3.addEventListener('click', (e) => {
            e.preventDefault();
            calc.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
        menuItem4.addEventListener('click', (e) => {
            e.preventDefault();
            command.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
        menuItem5.addEventListener('click', (e) => {
            e.preventDefault();
            connect.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    scroll()
};

export default togglePopUp;