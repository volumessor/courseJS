function countTimer (deadLine) {

    let timerHour = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
    
    function getTimeRemaining (){
        let dateStop = new Date(deadLine).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);

        return {timeRemaining, hours, minutes, seconds};
    }

    function intervalClock () {    
        let timer = getTimeRemaining();
        if(getTimeRemaining().timeRemaining > 0) {
            timerHour.textContent = ((timer.hours < 10) ? '0' + timer.hours : timer.hours);
            timerMinutes.textContent = ((timer.minutes < 10) ? '0' + timer.minutes : timer.minutes);                        
            timerSeconds.textContent = ((timer.seconds < 10) ? '0' + timer.seconds : timer.seconds);
            
        } else {
            clearInterval(init);
            timerHour.textContent = `00`;
            timerMinutes.textContent = `00`;
            timerSeconds.textContent = `00`;
           
        }    
    }
    intervalClock();
    let init = setInterval(intervalClock, 1000);
}


export default countTimer;