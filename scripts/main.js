/*let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}
let money,
    start = function()  {
        do  {
            money = prompt('Ваш месячный доход?', '100000');
        }
        while(!isNumber(money));
};
start();

let appData = {
    income: {},
    budget: money,
    budgetDay: 0,
    budgetMonth: 0, 
    expensesMonth: 0,  
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 3,
    asking: function(){
            if(confirm('Есть ли у вас дополнителньый заработок?')){
                let itemIncome = checkVariable('string', "Введите название дохода");
                let cashIncome = checkVariable('number', 'Сколько в месяц вы зарабатываете на этом?');
                appData.income[itemIncome] = cashIncome;

            }

            let addExpenses = checkVariable('arr', 'Перечислите возможные расходы за рассчитываемый период через запятую');
                appData.addExpenses = addExpenses;
                appData.deposit = confirm('Есть ли у вас депозит в банке?');
            for (let i = 0; i < 2; i++) {
        
                let expens = checkVariable('string', 'Введите обязательную статью расходов?');
                let sumTwo;
                do {
                    sumTwo = checkVariable('number', 'Во сколько это обойдется?');
                } 
                while (isNaN(sumTwo) || sumTwo === '' || sumTwo === null);
                appData.expenses[expens] = +sumTwo;
            }
            appData.getExpensesMonth();
            appData.getBudget();
            appData.getStatusIncome();
            appData.getTargetMonth();
            appData.getInfoDeposit();
            appData.calcSavedMoney();
    },
    getExpensesMonth: function(){
        for (let key in appData.expenses)   {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function () {
        this.budgetMonth = this.budget - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },
    getStatusIncome: function(){
        if(appData.budgetDay > 1200){
            return ('У вас высокий доход');
        } else if (600 > appData.budgetDay <= 1200){
            return ('У вас средний доход');
        } else if (appData.budgetDay < 600){
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay <= 0){
            return ('Что то пошло не так');
        }
    },
    getTargetMonth: function(){
        if ((appData.mission / appData.budgetMonth) > 0)   {
            return('Цель будет достигнута за ' + Math.round((appData.mission / appData.budgetMonth)) + ' месяцев');
        } else  {
            return('Цель не будет достигнута');
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            appData.percentDeposit = checkVariable('number', 'Какой годовой депозит?');
            appData.moneyDeposit = checkVariable('number', 'Какая сумма заложено?');
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    },
    
};

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " = " + appData[key]);
}

console.log(appData.addExpenses )

function checkVariable (param, text) {
    let variable = prompt(text);
    if (param == "arr") {
        while (variable == null ||  variable == "" || variable.indexOf(",") == "-1" || variable.indexOf(",") == "0") {
            variable = prompt(text + "\nПоле должно содержать корректные значения!", "Садик, Школа, Институт");
        }
        variable = arrEdit(variable.split(","));
        return variable;
    } else {
        if (param == "string") {
            while (variable == null || variable == "" || +variable) {
                variable = prompt(text + "\nПоле должно содержать корректное значение!", "Такси");
            } 
        } else if (param == "number") {
            while (variable == null || !+variable || variable <= 0 || !isFinite(variable) || isNaN(variable) || variable.charAt(0) == ".") {
                variable = prompt(text + "\nПоле должно содержать корректное значение!", "10000");
            }
        }
        return variable.trim();
    }
};

function arrEdit (arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim();
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr;
};

appData.asking();
console.log(appData);

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log(appData.calcSavedMoney());
console.log(appData.addExpenses);*/


//lesson09 - Получение элементов со страницы

let buttonCalc = document.getElementById('start');
console.log(buttonCalc);

let btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
console.log(btnPlusIncomeAdd);

let btnPlusExpensesAdd = document.getElementsByTagName('button')[1];
console.log(btnPlusExpensesAdd);

let depositCheck = document.querySelector('#deposit-check');
console.log(depositCheck);

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
console.log(additionalIncomeItem);

//right_side_programm

let budgetMonth = document.getElementsByClassName('budget_month-value');
console.log(budgetMonth);

let budgetDay = document.getElementsByClassName('budget_day-value');
console.log(budgetDay);

let expensesMonth = document.getElementsByClassName('expenses_month-value');
console.log(expensesMonth);

