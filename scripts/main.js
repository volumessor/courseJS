window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    //Таймер
    function countTimer (deadLine) {
        let timerHour = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        
        function getTimeRemaining (){
            let dateStop = new Date(deadLine).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);

            return {timeRemaining, hours, minutes, seconds};
        }

        function intervalClock () {    
            let timer = getTimeRemaining();
            if(getTimeRemaining().timeRemaining > 0) {
                timerHour.textContent = ((timer.hours < 10) ? '0' + timer.hours : timer.hours);
                timerMinutes.textContent = ((timer.minutes < 10) ? '0' + timer.minutes : timer.minutes);                        
                timerSeconds.textContent = ((timer.seconds < 10) ? '0' + timer.seconds : timer.seconds);
            } else {
                clearInterval(init);
                timerHour.textContent = `00`;
                timerMinutes.textContent = `00`;
                timerSeconds.textContent = `00`;
            }    
        }
        let init = setInterval(intervalClock, 1000);
    }
    countTimer('10 september 2020');

    //Меню
    const toggleMenu = () => {
        const menu = document.querySelector('menu');

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
        const handlerMenu = () => {
            menu.classList.toggle(`active-menu`);
        }
    }
    toggleMenu();

    //Модальное окно
    const togglePopUp = () => {
        const popup = document.querySelector(`.popup`),
            btnPopup = document.querySelectorAll(`.popup-btn`),
            popupContent = popup.querySelector(`.popup-content`);
        
        btnPopup.forEach((item) => {
            item.addEventListener('click', () => {
                popup.style.display = `block`;
                if(window.screen.availWidth > 768) modalAnimation();
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
    togglePopUp();

    //Табы
    const tabs = () => {
        const tabHeader = document.querySelector(`.service-header`),
            tab = tabHeader.querySelectorAll(`.service-header-tab`),
            tabContent = document.querySelectorAll(`.service-tab`);

        tabHeader.addEventListener(`click`, (event) => {
            let target = event.target;
            target = target.closest(`.service-header-tab`);
            if(target) {
                tab.forEach((item, index) => {
                    if(item === target) {
                        toggleTabContent(index);
                    }
                })
            }
        });

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++) {
                if(index === i) {
                    tab[i].classList.add(`active`);
                    tabContent[i].classList.remove(`d-none`);
                } else {
                    tab[i].classList.remove(`active`);
                    tabContent[i].classList.add(`d-none`);
                }
            }
        }
    };
    tabs();

    //Слайдер
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
    slider();

    //Изменение фото
    const photoData = () => {
        document.getElementById(`command`).querySelectorAll(`img`).forEach((item) => {
            item.addEventListener('mouseenter', () => {
                item.dataset.lastImg = item.src;
                item.src = item.dataset.img;
            });
            item.addEventListener(`mouseout`, () => {
                item.dataset.newImg = item.src;
                item.src = item.dataset.lastImg;
            })
        });
    }
    photoData();

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
        const calcBlock = document.querySelector(`.calc-block`),
            calcType = calcBlock.querySelector(`.calc-type`),
            calcSquare = calcBlock.querySelector(`.calc-square`),
            calcCount = calcBlock.querySelector(`.calc-count`),
            calcDay = calcBlock.querySelector(`.calc-day`),
            totalValue = calcBlock.querySelector(`#total`);

        let myReq;

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1,
                typeValue = calcType.value,
                squareValue = calcSquare.value;
            
            if(calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }
            if(calcDay.value < 5 && calcDay.value) {
                dayValue *= 2
            } else if(calcDay.value < 10 && calcDay.value) {
                dayValue *= 1.5
            }
            if(typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            modalAnimation(totalValue, total, totalValue.textContent);
        }
        
        calcBlock.addEventListener(`change`, (event) => {
            let target = event.target;
            if(target === calcType || target === calcSquare || target === calcCount ||
                target === calcDay) {
                    cancelAnimationFrame(myReq);
                    countSum();
            }
        })

        const modalAnimation = (x, param, counter) => {
            function newAnimation () {
                x.textContent = counter;
                if(counter < param) {
                    counter++;
                    if (counter <= param) {
                        myReq = requestAnimationFrame(newAnimation);
                    }
                } else if (counter > param) {
                    counter--;
                    if (counter >= param) {
                        myReq = requestAnimationFrame(newAnimation);
                    }
                }
                
            };
            newAnimation();
        }
    };
    calc();

    //send-ajax-form
    const sendForm = () => {
        const errorMessage = `Что-то пошло не так`,
            successMessage = `Спасибо!`;
        
        //Создаем сообщение
        const statusMessage = document.createElement(`div`);
        statusMessage.classList.add(`spinner-grow`);

        //Титульная форма
        newForm(document.getElementById(`form1`));
        //Форма связи
        newForm(document.getElementById(`form2`));
        //Модальное окно
        newForm(document.getElementById(`form3`));
        
        //Шаблон для форм
        function newForm (form) {
            form.querySelectorAll(`input`).forEach((item) => {
                item.addEventListener(`input`, () => {
                    if(item.placeholder === `Ваше имя` || item.placeholder === `Ваше сообщение`) {
                        item.value = item.value.replace(/[^А-Яа-я ]/, ``);
                    } else if (item.placeholder === `Номер телефона`) {
                        item.value = item.value.replace(/[^0-9\+]/, ``);
                    } 
                });
            })
            form.addEventListener(`submit`, (event) => {
                event.preventDefault();
                form.style.color = `#fff`;
                form.append(statusMessage);
                const formData = new FormData(form);
                let body = {};
                formData.forEach((item, index) => {
                    body[index] = item;
                });
                form.querySelectorAll(`input`).forEach((item) => {
                    item.value = "";
                })
                const outputSeccess = () => {
                    statusMessage.classList.remove(`spinner-grow`);
                    statusMessage.textContent = successMessage;
                };
                const outputError = () => {
                    statusMessage.classList.remove(`spinner-grow`);
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                }
                postData(body).then((response) => {
                    if(response.status !== 200) {
                        throw outputError;
                    }
                    outputSeccess();
                }).catch(outputError);
            });
        };
 
        //Взаимодействие с серверов
        const postData = (body) => {
            return fetch(`./servr.php`, {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json`
                },
                body: JSON.stringify(body),
                credentials: `include`
            })
            // return new Promise((resolve, reject) => {
            //     const request = new XMLHttpRequest();
            //     request.addEventListener(`readystatechange`, () => {
            //     if(request.readyState !==4) {
            //         return;
            //     }
            //     if(request.status === 200) {
            //         resolve();
            //     } else {
            //         reject(request.status);
            //     }
            // });
            // request.open(`POST`, `./server.php`);
            // request.setRequestHeader(`Content-Type`, `application/json`);
            // request.send(JSON.stringify(body));
            // }) 
        }
    }
    sendForm();
})