let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}

let appData = {
    income: {},
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    incomeMonth: 0, 
    expensesMonth: 0,  
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    getExpensesMonth: function(){
        for (let key in appData.expenses)   {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
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
    getInfoDeposit: function(){
        if(appData.deposit){
            appData.percentDeposit = checkVariable('number', 'Какой годовой депозит?');
            appData.moneyDeposit = checkVariable('number', 'Какая сумма заложено?');
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    },
    start: function()  {
        if(salaryAmount.value === ''){
            alert('Месячный доход должен быть заполнен');
            return;
        }
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonth.value = Math.ceil(appData.getTargetMonth());
        incomePeriod.value = appData.calcPeriod();
    },
    addExpensesBlock: function(){
        
        console.log(expensesItems.parentNode);
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function(){
        incomeItem.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
                for(let key in appData.income){
                    appData.incomeMonth += +appData.income[key];
                }
        });
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getTargetMonth: function(){
        return targetAmount.value / appData.budgetMonth;
    },
    calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
    },
};

/*for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " = " + appData[key]);
}*/

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

//lesson09 - Получение элементов со страницы

let start = document.getElementById('start');

let btnPlusIncomeAdd = document.getElementsByTagName('button')[0];

let expensesPlus = document.getElementsByTagName('button')[1];


let depositCheck = document.querySelector('#deposit-check');


let additionalIncomeItem = document.querySelectorAll('.additional_income-item');


//right_side_programm

let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];

let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];

let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];

let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];

let additionalExpensesValue = document.querySelector('.additional_expenses-value');
console.log(additionalExpensesValue);

let incomePeriod = document.querySelector('.income_period-value');

let targetMonth = document.querySelector('.target_month-value');

//right_side_programm
//last_input or range

let salaryAmount = document.querySelector('.salary-amount');

let incomeTitle = document.querySelector('[placeholder="Наименование"]');

let incomeAmount = document.querySelector('.income-amount');

let expensesTitle = document.querySelector('div.expenses-items [placeholder="Наименование"]');

let expensesItems = document.querySelectorAll('.expenses-items');

let additionalExpensesItem = document.querySelector('.additional_expenses-item');

let targetAmount = document.querySelector('.target-amount');

let periodSelect = document.querySelector('.period-select');

let incomeItem = document.querySelectorAll('.income-items');

//last input or range
//lesson09 - Получение элементов со страницы

/*
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
*/

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
