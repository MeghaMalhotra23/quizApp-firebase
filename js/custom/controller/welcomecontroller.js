redirect();
window.addEventListener('DOMContentLoaded',init);
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
    document.querySelector('#create-quiz-btn').addEventListener('click',showhide);
    document.querySelector('#create').addEventListener('click',createQuiz);
    document.querySelector('#submit-ques').addEventListener('click',submitQues);
    document.querySelector('#save').addEventListener('click',saveFB)
    document.querySelector('#back').addEventListener('click',back);
    document.querySelector('#log-out').addEventListener('click',logout);
}
function logout(){
    localStorage.clear();
    location.href='index.html';
}
function back(){
    location.href='welcome.html';
}
function showhide(){
    document.querySelector('#q-form').classList.toggle('hide');
}
var no;
var counter=1;
var title;
function createQuiz(){
    title=document.querySelector('#q-title').value;
    no=document.querySelector('#q-no').value;
    if(title.length<=0){
        document.querySelector('#q-msg').innerHTML='Title of the quiz cannot be blank';
    }
    else if(no.length<=0){
        document.querySelector('#q-msg').innerHTML='Number of questions cannot be blank';
    }
    else if(no<=0){
        document.querySelector('#q-msg').innerHTML='Number of questions should be more than 0';
    }
    else{
    document.querySelector('#create-quiz-btn').classList.add('hide');
    document.querySelector('#q-form').classList.add('hide');
    document.querySelector('#add-ques').classList.remove('hide');
    document.querySelector('#q-count').innerHTML=counter;
    document.querySelector('#q-title2').innerHTML=title;
    }
}
function submitQues(){
var ques=document.querySelector('#ques').value;
var ansArr=document.querySelectorAll('.choice');
var i=0;
var ans=[];
ansArr.forEach((data)=>{
    ans[i]=data.value;
    i++
});
var rans;
if(ques.length<0)
document.querySelector('sub-msg').innerHTML='question cannot be blank';
else if(ans.length<0){
    document.querySelector('#sub-msg').innerHTML='Enter all choices';
}
else{
if(document.querySelector('#r-1').checked)
rans=document.querySelector('#r-1').value;
else if(document.querySelector('#r-2').checked)
rans=document.querySelector('#r-2').value;
else if(document.querySelector('#r-3').checked)
rans=document.querySelector('#r-3').value;
else if(document.querySelector('#r-4').checked)
rans=document.querySelector('#r-4').value;
//var quesid=title+counter;
//quesid,title
var obj=new Question(ques,rans,ans,counter);
addquestoArray(obj);
clearInputs();
counter++;
document.querySelector('#q-count').innerHTML=counter;
}
if(counter>no){
    document.querySelector('#submit-ques').disabled=true;
   document.querySelector('#save').disabled=false;
   document.querySelector('#q-count').innerHTML=counter-1;
    //saveFB();
   //alert('Quiz has been saved');
    //location.href='welcome.html';
}
}
function clearInputs(){
    document.querySelector('#ques').value='';
    var arrChoice=document.querySelectorAll('.choice');
    arrChoice.forEach((data)=>data.value='');
}
var arr=[];
var j=0;
function addquestoArray(obj){

arr[j]=obj;
j++;
console.log(arr);
}
function saveFB(){
    var id=title+randomNumber(100,1);
    quesOperation.addQuiz(arr,id);
    // var p=document.createElement("p");
    // p.innerHTML=`your quiz Id is : ${id}`;
    // document.querySelector("quiz123").appendChild("p");
    alert('quiz id is '+id);
    
    //location.href='welcome.html';
}