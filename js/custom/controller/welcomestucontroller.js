redirect();
window.addEventListener('DOMContentLoaded',init);
var index=0;
var questions;
function init(){
    if(localStorage.userid){
        document.querySelector('#uid').innerHTML=localStorage.userid;
    }
    bindEvents();

}
function redirect(){
    if(!localStorage.userid){
        location.href='index.html';
    }
}
function bindEvents(){
    document.querySelector('#java').addEventListener('click',java);
    document.querySelector('#javascript').addEventListener('click',javascript);
    document.querySelector('#submit').addEventListener('click',submitAns);
    document.querySelector('#finish').addEventListener('click',finish);
    document.querySelector('#next').addEventListener('click',next);
    document.querySelector('#prev').addEventListener('click',prev);
}
function next(){
index++;
printQuestion();
}
function prev(){
index--;
printQuestion();
}
function finish(){
    var ind;
    ind=questions[0].rans;
    var ind2=questions[0].urans;
    document.querySelector('#s-question').innerHTML=questions[0].ques;
    document.querySelector('#s-rans').innerHTML=questions[0].ans[ind];
    document.querySelector('#s-urans').innerHTML=questions[0].ans[ind2];

    ind=questions[1].rans;
    ind2=questions[1].urans;
    document.querySelector('#s-question2').innerHTML=questions[1].ques;
    document.querySelector('#s-rans2').innerHTML=questions[1].ans[ind];
    document.querySelector('#s-urans2').innerHTML=questions[1].ans[ind2];

    document.querySelector('#total').innerHTML=totalScore;
    
}
var totalScore=0;
function submitAns(){
    var ans;
    
    if(document.querySelector('#c-1').checked==true){
        console.log(document.querySelector('#c-1').value);
    questions[index].urans=document.querySelector('#c-1').value;}
    else if(document.querySelector('#c-5').checked==true)
    questions[index].urans=document.querySelector('#c-5').value;
    else if(document.querySelector('#c-3').checked==true)
    questions[index].urans=document.querySelector('#c-3').value;
    else if(document.querySelector('#c-4').checked==true)
    questions[index].urans=document.querySelector('#c-4').value;
    if(questions[index].rans==questions[index].urans){
    if(questions[index].attempt==false){
        questions[index].attempt=true;
        totalScore=totalScore+questions[index].score;
        questions[index].correctAns=true;
    }}
    console.log(totalScore);
}
function getQuestionId(){
    var id = parseInt(this.innerHTML) ;
    index = id-1;
    disable();
    printQuestion();
}

function drawCircle(status,id){
    var div = document.createElement("div"); //<div></div>
    div.className=status?"green":"red";
    div.innerHTML = id;
    div.addEventListener("click",getQuestionId);
    document.querySelector("#status").appendChild(div);
    
}
function printStatus(){
    
    for(let question of questions){
        var id = question.id;
        var status = question.attempt;
        drawCircle(status,id);
    }
}
function disable(){
    if(index ==0){
        document.querySelector("#prev").setAttribute("disabled", true);
    }
    else{
        document.querySelector("#prev").removeAttribute("disabled"); 
    }
    if(index==questions.length-1){
        console.log(index);
        console.log(questions.length);
        document.querySelector("#next").setAttribute("disabled", true);
    }
    else{
        console.log('hey');
        document.querySelector("#next").removeAttribute("disabled");
    }
}

function java(){
    arrOfQues=[];
    quizOperation.prepareQues('java77').then((data)=>{
        var keys=Object.keys(data);
        console.log(keys);
        var i=1;
        var realkey;
        for(var key in keys){
           realkey=data[keys[key]];
            data[keys[key]];
            arrOfQues.push(new Question(realkey.ques,realkey.rans,realkey.ans,i));
            i++;
        }
        questions=arrOfQues;
        disable();
        printStatus();
        printQuestion();
        startTimer(60,1000,"time");
        
    }
    ).catch((err)=>console.log(err));
}
function printQuestion(){
    disable();
    if(index<questions.length){
        var question = questions[index];
    
        document.querySelector("#question").innerHTML = `Q${question.id}: ${question.ques}`;
        document.querySelector("#r-1").innerHTML= `${question.ans[0]}`;
        document.querySelector('#r-2').innerHTML= `${question.ans[1]}`;
        document.querySelector('#r-3').innerHTML= `${question.ans[2]}`;
        document.querySelector('#r-4').innerHTML= `${question.ans[3]}`;
    
    }
}