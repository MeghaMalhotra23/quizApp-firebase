class Question{
    constructor(ques,rans,ans,id){
        this.ques=ques;
        this.rans=rans;
        this.attempt=false;
        this.ans=ans;
        this.id=id;
        this.score=quesConstants.score;
        this.correctAns=false;
        this.urans=null;
        //this.quizid=quizid;
    }
}