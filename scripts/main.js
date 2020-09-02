window.addEventListener('DOMContentLoaded', function() {
'use strict';
	// timer
	function countTimer(deadLine) {
		let timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
            
        function getTimeRemainig(){
            let dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemainig = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemainig % 60),
                minutes = Math.floor((timeRemainig / 60) % 60),
                hours = Math.floor(timeRemainig / 60 / 60);

            return {timeRemainig, hours, minutes, seconds};
        }

        function uppdateClock(){
            let timer = getTimeRemainig();
            if(getTimeRemainig().timeRemainig > 0) {
                timerHours.textContent = ((timer.hours <10) ? '0' + timer.hours : timer.hours);
                timerMinutes.textContent = ((timer.minutes <10) ? '0' + timer.minutes : timer.minutes);
                timerSeconds.textContent = ((timer.seconds <10) ? '0' + timer.seconds : timer.seconds);
            } else {
                clearInterval(init);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
            
        } 
        let init = setInterval(uppdateClock, 1000);
	}
    
    countTimer('2 september 2020');
});



