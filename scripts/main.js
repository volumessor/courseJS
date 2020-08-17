let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}
let money,
    start = function()  {
        do  {
            money = prompt('Ваш месячный доход?');
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
    mission: 1000000,
    period: 3,
    asking: function(){
            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
                appData.addExpenses = addExpenses.toLowerCase().split(',');
                appData.deposit = confirm('Есть ли у вас депозит в банке?');
            for (let i = 0; i < 2; i++) {
        
                let expens = prompt('Введите обязательную статью расходов?');
                let sumTwo;
                do {
                    sumTwo = +prompt('Во сколько это обойдется?');
                } 
                while (isNaN(sumTwo) || sumTwo === '' || sumTwo === null);
                appData.expenses[expens] = +sumTwo;
            }
            appData.getExpensesMonth();
            appData.getBudget();
            appData.getStatusIncome();
            appData.getTargetMonth();
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
};

appData.asking();
console.log(appData);

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " = " + appData[key]);
}