let additionalIncome = document.getElementsByClassName('additional_income-value');
console.log(additionalIncome);

let additionalExpenses = document.getElementsByClassName('additional_expenses-value');
console.log(additionalExpenses);

let incomePeriod = document.getElementsByClassName('income_period-value');
console.log(incomePeriod);

let targetMonth = document.getElementsByClassName('target_month-value');
console.log(targetMonth);

//right_side_programm
//last_input or range

let salaryAmount = document.querySelector('.salary-amount');
console.log(salaryAmount);

let incomeTitle = document.querySelector('[placeholder="Наименование"]');
console.log(incomeTitle);

let incomeAmount = document.querySelector('.income-amount');
console.log(incomeAmount);

let expensesTitle = document.querySelector('div.expenses-items [placeholder="Наименование"]');
console.log(expensesTitle);

let expensesAmount = document.querySelector('.expenses-amount');
console.log(expensesAmount);

let additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log(additionalExpensesItem);

let targetAmount = document.querySelector('.target-amount');
console.log(targetAmount);

let periodSelect = document.querySelector('.period-select');
console.log(periodSelect);

//last input or range
//lesson09 - Получение элементов со страницы

//lesson10 - Работа с книгами
//Восстановление порядка книг
const book = document.querySelectorAll('.book');

book[0].before(book[1]);
book[0].after(book[4]);
book[4].after(book[3]);
book[3].after(book[5]);

//change image background
const backgroundImage = document.body.style.backgroundImage = ('url(./image/you-dont-know-js.jpg)');
//change h2 book3
const bookThree = document.querySelectorAll('h2');
bookThree[2].insertAdjacentText('afterbegin', '"');
bookThree[2].insertAdjacentText('beforeend', '")');
//Удаление рекламы
const deleteBanner = document.querySelector('div.adv');
deleteBanner.remove();
//Правим главы
//Книга 2
const book2 = document.querySelectorAll('.book')[1];
const book2Ul = book2.querySelector('ul');
const book2Li = book2.querySelectorAll('li');
const l1 = book2.querySelectorAll("li")[0],
        l2 = book2.querySelectorAll("li")[1],
        l3 = book2.querySelectorAll("li")[3],
        l4 = book2.querySelectorAll("li")[6],
        l5 = book2.querySelectorAll("li")[8],
        l6 = book2.querySelectorAll("li")[4],
        l7 = book2.querySelectorAll("li")[5],
        l8 = book2.querySelectorAll("li")[7],
        l9 = book2.querySelectorAll("li")[9],
        l10 = book2.querySelectorAll("li")[2],
        l11 = book2.querySelectorAll("li")[10];
        
 l2.after(l3);
 l3.after(l4);
 l4.after(l5);
 l5.after(l6);
 l6.after(l7);
 l7.after(l8);
 l8.after(l9);
 l9.after(l10);
//Книга 5
const book5 = document.querySelectorAll('.book')[4];
const book5Ul = book5.querySelector('ul');
const book5Li = book5.querySelectorAll('li');
const b1 = book5.querySelectorAll("li")[0],
        b2 = book5.querySelectorAll("li")[1],
        b3 = book5.querySelectorAll("li")[9],
        b4 = book5.querySelectorAll("li")[3],
        b5 = book5.querySelectorAll("li")[4],
        b6 = book5.querySelectorAll("li")[2],
        b7 = book5.querySelectorAll("li")[6],
        b8 = book5.querySelectorAll("li")[7],
        b9 = book5.querySelectorAll("li")[5],
        b10 = book5.querySelectorAll("li")[8],
        b11 = book5.querySelectorAll("li")[10];
    console.log(book5);   
    b2.after(b3);
    b3.after(b4);
    b4.after(b5);
    b5.after(b6);
    b6.after(b7);
    b7.after(b8);
    b8.after(b9);
    b9.after(b10);
//Добавление главы 8 в 6 книгу
const book6 = document.querySelectorAll('.book')[5];
const newUl = book6.querySelector('ul');
const allLi = book6.querySelectorAll('li')[8];

const newLi = document.createElement("li");
    newLi.innerHTML = "Глава 8: За пределами ES6";
    allLi.after(newLi);
//lesson10 - Работа с книгами



