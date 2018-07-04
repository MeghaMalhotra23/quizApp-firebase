const quesOperation={
    addQuiz(arr,title){
        var id=title+randomNumber(100,1)
       arr.forEach((data)=>firebase.database().ref('quiz/'+id+'/'+title+data.id).set(data));
        
    }
}