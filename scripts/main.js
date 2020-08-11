let money = 150000;
let income = 'work';
let addExpenses = 'taxi, internet, phone';
let deposit = true;
let mission = 1000000;
let period = 6;
let budgetDay = 50000;

/*console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(period + ' месяцев ' + mission);*/

console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(' '));

console.log(Math.floor (budgetDay / 30));

money = prompt('Ваш месячный доход?');
console.log(typeof money);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(typeof addExpenses);

deposit  = confirm('Есть ли у вас депозит в банке?');
console.log(typeof deposit);

let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');

let amount1 = +prompt('Во сколько это обойдется?');
let amount2 = +prompt('Во сколько это обойдется?');


let showTypeOf =function(data){
    console.log(data, typeof(data));
};
showTypeOf(money);

console.log(money);



function getStatusIncome(){
if(budgetDay > 1200){
    return ('У вас высокий доход');
} else if (600 > budgetDay <= 1200){
    return ('У вас средний доход');
} else if (budgetDay < 600){
    return ('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0){
    return ('Что то пошло не так');
}
};
console.log(getStatusIncome());


function getExpensesMonth(amount1, amount2){
    return amount1 + amount2;
};
console.log('Ваши траты в месяц: ' + getExpensesMonth(amount1, amount2));


let accumulatedMonth = 0;
function getAccumulatedMonth(){
    return money - amount1 - amount2;
};
accumulatedMonth = getAccumulatedMonth();
console.log(accumulatedMonth);

function getTargetMonth(){
    return mission / accumulatedMonth;
};
period = getTargetMonth();
console.log('Период равен ' + Math.round(period) + ' месяцев');

budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay));