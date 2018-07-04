const useroperation={
    users:[],
    getUserObjByID(userid){
        var pr=new Promise((resolve,reject)=>{
            var user=firebase.database().ref('users/'+userid);
            user.on('value',(snapshot)=>{
                var userObj=snapshot.val()
                resolve(userObj);
                reject('rejected');
            })
        })
        return pr;
    },
    getUserObj(userid){
        var userObj;
        var pr= new Promise((resolve,reject)=>{
    this.getUserObjByID(userid).then((data)=>{
        if(data!=null)
        userObj=new User(data.userid,data.password,data.name,data.age,data.type);
        else
        userObj=new User(null,null,null,null,null);
        resolve(userObj)
        }).catch((err)=>console.log(err));});
        return pr;
    },
   
    registerUser(userid,password,name,age,type){
        var user=new User(userid,password,name,age,type);
        firebase.database().ref('users/'+user.userid).set(user);
    }

}