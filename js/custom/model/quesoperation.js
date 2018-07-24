const quesOperation={
    addQuiz(arr,id){
        
        //console.log('called');
       arr.forEach((data)=>firebase.database().ref('quiz/'+id+'/'+data.id).set(data));
        
    }
}