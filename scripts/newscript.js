//Получаем элементы со странциы
const Hello = document.getElementById('hello'),
	Day = document.getElementById('day'), 
	Nowtime = document.getElementById('nowtime'),
	Newyear = document.getElementById('newyear');
const date = new Date();
//Создаем функцию, которая будет возвращать нам дни недели
function getWeekDay(date){
	let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',];
	return days[date.getDay()];
}
//Записываем в переменную
Nowtime.textContent = 'Текущее время: ' + ((date.getHours() < 10) ? '0' + date.getHours() : date.getHours()) + ':' + ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()) + ':' + ((date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds());
Day.textContent = 'Сегодня: ' + getWeekDay(date);

//Работаем с Приветствием
let nowTimeDay = date.getHours();
function timeDay(){
	if(nowTimeDay >= 5 && nowTimeDay < 12){
		Hello.textContent = 'Доброе утро!';
	} else if (nowTimeDay >= 12 && nowTimeDay < 18){
		Hello.textContent = 'Добрый день!';
	} else if (nowTimeDay >= 18 && nowTimeDay < 24){
		Hello.textContent = 'Добрый вечер!';
	} else if (nowTimeDay >= 24 && nowTimeDay < 5){
		Hello.textContent = 'Доброй ночи!';
	}
};
timeDay();

//Расчет дней до нового года
function daysLeftNewYear() {
	let deadLine = new Date('1 January 2021');
	console.log(deadLine);
	let today = new Date();
	//Вычисляем колличество миллисекунд в одном дне
	const msPerDay = 24*60*60*1000;
	//Вычисляем сколько осталось дней
	let daysnewYear = Math.round((deadLine.getTime() - today.getTime()) / msPerDay);

	if(daysnewYear === 0){
		Newyear.textContent = 'С Новым Годом!';
	} else {
		Newyear.textContent = 'До Нового года осталось: ' + daysnewYear + ' дней!';
	}
}
daysLeftNewYear();
//Создаем новый объект дата


