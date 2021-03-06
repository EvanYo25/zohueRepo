var allow_create;
//症狀清單
var diseaseList={
  '1':"鼻咽癌",
  '2':"鼻腔/副鼻竇癌",
  '3':"口腔癌",
  '4':"口咽癌",
  '5':"下咽癌",
  '6':"喉癌",
  '7':"唾液腺癌",
  '8':"甲狀腺癌",
  '999':"其它"
};
var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
$(document).ready(function(){
  //須登入才能使用
  $.get("/checkAuth", function(auth){
    if(!auth) {
      showDialog("錯誤訊息","您尚未登入喔！", function(){
        window.location.replace("/home");
      });
    }
  });
});

//刪除黑名單
function removeBlack(parent, id) {
  $.post("/removeBlack", {id: id}, function(res){
    if(res.err) {
      showDialog("錯誤訊息",res.err);
    } else {
      var html="";
      html+="<button type='button' class='button' onclick='addFriend(this.parentNode, "+id+")'>加好友</button>&nbsp&nbsp&nbsp&nbsp";
      html+="<button type='button' class='button btnForbbiden' onclick='addBlack(this.parentNode, "+id+")'>封鎖</button><br>";
      parent.innerHTML=html;
    }
  })
}
//申請好友
function addFriend(parent, id) {
  $.post("/addFriend", {id: id}, function(res){
    if(res.err) {
      showDialog("錯誤訊息",res.err);
    } else {
      var html="";
      html+="已送出好友邀請&nbsp&nbsp<button type='button' class='button' onclick='removeAddFriend(this.parentNode, "+id+")'>收回好友邀請</button>&nbsp&nbsp&nbsp&nbsp";
      html+="<button type='button' class='button btnForbbiden' onclick='addBlack(this.parentNode, "+id+")'>封鎖</button><br>";
      parent.innerHTML=html;
    }
  })
}
//加入黑名單
function addBlack(parent, id) {
  $.post("/addBlack", {id: id}, function(res){
    if(res.err) {
      showDialog("錯誤訊息",res.err);
    } else {
      var html="";
      html+="已封鎖&nbsp&nbsp<button type='button' class='button' onclick='removeBlack(this.parentNode, "+id+")'>解除封鎖</button><br>";
      parent.innerHTML=html;
    }
  })
}
//確認好友邀請
function confirmFriend(parent, id) {
  $.post("/confirmFriend", {id: id}, function(res){
    if(res.err) {
      showDialog("錯誤訊息",res.err);
    } else {
      var html="";
      html+="好友&nbsp&nbsp<button type='button' class='button' onclick='removeFriend(this.parentNode, "+id+")'>解除好友</button>&nbsp&nbsp&nbsp&nbsp";
      html+="<button type='button' class='button btnForbbiden' onclick='addBlack(this.parentNode, "+id+")'>封鎖</button><br>";
      parent.innerHTML=html;
    }
  })
}
//刪除好友
function removeFriend(parent, id) {
  $.post("/removeFriend", {id: id}, function(res){
    if(res.err) {
      showDialog("錯誤訊息",res.err);
    } else {
      var html="";
      html+="<button type='button' class='button' onclick='addFriend(this.parentNode, "+id+")'>加好友</button>&nbsp&nbsp&nbsp&nbsp";
      html+="<button type='button' class='button btnForbbiden' onclick='addBlack(this.parentNode, "+id+")'>封鎖</button><br>";
      parent.innerHTML=html;
    }
  })
}
//取消好友邀請
function removeAddFriend(parent, id) {
  $.post("/removeAddFriend", {id: id}, function(res){
    if(res.err) {
      showDialog("錯誤訊息",res.err);
    } else {
      var html="";
      html+="<button type='button' class='button' onclick='addFriend(this.parentNode, "+id+")'>加好友</button>&nbsp&nbsp&nbsp&nbsp";
      html+="<button type='button' class='button btnForbbiden' onclick='addBlack(this.parentNode, "+id+")'>封鎖</button><br>";
      parent.innerHTML=html;
    }
  });
}
//搜尋使用者
function search(page, mobile) {
  //判斷顯示的是行動版還是正常版欄位
  if(mobile) {
    var index="2";
  } else {
    var index="1";
  }
  //表示重按搜尋，先清空之前搜尋的
  if(page==0) {
    document.getElementById("searchList").innerHTML="";
  }
  document.getElementById("more").innerHTML="";
  var curHtml=document.getElementById("searchList").innerHTML;
  //放置loading圖
  document.getElementById("searchList").innerHTML+="<div style='text-align: center;'><img src='/images/img_friends/ajax-loader.gif'></img></div>"
  var alias=document.getElementById("alias"+index).value;
  var disease=$("#disease"+index).val();
  var place=$("#place"+index).val();
  var userType=$("#userType"+index).val();
  $.post("/searchFriends", {alias: alias, disease: disease, place: place, userType: userType, thisPage: page}, function(res) {
    if(res.err) {
      showDialog("錯誤訊息",res.err);
      window.assign("/home");
    } else {
      //隔1秒再做
      setTimeout(function(){
        if(res.users.length!=0) {
          var allUser=res.users;
          var html="";
          for(i=0; i<allUser.length; i++) {
            if(allUser[i].isFriend!=-2) {
              html+="<div class='friend'><div class='image'>";
              var picSize="100";
              var authorType="";
              //判斷使用者類別
              switch(allUser[i].type) {
                case "D":
                  authorIcon="<img class='imgAuthorType' src='/images/img_forum/doctor_icon.png' title='已認證醫師' style='margin-right:10px; height:"+picSize+"px; width:"+picSize+"px;'>";
                  authorType="醫師";
                  break;
                case "S":
                  authorIcon="<img class='imgAuthorType' src='/images/img_forum/sw_icon.png' title='已認證社工師' style='margin-right:10px; height:"+picSize+"px; width:"+picSize+"px;'>";
                  authorType="社工師";
                  break;
                case "RN":
                  authorIcon="<img class='imgAuthorType' src='/images/img_forum/sw_icon.png' title='已認證護理師' style='margin-right:10px; height:"+picSize+"px; width:"+picSize+"px;'>";
                  authorType="護理師";
                  break;
                case "P":
                  authorIcon="<img class='imgAuthorType' src='/images/img_forum/user_icon.png' title='病友' style='margin-right:10px; height:"+picSize+"px; width:"+picSize+"px;'>";
                  break;
                case "F":
                  authorIcon="<img class='imgAuthorType' src='/images/img_forum/user_icon.png' title='家屬' style='margin-right:10px; height:"+picSize+"px; width:"+picSize+"px;'>";
                  break;
                default:
                  authorIcon="<img class='imgAuthorType' src='/images/img_forum/user_icon.png' title='一般民眾' style='margin-right:10px; height:"+picSize+"px; width:"+picSize+"px;'>";
              }
              html+=authorIcon;
              html+="<img  class='imgUser' src='"+allUser[i].img+"' onclick='toProfile(\""+allUser[i].id+"\")' style='margin-right:10px; height:"+picSize+"px; width:"+picSize+"px;'></div>";
              html+="<div class='friendMid'><div style='margin-right: 0px; display: inline-block; height: 60%; width: 100%; font-size: 32px;'><a href='/profile/?"+allUser[i].id+"' style='font-size: 32px;'>"+allUser[i].alias+"</a>"+authorType+"</div>";

              html+="<br><span style='display:inline-block; height: 40%; width: 130%;'>";
              //判斷好友狀態
              switch(allUser[i].isFriend) {
                case -1:
                  html+="<div class='status'>已封鎖&nbsp&nbsp</div><button type='button' class='button' onclick='removeBlack(this.parentNode, "+allUser[i].id+")'>解除封鎖</button><br>";
                  break;
                case 0:
                  html+="<button type='button' class='button' onclick='addFriend(this.parentNode, "+allUser[i].id+")'>加好友</button>&nbsp&nbsp&nbsp&nbsp";
                  html+="<button type='button' class='button btnForbbiden' onclick='addBlack(this.parentNode, "+allUser[i].id+")'>封鎖</button><br>";
                  break;
                case 1:
                  html+="<div class='status'>要求加入好友&nbsp&nbsp</div><button type='button' class='button' onclick='confirmFriend(this.parentNode, "+allUser[i].id+")'>確認好友</button>&nbsp&nbsp&nbsp&nbsp";
                  html+="<button type='button' class='button btnForbbiden' onclick='addBlack(this.parentNode, "+allUser[i].id+")'>封鎖</button><br>";
                  break;
                case 2:
                  html+="<div class='status'>已送出好友邀請&nbsp&nbsp</div><button type='button' class='button' onclick='removeAddFriend(this.parentNode, "+allUser[i].id+")'>收回好友邀請</button>&nbsp&nbsp&nbsp&nbsp";
                  html+="<button type='button' class='button btnForbbiden' onclick='addBlack(this.parentNode, "+allUser[i].id+")'>封鎖</button><br>";
                  break;
                case 3:
                  html+="<div class='status'>好友&nbsp&nbsp</div><button type='button' class='button' onclick='removeFriend(this.parentNode, "+allUser[i].id+")'>解除好友</button>&nbsp&nbsp&nbsp&nbsp";
                  html+="<button type='button' class='button btnForbbiden' onclick='addBlack(this.parentNode, "+allUser[i].id+")'>封鎖</button><br>";
                  break;
              }
              html+="</span></div><div class='friendRight'>";
              if(allUser[i].addressCity&&allUser[i].addressCity!="") {
                html+="<div style='display:inline-block; font-size: 22px; width: 100%'>來自"+allUser[i].addressCity+"</div><br>";
              }

              //判斷使用者類別以調整顯示
              if(allUser[i].primaryDisease&&allUser[i].primaryDisease!="") {
                html+="<div style='display:inline-block; font-size: 22px; width: 100%'>";
                switch(allUser[i].type) {
                  case "D":
                    html+="主治"+diseaseList[allUser[i].primaryDisease];
                    break;
                  case "S":
                    html+="主治"+diseaseList[allUser[i].primaryDisease];
                    break;
                  case "RN":
                    html+="主治"+diseaseList[allUser[i].primaryDisease];
                    break;
                  case "P":
                    html+="患有"+diseaseList[allUser[i].primaryDisease];
                    break;
                  case "F":
                    html+="照顧"+diseaseList[allUser[i].primaryDisease]+"患者";
                    break;
                  default:
                }
                html+="</div><br>";
              }

              if(allUser[i].age!=-1) {
                html+="<div style='display:inline-block; font-size: 22px; width: 100%'>"+allUser[i].age+"歲</div>";
              }
              html+="</div></div>";
            }
          }
          if(page==0) {
            document.getElementById("searchList").innerHTML=html;
          } else {
            document.getElementById("searchList").innerHTML=curHtml+html;
          }
          if(res.hasNext) {
            document.getElementById("more").innerHTML="<button type='button' class='button' onclick='search("+(page+1)+")'>顯示更多人</button>";
          } else {
            document.getElementById("more").innerHTML="";
          }
        } else {
          var html="找不到符合搜尋條件的人";
          document.getElementById("searchList").innerHTML=html;
        } 
      }, 1000);
    }
  });
}

function toProfile(id) {
  window.location.assign("/profile/?"+id);
}
/************************** 郵遞區號相關 **************************/
function ShowAllCity(){
  $.get("/postallist/getall", function(res){
      if(res.err) {
        showDialog("錯誤訊息",res.err);
      } else {
        HandleResponse_ShowAllCity(res);
      }
  });
}
function HandleResponse_ShowAllCity(response){
  obj_postal = JSON.parse(response);
  for(var r in obj_postal){
    var addressCity = obj_postal[r].addressCity;
    $(".place").append('<option value='+addressCity+'>'+addressCity+'</option>');
  }
}

function showDialog(title, message, cb){
  bootbox.dialog({
    message: message,
    title: title,
    buttons: {
      main: {
        label: "確認",
        className: "btn-primary",
        callback: function() {
          if(typeof cb == "function")
            cb();
        }
      }
    }
  });
}