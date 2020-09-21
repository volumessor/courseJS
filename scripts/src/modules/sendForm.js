const sendForm = () => {
    const errorMessage = `Что-то пошло не так`,
        successMessage = `Спасибо!`;
    
    //Создаем сообщение
    const creatOutput = (form) => {
        const statusMessage = document.createElement(`div`);
        statusMessage.classList.add(`spinner-grow`);
        form.style.color = `#fff`;
        form.append(statusMessage);
        return statusMessage;
    }
    
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
                if(item.placeholder === `Ваше имя`) {
                    item.value = item.value.replace(/[^А-Яа-я ]/, ``);
                } else if (item.placeholder === `Ваше сообщение`) {
                    item.value = item.value.replace(/[^0-9А-Яа-я !"#$%&'()\*+,-./:;<=>?@\[\]\^_`{|}\~]/, ``);
                } else if (item.placeholder === `Номер телефона`) {
                    item.value = item.value.replace(/[^0-9\+]/, ``);
                } 
            });
        })
        form.addEventListener(`submit`, (event) => {
            event.preventDefault();
            let statusMessage = creatOutput(form);
            const formData = new FormData(form);
            let body = {};
            formData.forEach((item, index) => {
                body[index] = item;
            });
            form.querySelectorAll(`input`).forEach((item) => {
                item.value = "";
            })
            const outputSeccess = () => {
                console.log(`Удачно`);
                statusMessage.classList.remove(`spinner-grow`);
                statusMessage.textContent = successMessage;
            };
            const outputError = () => {
                statusMessage.classList.remove(`spinner-grow`);
                statusMessage.textContent = errorMessage;
                console.error(error);
            }
            const deleteOutput = () => {
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
            }
            postData(body).then((response) => {
                if(response.status !== 200) {
                    throw outputError;
                }
                outputSeccess();
            }).then(deleteOutput).catch(outputError);
        });
    };

    //Взаимодействие с серверов
    const postData = (body) => {
        return fetch(`./server.php`, {
            method: `POST`,
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify(body),
            credentials: `include`
        }) 
    }
}

export default sendForm;