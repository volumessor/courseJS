let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}



let money
let income = 'work';
let addExpenses = 'taxi, internet, phone';
let deposit = true;
let mission = 1000000;
let period = 6;
let budgetDay = 50000;



console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(' '));

console.log(Math.floor (budgetDay / 30));



addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(typeof addExpenses);

deposit  = confirm('Есть ли у вас депозит в банке?');
console.log(typeof deposit);


//Lesson05    
let start = function()  {

    do  {
        money = prompt('Ваш месячный доход?');
    }
    while(!isNumber(money));

};

start();

let expenses = [];

let getExpensesMonth = function(){
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        
        expenses[i] = prompt('Введите обязательную статью расходов?');
        let sumTwo = +prompt('Во сколько это обойдется?');
        
        while (!isNumber(sumTwo)) {
            sumTwo = +prompt('Во сколько это обойдется?');
        }
        sum =+ sumTwo;
    }
    
    console.log (expenses);
    return sum;
};

let expensesAmout = getExpensesMonth();


console.log ('Расходы в месяц: ' + expensesAmout);
//Lesson05  

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



function getAccumulatedMonth(){
    return money - expensesAmout;
};
let accumulatedMonth = getAccumulatedMonth();
console.log(accumulatedMonth);

function getTargetMonth(){
    if ((mission / accumulatedMonth) > 0)   {
        return('Цель будет достигнута за ' + Math.round((mission / accumulatedMonth)) + ' месяцев');
    } else  {
        return('Цель не будет достигнута');
    }
};

console.log (getTargetMonth());


budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay));