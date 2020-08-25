//lesson09 - Получение элементов со страницы

let start = document.getElementById('start'),
    cancelButton = document.getElementById("cancel");

let btnPlusIncomeAdd = document.getElementsByTagName('button')[0];

let expensesPlus = document.getElementsByTagName('button')[1];


let depositCheck = document.querySelector('#deposit-check');


let additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    
    expensesButton = document.getElementsByTagName("button")[1],

    incomeButton = document.getElementsByTagName("button")[0];

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

let viePeriod = document.querySelector(".period-amount");


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
    start: function() {
        this.budget = salaryAmount.value;
        this.getIncome();
        this.getIncomeMonth();
        this.getExpenses();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();
        this.showResult();        
    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonth.value = Math.ceil(this.getTargetMonth());
        incomePeriod.value = this.calcPeriod();

         //Меняем накопления

         periodSelect.addEventListener('input', () => {
            incomePeriod.value = Math.ceil(this.calcPeriod());
        });
        //Блокируем все поля
        document.querySelector('.data').querySelectorAll('[type="text"]').forEach(function(item){
            item.disabled = true;
        });
        document.querySelectorAll('.btn_plus').forEach(item => {
            item.disabled = true;
        });
        //Изменяем кнопки
        start.style.display = 'none';
        cancelButton.style.display = 'block';
        //Сбрасываем прогресс
        cancelButton.addEventListener('click', () => {
        //Разблокируем поля
            document.querySelector('.data').querySelectorAll('[type="text"]').forEach(function(item){
            document.querySelectorAll('[type="text"]').forEach(function(item){
                item.disabled = false;
                item.value = null;
            });
            document.querySelectorAll('.btn_plus').forEach(item => {
                item.disabled = false;
            });
            //Все объекты к 0
            for(let key in this) {
                if(key = 13) break;
                this[key] = 0;
            }
            start.style.display = 'block';
            start.disabled = true;
            cancelButton.style.display = 'none';
            periodSelect.value = 1;
            viePeriod.textContent = periodSelect.value;
        });
        });
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
    addIncomeBlock: function(){

        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            btnPlusIncomeAdd.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function(){
        incomeItem.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = cashIncome;
            }
                for(let key in this.income){
                    this.incomeMonth += +this.income[key];
                }
        });
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                this.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    },
    getBudget : function () {
        this.budgetMonth = this.budget - this.expensesMonth + this.incomeMonth;
        console.log(this.incomeMonth);
        console.log(this.budget);
        console.log(this.expensesMonth);
        if(this.budgetMonth >= 0) {
            this.budgetDay = this.budgetMonth / 30;
        } else {
            alert("Ошибка! Бюджет на месяц отрицательный!");
            return;
        }
    },
    getTargetMonth: function(){
        return targetAmount.value / this.budgetMonth;
    },
    calcPeriod: function(){
        return this.budgetMonth * periodSelect.value;
    },
    getIncomeMonth : function () {
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },
};

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
//Кнопки 13
start.addEventListener('click', appData.start.bind(appData));
start.setAttribute('disabled', "disabled");


//Блокировка и разблокировка кнопки
salaryAmount.addEventListener('input', function() {
    if(salaryAmount.value !== "") {
        start.removeAttribute('disabled')
    } else {
        start.setAttribute('disabled', "disabled");
    }; 
});
salaryAmount.addEventListener('change', function() {
    if(salaryAmount.value !== "") {
        start.removeAttribute('disabled')
    } else {
        start.setAttribute('disabled', "disabled");
    }; 
});
/*expensesButton.addEventListener('click', () => {
    appData.addExpensesBlock();
    checkArr(expensesItems);
}); 
incomeButton.addEventListener('click', () => {
    appData.addIncomeBlock();
    checkArr(incomeItems);
});*/

periodSelect.addEventListener('input', () => {
    viePeriod.textContent = periodSelect.value;
});

start.addEventListener('click', this.start);

expensesPlus.addEventListener('click', this.addExpensesBlock);

//Доходы и расходы
//checkArr(incomeItems);
//checkArr(expensesItems);