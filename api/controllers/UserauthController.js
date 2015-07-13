/**
 * UserauthController
 *
 * @description :: Server-side logic for managing Userauths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    authGet:function(req,res){          //得到使用者的授權狀態
        id=req.session.user.id;
        Userauth.find({user:id}).exec(function(err,result){
            if(err){
                res.send(500,{err:"DB error"});
            }
            if(result.length==0){
                str='{"city":"all","email":"all","gender":"all","phone":"all","bday":"all"}';
                res.send(JSON.parse(str));
            }
            else{
                res.send(result[0]);
            }
        })
    },


    authCheck: function (req,res){      //看這兩個人關係能看到什麼
        function checkAuth(id, cb){         //先看這個帳號有沒有在table裡面
            Userauth.find({user:id}).exec(function(err,result){
                if (err){
                    res.send(500,{err:"DB error"});
                }
                else{
                    if (result.length>0){
                        cb(true);
                    }
                    else{
                        cb(false);
                    }
                }
            });
        }

        var id=req.session.user.id;
        var account=req.param("account")
        console.log("asdfasdf   "+account)
        checkAuth(id,function(inTable){
            if(inTable){                    //如果有的話，在去看，沒有就全部都可以
                var doctor=false;
                var friend=false;
                var self=false;
                var viewer = req.session.user.account;

                User.find({account:viewer}).populate('friends').exec(function(err,user){
                    if(err){

                    }
                    if (user[0].type=="D"){
                        doctor=true;
                    }
                    for (var i=0 ; i<user[0].friends.length;i=i+1){
                        if (user[0].friends[i].account==account)
                            friend=true;
                    }
                });
                if (viewer==account){
                    self=true;
                    friend=true;
                    doctor=true;
                }
                str = '{"city":false,"email":false,"gender":false,"phone":false,"bday":false}';
                var index = JSON.parse('{"0":"city","1":"email","2":"gender","3":"phone","4":"bday"}');
                var ret_status=JSON.parse(str);
                User.find({account:account}).exec(function(err,user){
                    var id=user[0].id;
                    Userauth.find({user:id}).exec(function(err,auth){
                        if (err){
                            res.send(500,"DB error");
                        }
                        var auth_set = auth[0]
                        for (var i =0;i<=4;i++){
                            var ind = index[i];
                            console.log(auth_set[ind])
                            if (auth_set[ind]==="self" && self){
                                console.log(ind+"self");
                                ret_status[ind]=true;
                            }
                            else if (auth_set[ind]==="friend" && friend){
                                console.log(ind+"friend");
                                ret_status[ind]=true;
                            }
                            else if (auth_set[ind]==="doctor"&&doctor){
                                console.log(ind+"doctor");
                                ret_status[ind]=true;
                            }
                            else if (auth_set[ind]==="all"){
                                console.log(ind+"all");
                                ret_status[ind]=true;
                            }
                        }

                        res.send(ret_status);
                    })
                    
                });
                
            }
            else{
                res.send(JSON.parse('{"city":true,"email":true,"gender":true,"phone":true,"bday":true}'));
            }
        });
    },
	authSet : function (req,res){
		 function chechAtuh(id, cb){
            Userauth.find({user:id}).exec(function(err,result){
            	if (err){
            		res.send(500,{err:"DB error"});
            	}
            	else{
            		if (result.length>0){
            			cb(result[0]);
            		}
            		else{
            			cb(false);
            		}
            	}
            })
        }
        function set(inTable,id,item,status){
            if(inTable){
                var auth_status=inTable
                auth_status[item]=status;
                Userauth.update({user:id},{city:auth_status["city"],gender:auth_status["gender"],phone:auth_status["phone"],bday:auth_status["bday"],email:auth_status["email"]}).exec(function(err,result){
                	if (err){
                		res.send(500,"DB error");
                	}
                	var name;
                        if (status=="all")
                            name="全部人";
                        else if(status=="doctor")
                            name="醫生";
                        else if(status=="friend")
                            name="朋友";
                        else
                            name="自己";
                    var name2;
                    	if(item=="city")
                    		name2="居住地";
                    	else if (item=="email")
                    		name2="email";
                    	else if (item=="gender")
                    		name2="性別";
                    	else if (item=="bday")
                    		name2="生日";
                        else if (item=="phone")
                            name2="電話";
                	res.send(name2 + "現在能被 " +name+"看到");
                });
            }
            else{
                var str='{"city":"self","email":"self","gender":"self","phone":"self","bday":"self"}';
                var auth_status=JSON.parse(str);
                auth_status[item]=status;
            	Userauth.create({user:id,city:auth_status["city"],gender:auth_status["gender"],phone:auth_status["phone"],bday:auth_status["bday"]}).exec(function(err,ret){
            		if (err){
                		res.send(500,{err:"DB error"});
                	}
                	var name;
                        if (status=="all")
                            name="全部人";
                        else if(status=="doctor")
                            name="醫生";
                        else if(status=="friend")
                            name="朋友";
                        else
                            name="自己";
                    var name2;
                    	if(item=="city")
                    		name2="居住地";
                    	else if (item=="email")
                    		name2=email;
                    	else if (item=="gender")
                    		name2="性別";
                    	else if (item=="bday")
                    		name2="生日";
                	res.send(name2 + "現在能被 " +name2+"看到");
            	})
            }
        }
        var id =req.session.user.id;
        var item = req.param("item");
        var status = req.param("status");
        chechAtuh(id, function(inTable){
            set(inTable,id, item,status);
        });
	}
};

