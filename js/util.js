function startTimer(timeLeft,delay,id){
    var c= setInterval(()=>{
        document.querySelector('#'+id).innerHTML=timeLeft;
        if(timeLeft<=0){
        clearInterval(c);
        stop();
        }
        else{
            timeLeft--;
        }
    },delay);
}
const quesConstants={
    score: 5
}
function randomNumber(max,min){
    return Math.floor(Math.random()*(max-min)+min);
}