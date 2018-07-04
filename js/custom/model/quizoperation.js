const quizOperation={
    prepareQues(id){
        var pr= new Promise((resolve,reject)=>{
           var questions=firebase.database().ref('quiz/'+id);
           questions.on('value',(snapshot)=>{
            var quesArr=snapshot.val()
            resolve(quesArr);
            reject('rejected');
        })
    })
    return pr;
    }
}