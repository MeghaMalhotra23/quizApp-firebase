redirect();
window.addEventListener('DOMContentLoaded',init);
var index=0;
var questions;
var flag=true;
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
   // document.querySelector('#java').addEventListener('click'.showHide);
    document.querySelector('#java').addEventListener('click',java);
    document.querySelector('#javascript').addEventListener('click',javascript);
    document.querySelector('#submit').addEventListener('click',submitAns);
    document.querySelector('#finish').addEventListener('click',finish);
    document.querySelector('#next').addEventListener('click',next);
    document.querySelector('#prev').addEventListener('click',prev);
    document.querySelector('#back').addEventListener('click',back);
    document.querySelector('#log-out').addEventListener('click',logOut);
    document.querySelector('#search-quiz').addEventListener('click',searchQuiz);
}
function back(){
    location.href='welcomestu.html';
}
function logOut(){
    localStorage.clear();
    location.href='index.html';
}
function searchQuiz(){
   var searchid= document.querySelector('#search-input').value;
   if(searchid==undefined)
   alert('enter proper chopice');
   else
   createQuiz(searchid);
}
function hide(id){
    document.querySelector('#'+id).classList.add('hide');
}
function show(id){
    document.querySelector('#'+id).classList.remove('hide');
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
    show('score-view');
    hide('ques-view');
    var ind;
    flag=false;
    //console.log(questions[0].rans);
    for(let question of questions){
        ind=question.rans
        ind2=question.urans;
        var h3=document.createElement("h3");
        h3.innerHTML=`Q ${question.ques}`;
        document.querySelector('#scoring').appendChild(h3);
        console.log(question.ans[ind]);
        var right=document.createElement("p");
        right.innerHTML=`correct answer ${question.ans[ind]}`;
        document.querySelector('#scoring').appendChild(right);
        var your=document.createElement("p");
        your.innerHTML=`your answer ${question.ans[ind2]}`;
        document.querySelector('#scoring').appendChild(your);
    }

    document.querySelector('#total').innerHTML=totalScore;
    
}
var totalScore=0;
function circleStatus(){
    divArr.forEach(element => {
        
    });
}
function submitAns(){
    var id=index+1;
    if(document.querySelector('#c-1').checked==true){
    questions[index].urans=document.querySelector('#c-1').value;}
    else if(document.querySelector('#c-5').checked==true)
    questions[index].urans=document.querySelector('#c-5').value;
    else if(document.querySelector('#c-3').checked==true)
    questions[index].urans=document.querySelector('#c-3').value;
    else if(document.querySelector('#c-4').checked==true)
    questions[index].urans=document.querySelector('#c-4').value;
    if(questions[index].attempt==false){
        questions[index].attempt=true;
        var id=parseInt(this.innerHTML);
        if(questions[index].urans==questions[index].rans){
        totalScore=totalScore+questions[index].score;
        questions[index].correctAns=true;
    }}
}
function getQuestionId(){
    var id = parseInt(this.innerHTML) ;
    index = id-1;
    disable();
    printQuestion();
}

function drawCircle(status,id){
    var div = document.createElement("div"); 
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
        document.querySelector("#next").setAttribute("disabled", true);
    }
    else{
        document.querySelector("#next").removeAttribute("disabled");
    }
}
function java(){
    createQuiz('java77');
}
function javascript(){
    createQuiz('javascript6');
}

function createQuiz(quizid){
    hide('choose-quiz');
    show('ques-view');
    arrOfQues=[];
    quizOperation.prepareQues(quizid).then((data)=>{
        var keys=Object.keys(data);
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
    var id;
    if(index<questions.length){
        var question = questions[index];
        id=index+1;
        document.querySelector("#question").innerHTML = `Q${question.id}: ${question.ques}`;
        document.querySelector("#r-1").innerHTML= `${question.ans[0]}`;
        document.querySelector('#r-2').innerHTML= `${question.ans[1]}`;
        document.querySelector('#r-3').innerHTML= `${question.ans[2]}`;
        document.querySelector('#r-4').innerHTML= `${question.ans[3]}`;
        //console.log('index is',index);
       // document.querySelector('.'+id).innerHTML='4';
    
    }
}
function stop(){
    if(flag){
    alert('timeOver');
    finish();}
}