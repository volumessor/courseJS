let isNumber = function(n) {
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
console.log(appData.addExpenses);


