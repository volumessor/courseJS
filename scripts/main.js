let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}
//lesson09 - Получение элементов со страницы

let start = document.getElementById('start'),
    cancelButton = document.getElementById("cancel"),
    btnPlusIncomeAdd = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    expensesButton = document.getElementsByTagName("button")[1],
    incomeButton = document.getElementsByTagName("button")[0];
//right_side_programm
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriod = document.querySelector('.income_period-value'),
    targetMonth = document.querySelector('.target_month-value');
//last_input or range
let salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('[placeholder="Наименование"]'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('div.expenses-items [placeholder="Наименование"]'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItem = document.querySelectorAll('.income-items'),
    viePeriod = document.querySelector(".period-amount");

const AppData = function(){
    this.budget = 0;
    this.income = {};
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.incomeMonth = 0;
    this.expensesMonth = 0;  
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};
//Слушатели
AppData.prototype.eventListener = function () {
    //Кнопки 13
    start.addEventListener('click', this.start.bind(this));
    start.setAttribute('disabled', "disabled");
    //Блокировка и разблокировка кнопки
    salaryAmount.addEventListener('input', function() {
    if(salaryAmount.value !== "") {
        start.removeAttribute('disabled');
    } else {
        start.setAttribute('disabled', "disabled");
    }; 
    });
    salaryAmount.addEventListener('change', function() {
    if(salaryAmount.value !== "") {
        start.removeAttribute('disabled');
    } else {
        start.setAttribute('disabled', "disabled");
    }; 
    });
    periodSelect.addEventListener('input', () => {
        viePeriod.textContent = periodSelect.value;
    });
    expensesPlus.addEventListener('click', this.addExpensesBlock);
};
//Старт
AppData.prototype.start = function() {
    
    this.budget = salaryAmount.value;
    this.getIncome();
    this.getIncomeMonth();
    this.getExpenses();
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.showResult();        
};
//Вывод результата
AppData.prototype.showResult = function(){
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
};
AppData.prototype.getIncome = function(){
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
};
AppData.prototype.getIncomeMonth = function () {
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddIncome = function(){
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ''){
            this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.addExpensesBlock = function(){
    
    console.log(expensesItems.parentNode);
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function(){
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getExpensesMonth = function(){
    
    for (let key in this.expenses)   {
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getAddExpenses = function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if(item !== ''){
            this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getBudget = function () {
    const _this = this;
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
};
AppData.prototype.getTargetMonth = function(){
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.calcPeriod = function(){
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.getStatusIncome = function(){
    
    if(this.budgetDay > 1200){
        return ('У вас высокий доход');
    } else if (600 > this.budgetDay <= 1200){
        return ('У вас средний доход');
    } else if (this.budgetDay < 600){
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay <= 0){
        return ('Что то пошло не так');
    }
};
AppData.prototype.getInfoDeposit = function(){
    if(this.deposit){
        this.percentDeposit = checkVariable('number', 'Какой годовой депозит?');
        this.moneyDeposit = checkVariable('number', 'Какая сумма заложено?');
    }
};
AppData.prototype.calcSavedMoney = function(){
    return this.budgetMonth * this.period;
};  
AppData.prototype.addIncomeBlock = function(){

    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
        btnPlusIncomeAdd.style.display = 'none';
    }
};

const appData = new AppData();
appData.eventListener();
console.log(appData);
