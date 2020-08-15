let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}

alert('Давай поиграем в игру?');

let userOne = +prompt('Угадай число от 1 до 100');

let admin = 36;

function question(userOne) {

    if (userOne > admin) {
        userOne = +prompt('Загаданное число меньше');
        question(userOne);
       
    } else if (userOne < admin) {
        userOne = +prompt('Загаданное число больше');
        question(userOne);
    } else if (!isNumber(userOne)) {
        userOne = +prompt('Введите число');
        question(userOne);
    } else if (userOne === admin) {
        alert('Поздравляю, ты угадал число!');
        userOne = confirm('Хочешь сыграть еще раз?');
            if (userOne === true)   {
                userOne = +prompt('Угадай число от 1 до 100');
                question(userOne);
            } else {
                alert('Спасибо за игру)');
            }
    }
};

question(userOne);