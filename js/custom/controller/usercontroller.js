window.addEventListener('DOMContentLoaded',init);

function init(){
clearLocal();
bindEvents();
}
function clearLocal(){
    if(localStorage.userid){
        localStorage.clear();
    }
}
function bindEvents(){
document.querySelector("#login").addEventListener('click',login);
document.querySelector("#register").addEventListener('click',register);
document.querySelector('#login-btn').addEventListener('click',doLogin);
document.querySelector('#reg-btn').addEventListener('click',doRegister);
}
function login(){
    if(document.querySelector(".register").classList.contains("hide"))
document.querySelector(".login").classList.toggle("hide");
else{
document.querySelector(".register").classList.add("hide");
document.querySelector(".login").classList.toggle("hide");
}
}
function register(){
    if(document.querySelector(".login").classList.contains("hide"))
document.querySelector(".register").classList.toggle("hide");
else{
document.querySelector(".login").classList.add("hide");
document.querySelector(".register").classList.toggle("hide");
}}
function doLogin(){
var userid=document.querySelector('#uid').value;
var pass=document.querySelector('#pass').value;
useroperation.getUserObj(userid).then((obj)=>{if(obj.password==pass){
localStorage.userid=userid;
if(obj.type=='teacher')
location.href='welcome.html';
else if(obj.type=='student')
location.href='welcomestu.html';
}
else{
    document.querySelector('#login-msg').innerHTML='Invalid Userid or Password';
}}).catch((err)=>console.log(err));
}

function doRegister(){
    var userid=document.querySelector('#r-uid').value;
    var pass=document.querySelector('#r-pass').value;
    var name=document.querySelector('#r-name').value;
    var age=document.querySelector('#r-age').value;
    var type;
    if(document.querySelector('#r-1').checked)
    type=document.querySelector('#r-1').value;
    else if(document.querySelector('#r-2').checked)
    type=document.querySelector('#r-2').value;
    useroperation.getUserObj(userid).then((obj)=>{
    if(userid==null){
        document.querySelector('#reg-msg').innerHTML='UserID cannot be null';
    }
    else if(pass==null){
        document.querySelector('#reg-msg').innerHTML='Password cannot be null';
    }
    else if(type==null){
        document.querySelector('#reg-msg').innerHTML='Please select an acoount type'
    }
    else if(obj.userid!=null){
        console.log(obj);
        document.querySelector('#reg-msg').innerHTML='UserID already taken';
    }
    else
    document.querySelector('#reg-msg').innerHTML='Registered Successfully'
    useroperation.registerUser(userid,pass,name,age,type);
    })
}