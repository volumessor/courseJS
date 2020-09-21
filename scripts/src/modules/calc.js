const calc = (price = 100) => {
    const calcBlock = document.querySelector(`.calc-block`),
        calcType = calcBlock.querySelector(`.calc-type`),
        calcSquare = calcBlock.querySelector(`.calc-square`),
        calcCount = calcBlock.querySelector(`.calc-count`),
        calcDay = calcBlock.querySelector(`.calc-day`),
        totalValue = calcBlock.querySelector(`#total`);

    let myReq;

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1,
            typeValue = calcType.value,
            squareValue = calcSquare.value;
        
        if(calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }
        if(calcDay.value < 5 && calcDay.value) {
            dayValue *= 2
        } else if(calcDay.value < 10 && calcDay.value) {
            dayValue *= 1.5
        }
        if(typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
        }
        
        modalAnimation(totalValue, total);
    }
    
    calcBlock.addEventListener(`change`, (event) => {
        let target = event.target;
        if(target === calcType || target === calcSquare || target === calcCount ||
            target === calcDay) {
                cancelAnimationFrame(myReq);
                countSum();
        }
    })

    const modalAnimation = (totalValue, total) => {
        let counter = +totalValue.textContent,
            number, 
            progress = 0;
        if(counter < total) {
            number = total - counter;
        }
        if(counter > total) {
            number = counter - total;
        }
        function newAnimation () {
            if(counter < total) {
                totalValue.textContent = Math.round(counter + (number * progress));
                if (progress < 1) {
                    progress = +progress.toFixed(2) + 0.01; //Вот тут меняется скорость
                    myReq = requestAnimationFrame(newAnimation);
                } 
            } else if (counter > total) {
                totalValue.textContent = Math.round(counter - (number * progress));
                if (progress < 1) {
                    progress = +progress.toFixed(2) + 0.1;
                    myReq = requestAnimationFrame(newAnimation);
                }
            }
            
        };
        newAnimation();
    }
};

export default calc;