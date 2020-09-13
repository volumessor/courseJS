const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //Записываем в переменную экземпляр класса массив из элементов с
		console.log(responseBlocksArray);
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	tryFilterByType = (type, values) => {
		try { 
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //не понимаю зачем, но тут выволняется код в `` благодаря eval - т.е. filterMyType,
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg); 
		} catch (e) {
			showError(`Ошибка: ${e}`); //Если вылетает ошибка - она выводится, а код продолжает работать
		}
	};

const filterButton = document.querySelector('#filter-btn'); //Ищем элемент по id

filterButton.addEventListener('click', e => { //Слушатель на событие click по кнопке
	const typeInput = document.querySelector('#type'); //Ищем элемент по id
	const dataInput = document.querySelector('#data'); //Ищем элемент по id

	if (dataInput.value === '') { //Проверяем на пустоту поля
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //Если да - то выводится кастомная ошибка
		showNoResults(); //Вызов функции
	} else {
		dataInput.setCustomValidity(''); //если поле не пустое - то кастомная ошибка убирается
		e.preventDefault(); //прекращается дефолтное поведение браузера
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //вызоф функции, куда в параметрах передается значение селекта 
																		 //и значение введеного подьзователем поля
	}
});
