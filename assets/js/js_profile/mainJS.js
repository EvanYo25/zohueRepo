var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
var board="";
$(document).ready(function(){

  getPri(function(pri_account, pri_id, pri_avatar){
    setTimelinePage(pri_account, pri_id, pri_avatar);
    // if(pri_account===""){
    //   alert("請先登入才能查看個人頁面!");
    //   window.history.back();
    // }
    // else{
    //   setTimelinePage(pri_account, pri_id);
    // }
  });


  
  $(document).on("click",".event_edit",function(e){
    editTimeline(this.name);
  });
  $(document).on("click","#editSend",function(e){
    editTimelineSend(this.name);
  });
  $(document).one("click",".event_del",function(e){
    delTimeline(this.name);
  });
  $(document).one("click","#TimelineNice",function(e){
    Timeline_nice(this.name);
  });
  $(document).one("click","#TimelineCancelNice",function(e){
    Timeline_cancel_nice(this.name);
  });
  $(document).on("click","#expandComment",function(e){
    expandComment(this.name);
  });

  $(document).one("click","#TimelineCommentSend",function(e){
    postTimeline_comment(this.name);
  });
  $(document).on("click",".comment_edit",function(e){
    editRTimeline(this.name);
  });
  $(document).on("click","#editRSend",function(e){
    editRTimelineSend(this.name);
  });
  $(document).one("click",".comment_del",function(e){
    delTimeline_comment(this.name);
  });
  $(document).one("click","#TimelineResponseNice",function(e){
    Timeline_r_nice(this.name);
  });
  $(document).one("click","#TimelineResponseCancelNice",function(e){
    Timeline_r_cancel_nice(this.name);
  });

  $(document).on("click",".auth_set_friend",function(e){
    auth_set(this.name,"friend");
  });

  $(document).on("click",".auth_set_doctor",function(e){
    auth_set(this.name,"doctor");
  });

  $(document).on("click",".auth_set_all",function(e){
    auth_set(this.name,"all");
  });

  $(document).on("click",".auth_set_self",function(e){
    auth_set(this.name,"self");
  });

  $(document).on("click",".profile_auth",function(e){
    profile_auth(this.name);
  });
  

  


  // $('#tabs a').click(function (e) {
  //   e.preventDefault()
  //   $(this).tab('show')
  // })





  // setPage();

  // var dialog = $("#reportDialog").dialog({
  //   autoOpen: false,
  //   height: "auto",
  //   width: 300,
  //   modal: true,
  //   buttons: {   
  //       "檢舉": function() {   
  //           report();   
  //       },   
  //       "取消": function() {   
  //           $(this).dialog("close");   
  //       }   
  //   },   
  //   close: function() {   
  //     var form=document.getElementById('reportForm');
  //     for (var i=0; i<form.reason.length; i++) {
  //       if (form.reason[i].checked) {
  //         form.reason[i].checked=false;
  //         break;
  //       }
  //     }
  //     document.getElementById('reasonInput').value="";
  //     document.getElementById('reasonInput').style.display="none";
  //   }
  // });
  
  // $('input[type=radio][name=reason]').change(function(){
  //   if(this.value=='others') {
  //     document.getElementById('reasonInput').style.display="inline";
  //   } else {
  //     document.getElementById('reasonInput').style.display="none";
  //   }
  // });
//});

// var nice;
// function setPage() {
//   var url = document.URL;
//   var regex = /.*article\/+(.*)/;
//   var article_id = url.replace(regex,"$1");

//   $.get("/checkAuth", function(auth){
//     if(auth) {
//       //document.getElementById("content").style.width = "80%";
//       document.getElementById("niceArticle").style.display="inline";
//       document.getElementById("report").style.display="inline";
//       document.getElementById("artContent").className = "span10";
//     }
   });

//   $.get("/setArticlePage/"+article_id, function(res){
//     articleList=res.articleList;
//     articleTitle=articleList[0].title;
//     articleContent=articleList[0].content;
//     board=articleList[0].board;
//     // alert(JSON.stringify(articleList[0]));
//     updateClickNum();

//     response=res.responseList;

//     regex=/(.*)T(.*)\..*/
//     createdAt=new Date(articleList[0].createdAt).toLocaleString();
//     postTime=createdAt.slice(0,createdAt.length-3);
//     lastResponseTime=new Date(articleList[0].lastResponseTime).toLocaleString();
//     updateTime=lastResponseTime.slice(0, lastResponseTime.length-3);
    
//     if ($(window).width() < 768) {
//       document.getElementById("adj_tr").innerHTML = "<td rowspan='2'><div id='articleAvatar_type' style='padding:0px'></div><div id='articleAvatar' style='padding:0px'></div><td id='articleTitle' colspan='2'></td></td><td></td> <td></td> <td ></td>";
//       var ava_height = "50px";
//       var adj_td="";
//       var adj_border="border-right:solid 1px rgba(102, 141, 60, 0.4)";
//     }else{
//       document.getElementById("adj_tr").innerHTML = "<td id='articleAvatar_type' rowspan='2' style='width:50px;'></td><td id='articleAvatar' rowspan='2' style='width:50px;'></td><td id='articleTitle' colspan='3'></td><td></td> <td></td> <td ></td>";
//       var ava_height = "70px";
//       var adj_td="<td valign='bottom' style='padding:0px 0px 7px 0px; border-right:solid 1px rgba(102, 141, 60, 0.4);'>更新時間："+updateTime+"</td>";
//       var adj_border="";
//     }


//     if(articleList[0].author.type=="S") {
//       document.getElementById("articleAvatar_type").innerHTML = "<img style='padding:5px 0px 0px 8px;display: inline-block;height:"+ava_height+";' src='/images/img_forum/sw_icon.png' title='已認證社工師'>";
//       document.getElementById("articleAvatar").innerHTML = "<img style='padding:5px 0px 0px 8px;display: inline-block;height:"+ava_height+";' src='"+articleList[0].author.img+"'>";
//       articleData="<td valign='bottom' style='padding:0px 0px 7px 20px;'>發表人："+articleList[0].author.alias+"&nbsp社工師</td><td valign='bottom' style='padding:0px 0px 7px 0px;"+adj_border+"'>發表時間："+postTime+"</td>"+adj_td;
//     } else if(articleList[0].author.type=="D") {
//       document.getElementById("articleAvatar_type").innerHTML = "<img style='padding:5px 0px 0px 8px; display: inline-block;height:"+ava_height+";' src='/images/img_forum/doctor_icon.png' title='已認證醫師'>";
//       document.getElementById("articleAvatar").innerHTML = "<img style='padding:5px 0px 0px 8px;display: inline-block;height:"+ava_height+";' src='"+articleList[0].author.img+"'>";
//       articleData="<td valign='bottom' style='padding:0px 0px 7px 20px;'>發表人："+articleList[0].author.alias+"&nbsp醫師</td><td valign='bottom' style='padding:0px 0px 7px 0px;"+adj_border+"'>發表時間："+postTime+"</td>"+adj_td;
//     } else if(articleList[0].author.type=="P") {
//       document.getElementById("articleAvatar_type").innerHTML = "<img style='padding:5px 0px 0px 8px;display: inline-block;height:"+ava_height+";' src='/images/img_forum/user_icon.png' title='病友'>";
//       document.getElementById("articleAvatar").innerHTML = "<img style='padding:5px 0px 0px 8px;display: inline-block;height:"+ava_height+";' src='"+articleList[0].author.img+"'>";
//       articleData="<td valign='bottom' style='padding:0px 0px 7px 20px;'>發表人："+articleList[0].author.alias+"</td><td valign='bottom' style='padding:0px 0px 7px 0px;"+adj_border+"'>發表時間："+postTime+"</td>"+adj_td;
//     } else if(articleList[0].author.type=="F") {
//       document.getElementById("articleAvatar_type").innerHTML = "<img style='padding:5px 0px 0px 8px;display: inline-block;height:"+ava_height+";' src='/images/img_forum/user_icon.png' title='家屬'>";
//       document.getElementById("articleAvatar").innerHTML = "<img style='padding:5px 0px 0px 8px;display: inline-block;height:"+ava_height+";' src='"+articleList[0].author.img+"'>";
//       articleData="<td valign='botnicetom' style='padding:0px 0px 7px 20px;'>發表人："+articleList[0].author.alias+"</td><td valign='bottom' style='padding:0px 0px 7px 0px;"+adj_border+"'>發表時間："+postTime+"</td>"+adj_td;
//     } else {
//       document.getElementById("articleAvatar_type").innerHTML = "<img style='padding:5px 0px 0px 8px;display: inline-block;height:"+ava_height+";' src='/images/img_forum/user_icon.png' title='一般民眾'>";
//       document.getElementById("articleAvatar").innerHTML = "<img style='padding:5px 0px 0px 8px;display: inline-block;height:"+ava_height+";' src='"+articleList[0].author.img+"'>";
//       articleData="<td valign='bottom' style='padding:0px 0px 7px 20px;'>發表人："+articleList[0].author.alias+"</td><td valign='bottom' style='padding:0px 0px 7px 0px;"+adj_border+"'>發表時間："+postTime+"</td>"+adj_td;
//     }


//     document.getElementById("articleTitle").innerHTML = articleTitle;
//     document.getElementById("articleData").innerHTML = articleData;
//     document.getElementById("articleContent").innerHTML = articleContent;

//     if(document.getElementById("postContent_image").innerHTML.indexOf("images")>-1)
//     {
//       // 插入 HR
//       var orinode = document.getElementById("articleContent"); // 找到插入圖片的DIV
//       var range = document.createRange(); // 設定插入圖片時的range function
//       range.setStart(orinode, 0); // 設定range起始點
//       var node = range.createContextualFragment("<hr id='hr'>"); // 欲插入之element
//       orinode.insertBefore(node, document.getElementById("postContent_image"));
//     }
    

//     responseContext="";
//     if(response.length!=0) {
//       for(i=0; i<response.length; i++) {
//         commentTime=new Date(response[i].createdAt).toLocaleString();

//         switch(response[i].author.type){
//           case "D":
//             var type_avatar_img = "src='/images/img_forum/doctor_icon.png' title='已認證醫師'";
//             var user_type = "醫師";
//           break;
//           case "S":
//             var type_avatar_img = "src='/images/img_forum/sw_icon.png' title='已認證社工師'";
//             var user_type = "社工師";
//           break;
//           case "P":
//             var type_avatar_img = "src='/images/img_forum/user_icon.png' title='病友'";
//             var user_type = "";
//           break;
//           case "F":
//             var type_avatar_img = "src='/images/img_forum/user_icon.png' title='家屬'";
//             var user_type = "";
//           break;
//           default:
//             var type_avatar_img = "src='/images/img_forum/user_icon.png' title='一般民眾'";
//             var user_type = "";
//           break;
//         }

//         //var type_avatar = "<td valign=top rowspan=4 style='padding:26px 5px 0px 0px;'><img "+type_avatar_img+" style='height:70px;'></td>";

//         // 預先處理comment中的圖片
//         var pre_comment_image = response[i].comment_image;
//         pre_comment_image = pre_comment_image.replace(/dummy href=/g, "a href=");
//         pre_comment_image = pre_comment_image.replace(/\/dummy/g, "\/a");


//         if ($(window).width() < 768) {
//           var type_avatar = "<tr><td valign=top rowspan='4'><div style='padding:5px; margin-top:20px;'><img "+type_avatar_img+" style='height:40px;'></div>";
//           responseContext += type_avatar+"<div style='padding:5px;'><img src='"+response[i].author.img+"' style='height:40px; width:40px;'></div></td></tr>";
//         }else{
//           var type_avatar = "<td valign=top rowspan=4 style='padding:26px 5px 0px 0px;'><img "+type_avatar_img+" style='height:70px;'></td>";
//           responseContext += "<tr>"+type_avatar+"<td valign=top rowspan=4 style='padding:26px 5px 0px 0px;'><img src='"+response[i].author.img+"' style='height:70px; width:70px;'></td>";
//         }

//         //responseContext += "<tr>"+type_avatar+"<td valign=top rowspan=4 style='padding:26px 5px 0px 0px;'><img src='"+response[i].author.img+"' style='height:70px; width:70px;'></td>";
//         responseContext += "<tr><td style='padding:20px 0px 0px 10px;width: 100%;'><label style='color:rgba(102, 141, 60, 0.9);'>"+commentTime+"</label></td></tr>";
//         if(response[i].comment.trim()==""){ // 沒有文字 => 只有圖片
//           responseContext += "<tr><td style='padding:0px 0px 5px 10px;'><label style='font-weight:bold; color:#000079;'>"+response[i].author.alias+" "+user_type+"&nbsp</label><label style='word-break: break-all;width: 100%;'>"+pre_comment_image+"</label></td></tr>";
//         }else if(pre_comment_image.indexOf("images")==-1){ // 沒有圖片 => 只有文字
//           responseContext += "<tr><td style='padding:0px 0px 5px 10px;'><label style='font-weight:bold; color:#000079;'>"+response[i].author.alias+" "+user_type+"&nbsp</label><label style='word-break: break-all;width: 100%;'>"+response[i].comment+"</label></td></tr>";
//         }else{ // 有文字、圖片
//           responseContext += "<tr><td style='padding:0px 0px 5px 10px;'><label style='font-weight:bold; color:#000079;'>"+response[i].author.alias+" "+user_type+"&nbsp</label><label style='word-break: break-all;width: 100%;'>"+response[i].comment+"<br><hr id='hr'>"+pre_comment_image+"</label></td></tr>";
//         }
//         if(res.login) {
//           if(res.responseNice[i]) {
//             responseContext += "<tr><td style='padding:3px 0px 0px 10px;'><div id='response"+response[i].id+"'><button style='margin-right:10px;' value='收回' class='n' onclick='notNiceResponse("+response[i].id+");'><img style='width:24px; height:24px;' src='/images/img_forum/good2_icon.png'/>&nbsp收回</button>有&nbsp<label id=N_res_nice"+response[i].id+">"+res.responseNiceCount[i]+"</label>&nbsp人推薦</div></td></tr>";
//           } else {
//             responseContext += "<tr><td style='padding:3px 0px 0px 10px;'><div id='response"+response[i].id+"'><button style='margin-right:10px;' value='推薦' class='n' onclick='niceResponse("+response[i].id+");'><img src='/images/img_forum/good_icon.png'/>&nbsp推薦</button>有&nbsp<label  id=N_res_nice"+response[i].id+">"+res.responseNiceCount[i]+"</label>&nbsp人推薦</div></td></tr>";
//           } 
//         }else{
//           responseContext += "<tr></tr>";
//         }
//       }
//       document.getElementById("commentList").innerHTML = responseContext;
//       document.getElementById("commentList").style.display = "block";
//     }

//     // 圖片跳窗，使用 modalBox.js
//     $('.show-image a').click(function(event){
//       event.preventDefault();
//       if ($(window).width() < 768) {
//         window.open($(this).attr("href"),'_blank');
//       }else{
//         //var ss = '<img src="'+$(this).attr("href")+'">';
//         var ss = '<a href="'+$(this).attr("href")+'" target="_blank"><img src="'+$(this).attr("href")+'"></a>';
//         $( ".modalBox" ).empty();
//         $( ".modalBox" ).append(ss);
//         $('.modalBox').modalBox('open');
//       }
//     });

//     if(res.isAuthor) {
//       document.getElementById("editArticle").style.display = "inline";
//       document.getElementById("deleteArticle").style.display = "inline";
//       document.getElementById("mobile_editArticle").style.display = "inline";
//       document.getElementById("mobile_deleteArticle").style.display = "inline";
//     }
//     if(res.isNice) {
//       document.getElementById("niceArticle").innerHTML = "<button value='收回' class='n' onclick='cancelNice();'><img style='width:24px; height:24px;' src='/images/img_forum/good2_icon.png'/>&nbsp收回</button>";
//       document.getElementById("niceCount").innerHTML = "有 "+res.lnicer+" 人推薦";
//     } else {
//       document.getElementById("niceArticle").innerHTML = "<button value='推薦' class='n' onclick='clickNice();'><img src='/images/img_forum/good_icon.png'/>&nbsp推薦</button>";
//       document.getElementById("niceCount").innerHTML = "有 "+res.lnicer+" 人推薦";
//     }
//     if(res.isReport) {
//       document.getElementById("report").innerHTML = "<button value='收回' class='n' onclick='cancelReport()'><img style='width:24px; height:24px;' src='/images/img_forum/bad2_icon.png'/>&nbsp收回</button>";
//       document.getElementById("reportCount").innerHTML = "有 "+res.reportCount+" 人檢舉";
//     } else {
//       document.getElementById("report").innerHTML = "<button value='檢舉' class='n' onclick='clickReport()'><img style='width:24px; height:24px;' src='/images/img_forum/bad_icon.png'/>&nbsp檢舉</button>";
//       document.getElementById("reportCount").innerHTML = "有 "+res.reportCount+" 人檢舉";
//     }

//   }).error(function(err){
//     alert(err);
//   });

// }

// function backToList() {
//   // var url=document.URL;
//   // var regex = /.*article\/+(.*)\?board=+(.*)&page=+(.*)/;
//   // var board=url.replace(regex,"$2");
//   // var page = url.replace(regex,"$3");
//   // window.location.assign("/board-"+board+"/"+page+"#all");
//   if(document.referrer.search("board")!=-1)
//     window.location.assign(document.referrer);
//   else
//     window.location.assign("/board-"+board+"/1?tab=all")
// }

// function editArticle() {
//   var url = document.URL;
//   var regex = /.*article\/+(.*)/;
//   var article_id = url.replace(regex,"$1");
//   location.assign("/editArticle/"+article_id);
// }

// function deleteArticle() {
//   var r = confirm("確定要刪除文章嗎？");
//   if (r == true) {
//     var url = document.URL;
//     var regex = /.*article\/+(.*)/;
//     var id = url.replace(regex,"$1");
//     $.post( "/deleteArticle", { id: id}, function(res){
//      alert("文章刪除成功！");
//       // window.location.replace("/board-"+board+"/1#all");
//       if(document.referrer.search("board")!=-1)
//         window.location.assign(document.referrer);
//       else
//         window.location.assign("/board-"+board+"/1?tab=all")
//     })
//     .error(function(res){
//     alert(res.responseJSON.err);
//   });} 
//   else {}
// }


function getPri(cb){
  var pri_account="";
  var pri_id="";
  $.get("/checkAuth", function(auth){
    if(auth) {
      pri_account=auth.account;
      pri_id=auth.id;
      pri_avatar=auth.img;
    }
    cb(pri_account, pri_id, pri_avatar);
  });
}

function setTimelinePage(pri_account, pri_id, pri_avatar){
  //alert(window.location.toString().split('?')[1]);
  // var regex = /profile\?(*)/gi;
  // match = regex.exec(window.location);
  // alert(match[0]);
  
  var ori_author=window.location.toString().split('?')[1];
  showProfile(ori_author);
  $.post( "/setTimelinePage/"+ori_author, {}, function(res){
    var author_avater = res["avatar"];
    var author = res["alias"];
    var author_account = res["account"];
    var timeInMs = new Date().getTime();
    for(i in res["timelinesList"]){
      var content = res["timelinesList"][i].content;
      var contentImg = res["timelinesList"][i].contentImg;
      var dif = timeInMs-Date(updatedAt);
      var updatedAt = new Date(res["timelinesList"][i].updatedAt).toLocaleString();
      var timelinesID = res["timelinesList"][i].id;
      // var responseNum = res["timelinesList"][i].responseNum;
      // var clickNum = res["timelinesList"][i].clickNum;
      var nicer = res["timelinesList"][i].nicer;
      var auth = res["timelinesList"][i].auth;
      if(!auth){
        auth="all";
      }
      

      // 預先處理每個 timeline event comment
      var append_element_comment = "";
      for(element_res of res["timelinesList"][i].response){
        var comment_author_account=element_res.account;
        var comment_author_avater=element_res.img;
        var comment_author=element_res.alias;
        var comment_content=element_res.comment;
        var comment_contentImg=element_res.comment_image;
        var comment_ID = element_res.id;
        var comment_updatedAt = new Date(element_res.updatedAt).toLocaleString();
        var comment_nicer = element_res.rnicer;
        var dif2 = (timeInMs-new Date(element_res.updatedAt).getTime())/1000;
        if(dif2 > 86400){var time=Math.round(dif2/86400)+"天前";
        }else if(dif2 > 3600){var time=Math.round(dif2/3600)+"小時前";
        }else if(dif2 > 60){var time=Math.round(dif2/60)+"分鐘前";
        }else{var time="剛剛";}

        // 預先處理 timeline event 中的圖片
        comment_contentImg = comment_contentImg.replace(/dummy href=/g, "a href=");
        comment_contentImg = comment_contentImg.replace(/\/dummy/g, "\/a");

        // 預先處理權限選單
        var comment_option = "";
        if(pri_account==comment_author_account){ // 原作者
          var comment_option = '<li><a class="comment_edit" name="'+comment_ID+'">編輯</a></li>\
                                <li><a class="comment_del" name="'+comment_ID+'">刪除</a></li>';
        }else{ // 非原作者
          var comment_option = '<li><a arget="_blank">檢舉</a></li>';
        }

        // 判斷是否為 nicer
        var innicer = $.grep(comment_nicer, function(e){ return e.id == pri_id; });
        if(innicer.length>0){ // 目前這個人是 nicer 之一
          var display_r_nice='<button class="n" name="'+comment_ID+'" id="TimelineResponseCancelNice"><img style="width:24px; height:24px;" src="/images/img_forum/good2_icon.png"/></button>';
        }else{ // 不是 nicer
          var display_r_nice='<button class="n" name="'+comment_ID+'" id="TimelineResponseNice"><img src="/images/img_forum/good_icon.png"></button>';
        } 

        // 判斷留言是否有圖
        if(comment_contentImg){
          var display_img='block';
          var css_r_content='border-bottom-left-radius: 0px;border-bottom-right-radius: 0px;';
        }else{
          var display_img='none';
          var css_r_content="";
        }
        append_element_comment = append_element_comment+'<div id="container_timeline_res container-fluid">\
                      <div id="sidebar_timeline_res">\
                        <image src="'+comment_author_avater+'" height="50" width="50">\
                      </div>\
                      <div id="content_timeline_res">\
                        <div class="event_text_r"><a href="?'+comment_author_account+'">'+comment_author+'</a> '+comment_content+'</div>\
                        <div class="row-fluid event_img" style="display:'+display_img+';">'+comment_contentImg+'</div>\
                        <div class="container-fluid container_r_edit" id="container_r_edit'+comment_ID+'">\
                          <div class="row-fluid" id="div_r_edit_content'+comment_ID+'" contenteditable="true" style="'+css_r_content+'">'+comment_content+'</div>\
                          <div class="row-fluid div_r_edit_img" id="div_r_edit_img'+comment_ID+'" style="display:block;">'+comment_contentImg+'</div>\
                          <button value="送出留言" id="editRSend" class="b" name="'+comment_ID+'"><img src="/images/img_forum/check_icon.png">送出留言</button>\
                          <button value="插入圖片" id="editRImage" class="b" name="'+comment_ID+'"><img src="/images/img_forum/images_icon.png">插入圖片</button>\
                        </div>\
                        <div class="row-fluid event_option btn-group">\
                          <div style="min-height:30px;padding-top:10px;padding-right:10px;float:left;"><a target="_blank" title="'+comment_updatedAt+'">'+time+'</a></div>\
                          <div class="btn-group" id="RniceArticle'+comment_ID+'" style="float:none;">'+display_r_nice+'</div>\
                          <div class="btn-group" style="float:none;">\
                            <button type="button" class="n" data-toggle="dropdown">\
                              <span class="glyphicon glyphicon-menu-down" style="color:black" aria-hidden="true"></span>\
                            </button>\
                            <ul class="dropdown-menu" role="menu">\
                              '+comment_option+'\
                            </ul>\
                          </div>\
                          <div class="btn-group" style="float:none;min-height:30px;padding-top:10px;padding-right:10px;" id="RniceCount'+comment_ID+'">\
                            有 '+comment_nicer.length+' 人推薦\
                          </div>\
                        </div>\
                      </div>\
                    </div>';
      }

      // 判斷本文是否有圖
      if(contentImg){
        var display_img='block';
        var css_content='border-bottom-left-radius: 0px;border-bottom-right-radius: 0px;';
      }else{
        var display_img='none';
        var css_content='';
      }

      // 預先處理權限選單
      var event_option = "";
      if(pri_account==ori_author || !ori_author){ // 原作者
        var event_edit_div = '<div class="container-fluid container_edit" id="container_edit'+timelinesID+'">\
                  <div class="row-fluid" id="div_edit_content'+timelinesID+'" contenteditable="true" style="'+css_content+'">'+content+'</div>\
                  <div class="row-fluid div_edit_img" id="div_edit_img'+timelinesID+'" style="display:block;">'+contentImg+'</div>\
                  <button value="送出留言" id="editSend" class="b" name="'+timelinesID+'"><img src="/images/img_forum/check_icon.png">送出留言</button>\
                  <button value="插入圖片" id="editImage" class="b" name="'+timelinesID+'"><img src="/images/img_forum/images_icon.png">插入圖片</button>\
                </div>';
        var event_option = '<li><a class="event_edit" name="'+timelinesID+'">編輯</a></li>\
                              <li><a class="event_del" name="'+timelinesID+'">刪除</a></li>';
        var auth_option='<div class="btn-group" style="float:none;">\
                    <button type="button" class="n" data-toggle="dropdown">\
                      <img src="/images/img_timeline/'+auth+'.png" height="20px" width="20px">\
                      &nbsp;權限\
                    </button>\
                    <ul class="dropdown-menu" role="menu">\
                     <li><a class="auth_set_all" name="'+timelinesID+'"><img src="/images/img_timeline/all.png" height="20px">&nbsp;每個人</a></li>\
                          <li><a class="auth_set_friend" name="'+timelinesID+'"><img src="/images/img_timeline/friend.png" height="20px" width="20px">&nbsp;好友</a></li>\
                          <li><a class="auth_set_doctor" name="'+timelinesID+'"><img src="/images/img_timeline/doctor.png" height="20px">&nbsp;醫生</a></li>\
                          <li><a class="auth_set_self" name="'+timelinesID+'"><img src="/images/img_timeline/self.png" height="20px">&nbsp;只有自己</a></li>\
                    </ul>\
                  </div>'
      }else{ // 非原作者
        var event_edit_div = "";
        var event_option = '<li><a target="_blank">檢舉</a></li>';
        var auth_option="";
      }

      // 預先處理 timeline event 中的圖片
      contentImg = contentImg.replace(/dummy href=/g, "a href=");
      contentImg = contentImg.replace(/\/dummy/g, "\/a");

      // 判斷是否為 nicer
      var result = $.grep(nicer, function(e){ return e.id == pri_id; });
      if(result.length>0){ // 目前這個人是 nicer 之一
        var display_nice='<button value="收回" class="n" name="'+timelinesID+'" id="TimelineCancelNice"><img style="width:24px; height:24px;" src="/images/img_forum/good2_icon.png"/>&nbsp收回</button>';
      }else{ // 不是 nicer
        var display_nice='<button value="推薦" class="n" name="'+timelinesID+'" id="TimelineNice"><img src="/images/img_forum/good_icon.png">&nbsp;推薦</button>';
      }

      var append_element ='<div class="container-fluid timeline_event" style="margin-top:30px;">\
                <div class="row-fluid event_info">\
                  <table style="width:100%;">\
                    <tr>\
                      <td rowspan="2" style="width:50px;padding-right:15px;">\
                        <image src="'+author_avater+'" height="50" width="50">\
                      </td>\
                      <td><div id="event_author_name"><a href="?'+author_account+'">'+author+'</a></div></td>\
                    </tr>\
                    <tr>\
                      <td><div id="event_time">'+updatedAt+'</div></td>\
                    </tr>\
                  </table>\
                </div>\
                '+event_edit_div+'\
                <div class="row-fluid event_text">'+content+'</div>\
                <div class="row-fluid event_img" style="display:'+display_img+';">'+contentImg+'</div>\
                <div class="row-fluid event_option btn-group">\
                  <div class="btn-group" id="niceArticle'+timelinesID+'" style="float:none;">'+display_nice+'</div>\
                  <button class="n" id="expandComment" name="'+timelinesID+'"><span class="glyphicon glyphicon-comment" style="color:black" aria-hidden="true"></span>&nbsp;展開留言</button>\
                  '+auth_option+'\
                  <div class="btn-group" style="float:none;">\
                    <button type="button" class="n" data-toggle="dropdown">\
                      <span class="glyphicon glyphicon-menu-down" style="color:black" aria-hidden="true"></span>\
                      &nbsp;其他\
                    </button>\
                    <ul class="dropdown-menu" role="menu">\
                      '+event_option+'\
                    </ul>\
                  </div>\
                </div>\
                <div class="row-fluid" id="niceCount'+timelinesID+'">\
                  有 '+nicer.length+' 人推薦\
                </div>\
                <div class="row-fluid event_commentlist" id="event_commentlist'+timelinesID+'">\
                  '+append_element_comment+'\
                </div>\
                <div class="row-fluid event_comment">\
                  <table style="width:100%;">\
                    <tr>\
                      <td style="width:50px;">\
                        <image src="'+pri_avatar+'" height="50" width="50">\
                      </td>\
                      <td style="padding:5px">\
                        <div id="timeline_comment_content'+timelinesID+'" contentEditable="true" class="edit_content"></div>\
                      </td>\
                    </tr>\
                    <tr>\
                      <td></td>\
                      <td>\
                        <button value="送出留言" name="'+timelinesID+'" id="TimelineCommentSend" class="b"><img src="/images/img_forum/check_icon.png"/>送出留言</button>\
                        <button value="插入圖片" name="'+timelinesID+'" id="TimelineImage" class="b"><img src="/images/img_forum/images_icon.png"/>插入圖片</button>\
                      </td>\
                    </tr>\
                  </table>\
                  <div contentEditable="false" class="edit_content" id="timeline_comment_image'+timelinesID+'">\
                    <div class="clear" id="comment_clear"></div>\
                  </div>\
                </div>\
              </div>';
      $( "#timeline" ).append( append_element );
      $( ".div_edit_img > .show-image" ).append( "<input class=\"delete\" type=\"button\" value=\"X\" id=\"rmimg\">" ); // 加入叉叉
      $( ".div_r_edit_img > .show-image" ).append( "<input class=\"delete\" type=\"button\" value=\"X\" id=\"rmimg\">" ); // 加入叉叉

      if(pri_account==""){ // 沒登入
        $(".event_option").css("display", "none");
        $(".event_comment").css("display", "none");
      }
    }
  })
  .error(function(res){
    //alert(JSON.stringify(res));
    alert(res.responseJSON.err);
  });
}

function profile_auth(route){
  $.get("/setProfileAuth/"+route,function(res){
    alert(res);
  })
  
}

function postTimeline(){
  if($("#timeline_post_image #rmimg")){$("#timeline_post_image .delete").remove();} // 去除叉叉紐
  if($("#timeline_post_image #comment_clear")){$("#timeline_post_image .clear").remove();} // 去除clear
  var timeline_post_content = $("#timeline_post_content").html();
  var timeline_post_image = $("#timeline_post_image").html().trim();

  if(timeline_post_content.trim()=="" & timeline_post_image.trim()==""){alert("發佈失敗！");}
  else{
    $.post( "/postTimeline", { timeline_post_content: timeline_post_content, timeline_post_image: timeline_post_image}, function(res){
      alert("發佈成功！");
      window.location.replace(document.URL);
    })
    .error(function(res){
      alert(res.responseJSON.err);
    });
  }
}
function editTimeline(id){
  $("#container_edit"+id).css("display", "block");
  $("#container_edit"+id).parent().children( ".event_text" ).css("display", "none");
  $("#container_edit"+id).parent().children( ".event_img" ).css("display", "none");
}
function editTimelineSend(id){
  if($("#div_edit_img"+id)){$("#div_edit_img"+id+" .delete").remove();} // 去除叉叉紐
  //if($("#"+spec_div_img+" #comment_clear")){$("#"+spec_div_img+" .clear").remove();} // 去除clear

  var edit_content=$("#div_edit_content"+id).html();
  var edit_img=$("#div_edit_img"+id).html();

  if(edit_content.trim()=="" & edit_img.trim()==""){alert("發佈失敗！");}
  else{
    $.post( "/editTimeline", { edit_content: edit_content, edit_img: edit_img, id: id}, function(res){
      window.location.replace(document.URL);
    })
    .error(function(res){
      alert(res.responseJSON.err);
    });
  }
}
function delTimeline(id){
  var r = confirm("確定要刪除文章嗎？");
  if (r == true) {
    $.post( "/delTimeline", { id: id }, function(res){
      alert(res);
      window.location.replace(document.URL);
    })
    .error(function(res){
      alert(res.responseJSON.err);
    });
  }
}
function Timeline_nice(id){
  $.post( "/TimelineNice", { id: id }, function(res){
    document.getElementById("niceCount"+id).innerHTML = "有 "+res.num+" 人推薦";
    document.getElementById("niceArticle"+id).innerHTML = '<button value="收回" class="n" name="'+id+'" id="TimelineCancelNice"><img style="width:24px; height:24px;" src="/images/img_forum/good2_icon.png"/>&nbsp收回</button>';
    $(document).one("click","#TimelineNice",function(e){ // 把 listener 加回去
      Timeline_nice(this.name);
    });
  })
  .error(function(res){
    alert(res.responseJSON.err);
  });
}
function Timeline_cancel_nice(id){
  $.post( "/TimelineCancelNice", { id: id }, function(res){
    document.getElementById("niceCount"+id).innerHTML = "有 "+res.num+" 人推薦";
    document.getElementById("niceArticle"+id).innerHTML = '<button value="推薦" class="n" name="'+id+'" id="TimelineNice"><img src="/images/img_forum/good_icon.png">&nbsp;推薦</button>';
    $(document).one("click","#TimelineCancelNice",function(e){ // 把 listener 加回去
      Timeline_cancel_nice(this.name);
    });
  })
  .error(function(res){
    alert(res.responseJSON.err);
  });
}
function expandComment(id){
  var status = $("#event_commentlist"+id).css("display");
  if(status=="block"){
    $("#event_commentlist"+id).css("display", "none");
    $('[id="expandComment"][name="'+id+'"]').html('<span class="glyphicon glyphicon-comment" style="color:black" aria-hidden="true"></span>&nbsp;展開留言');
  }else{
    $("#event_commentlist"+id).css("display", "block");
    $('[id="expandComment"][name="'+id+'"]').html('<span class="glyphicon glyphicon-comment" style="color:black" aria-hidden="true"></span>&nbsp;收起留言');
  }
}

function postTimeline_comment(id){
  var spec_div_content = "timeline_comment_content"+id;
  var spec_div_img = "timeline_comment_image"+id;

  if($("#"+spec_div_img+" #rmimg")){$("#"+spec_div_img+" .delete").remove();} // 去除叉叉紐
  if($("#"+spec_div_img+" #comment_clear")){$("#"+spec_div_img+" .clear").remove();} // 去除clear

  var timeline_comment_content = $("#"+spec_div_content).html();
  var timeline_comment_image = $("#"+spec_div_img).html().trim();

  if(timeline_comment_content.trim()=="" & timeline_comment_image.trim()==""){alert("發佈失敗！");}
  else{
    $.post( "/leaveCommentTimeline", { timeline_comment_content: timeline_comment_content, timeline_comment_image: timeline_comment_image, timeline_id: id}, function(res){
      //alert("發佈成功！");
      alert(res);
      window.location.replace(document.URL);
    })
    .error(function(res){
      alert(res.responseJSON.err);
    });
  }
}
function editRTimeline(id){
  $("#container_r_edit"+id).css("display", "block");
  $("#container_r_edit"+id).parent().children( ".event_text_r" ).css("display", "none");
  $("#container_r_edit"+id).parent().children( ".event_img" ).css("display", "none");
}
function editRTimelineSend(id){
  if($("#div_r_edit_img"+id)){$("#div_r_edit_img"+id+" .delete").remove();} // 去除叉叉紐
  //if($("#"+spec_div_img+" #comment_clear")){$("#"+spec_div_img+" .clear").remove();} // 去除clear

  var edit_content=$("#div_r_edit_content"+id).html();
  var edit_img=$("#div_r_edit_img"+id).html();

  if(edit_content.trim()=="" & edit_img.trim()==""){alert("發佈失敗！");}
  else{
    $.post( "/editCommentTimeline", { edit_content: edit_content, edit_img: edit_img, id: id}, function(res){
      window.location.replace(document.URL);
    })
    .error(function(res){
      alert(res.responseJSON.err);
    });
  }
}
function delTimeline_comment(id){
  var r = confirm("確定要刪除留言嗎？");
  if (r == true) {
    $.post( "/delCommentTimeline", { id: id }, function(res){
      alert(res);
      window.location.replace(document.URL);
    })
    .error(function(res){
      alert(res.responseJSON.err);
    });
  }
}
function Timeline_r_nice(id){
  $.post( "/TimelineResponseNice", { id: id }, function(res){
    document.getElementById("RniceCount"+id).innerHTML = "有 "+res.num+" 人推薦";
    document.getElementById("RniceArticle"+id).innerHTML = '<button class="n" name="'+id+'" id="TimelineResponseCancelNice"><img style="width:24px; height:24px;" src="/images/img_forum/good2_icon.png"/></button>';
    $(document).one("click","#TimelineResponseNice",function(e){ // 把 listener 加回去
      Timeline_r_nice(this.name);
    });
  })
  .error(function(res){
    alert(res.responseJSON.err);
  });
}
function Timeline_r_cancel_nice(id){
  $.post( "/TimelineResponseCancelNice", { id: id }, function(res){
    document.getElementById("RniceCount"+id).innerHTML = "有 "+res.num+" 人推薦";
    document.getElementById("RniceArticle"+id).innerHTML = '<button class="n" name="'+id+'" id="TimelineResponseNice"><img src="/images/img_forum/good_icon.png"></button>';
    $(document).one("click","#TimelineResponseCancelNice",function(e){ // 把 listener 加回去
      Timeline_r_cancel_nice(this.name);
    });
  })
  .error(function(res){
    alert(res.responseJSON.err);
  });
}

function auth_set(id,target){
  $.post("/auth_setTimeline",{id:id , target:target},function(res){
    alert(res);
  })
  .error(function(res){
    alert(res.responseJSON.err);
  });
}


//=====  LINK 
function getXMLHttp(){
  var xmlHttp
  try{
    //Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  }
  catch(e){
    //Internet Explorer
    try{
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch(e){
      try{
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch(e){
        alert("Your browser does not support AJAX!");
        return false;
      }
    }
  }
  return xmlHttp;
}

// ==== Profile 相關
function showProfile(ori_author){
  var xmlHttp = getXMLHttp();
  xmlHttp.onreadystatechange = function(){
    if(xmlHttp.readyState == 4){
      HandleResponse_showProfile(xmlHttp.responseText);
    }
  }
  if (!ori_author){
    xmlHttp.open("GET", "/showProfile",true);
  }
  else{
    var addr="/getProfile/"+ori_author;
    xmlHttp.open("GET", addr, true);
    $('.auth_btn').hide()
  }
  
  xmlHttp.send(null);
}
function HandleResponse_showProfile(response){

  obj = JSON.parse(response);

  var email=obj.email;
  var fname=obj.fname;
  var lname=obj.lname;
  var img=obj.img;
  var gender=obj.gender;
  var phone=obj.phone;
  var postalCode=obj.postalCode;
  var addressCity=obj.addressCity;
  var addressDistrict=obj.addressDistrict;
  var address=obj.address;
  var birthday = obj.birthday;
  var b = new Date(birthday)
  var Y = b.getFullYear();
  var M = b.getMonth()+1;
  var D = b.getDate();
  // var primaryDisease=obj.primaryDisease;
  // var selfIntroduction=obj.selfIntroduction;

  $('#email').text(email);
  $('#name').text(fname+lname);
  $('#avatar').attr('src',img);
  if (gender=='M'){
    gender="男";
  }
  else{
    gender="女";
  }
  $('#gender').text(gender);
  $('#phone').text(phone);
  $("#bday").text((Y-1911).toString()+" 年 "+M.toString()+" 月 "+D.toString()+" 日");
  $('#city').text(addressCity);

}

// function updateResponseNum(){
//   var url = document.URL;
//   var regex = /.*article\/+(.*)/;
//   var id = url.replace(regex,"$1");
//   var responseNum = parseInt(response.length)+1;
//   $.post( "/updateResponseNum", { id: id, responseNum: responseNum}, function(res){
//     window.location.reload(true);
//   })
//     .error(function(res){
//       alert(res.responseJSON.err);
//   });
// }

// function updateClickNum(){
//   var url = document.URL;
//   var regex = /.*article\/+(.*)/;
//   var id = url.replace(regex,"$1");
//   var clickNum=parseInt(articleList[0].clickNum)+1;
//   $.post( "/updateClickNum", { id: id, clickNum: clickNum}, function(res){
//   })
//     .error(function(res){
//       alert(res.err);
//     });
// }

// function clickNice() {
//   var url = document.URL;
//   var regex = /.*article\/+(.*)/;
//   var id = url.replace(regex,"$1");
//   document.getElementById("niceArticle").innerHTML = "<button value='收回' class='n' onclick='cancelNice();'><img style='width:24px; height:24px;'src='/images/img_forum/good2_icon.png'/>&nbsp收回</button>";
//   $.post("/clickNice", {article_id: id}, function(res){
//     document.getElementById("niceCount").innerHTML = "有 "+res.num+" 人推薦";
//   }).error(function(res){
//     alert(res.err);
//   });
// }

// function cancelNice() {
//   var url = document.URL;
//   var regex = /.*article\/+(.*)/;
//   var id = url.replace(regex,"$1");
//   document.getElementById("niceArticle").innerHTML = "<button value='推薦' class='n' onclick='clickNice()'><img src='/images/img_forum/good_icon.png'/>&nbsp推薦</button>";  
//   $.post("/cancelNice", {article_id: id}, function(res){
//     document.getElementById("niceCount").innerHTML = "有 "+res.num+" 人推薦";
//   }).error(function(res){
//     document.getElementById("niceArticle").innerHTML = "<button value='收回' class='n' onclick='cancelNice();'><img style='width:24px; height:24px;'src='/images/img_forum/good2_icon.png'/>&nbsp收回</button>"; 
//     alert(res.responseJSON.err);
//   });
// }

// function niceResponse(response_id) {
//   $.post("/niceResponse", {response_id: response_id}, function(res){
//     var N_res = "N_res_nice"+response_id;
//     var N_res_nicer = document.getElementById(N_res).innerHTML;
//     N_res_nicer = parseInt(N_res_nicer)+1;

//     document.getElementById("response"+response_id).innerHTML = "<button style='margin-right:10px;' value='收回' class='n' onclick='notNiceResponse("+response_id+");'><img style='width:24px; height:24px;' src='/images/img_forum/good2_icon.png'/>&nbsp收回</button>有&nbsp<label id=N_res_nice"+response_id+">"+N_res_nicer+"</label>&nbsp人推薦";
//   }).error(function(res){
//       alert(res.responseJSON.err);
//   });
// }

// function notNiceResponse(response_id) {
//   $.post("/notNiceResponse", {response_id: response_id}, function(res){
//     var N_res = "N_res_nice"+response_id;
//     var N_res_nicer = document.getElementById(N_res).innerHTML;
//     N_res_nicer = parseInt(N_res_nicer)-1;
//     document.getElementById("response"+response_id).innerHTML = "<button style='margin-right:10px;' value='推薦' class='n' onclick='niceResponse("+response_id+");'><img src='/images/img_forum/good_icon.png'/>&nbsp推薦</button>有&nbsp<label id=N_res_nice"+response_id+">"+N_res_nicer+"</label>&nbsp人推薦";
//   }).error(function(res){
//       alert(res.responseJSON.err);
//   });
// }

// function clickReport() {
//   $("#reportDialog").dialog("open");
// }

// function report() {
//   var form=document.getElementById('reportForm');
//   for (var i=0; i<form.reason.length; i++) {
//     if (form.reason[i].checked) {
//       var choose = form.reason[i].value;
//       break;
//     }
//   }
//   if(choose=='others') {
//     var reason=document.getElementById('reasonInput').value.trim();
//   } else {
//     var reason=choose;
//   }
//   if(!reason) {
//     alert("請選擇原因");
//   } else {
//     var url = document.URL;
//     var regex = /.*article\/+(.*)/;
//     var id = url.replace(regex,"$1");
//     document.getElementById("report").innerHTML = "<button value='收回' class='n' onclick='cancelReport();'><img style='width:24px; height:24px;' src='/images/img_forum/bad2_icon.png'/>&nbsp收回</button>";
//     $.post("/clickReport", {article_id: id, reason: reason}, function(res){
//       document.getElementById("reportCount").innerHTML = "有 "+res.num+" 人檢舉";
//       $("#reportDialog").dialog("close");
//     }).error(function(res){
//       alert(res.err);
//     });
//   }
// }

// function cancelReport() {
//   if(confirm("確定要取消檢舉嗎")) {
//     var url = document.URL;
//     var regex = /.*article\/+(.*)/;
//     var id = url.replace(regex,"$1");
//     document.getElementById("report").innerHTML = "<button value='推薦' class='n' onclick='clickReport()'><img style='width:24px; height:24px;' src='/images/img_forum/bad_icon.png'/>&nbsp檢舉</button>";  
//     $.post("/cancelReport", {article_id: id}, function(res){
//       document.getElementById("reportCount").innerHTML = "有 "+res.num+" 人檢舉";
//     }).error(function(res){
//       document.getElementById("report").innerHTML = "<button value='收回' class='n' onclick='cancelReport();'><img style='width:24px; height:24px;' src='/images/img_forum/bad2_icon.png'/>&nbsp收回</button>"; 
//       alert(res.responseJSON.err);
//     });
//   }
// }

// function editProfile(){
//   content.style.display="none";
// }

// function sendEmail(){
//   var mailaddress="";
//   $.get("/checkAuth", function(auth){
//     if(auth) {
//       $.get("/getEmail",function(res){
//         mailaddress=res;

//         alertify.set({ labels : { ok: "轉寄給其他人", cancel: "是" } });
//         alertify.confirm("是否要把這篇寄給"+mailaddress,function(e){
//           if (e){
//             alertify.set({ labels : { ok: "ok", cancel: "cancel" } });
//             mailaddress=prompt('把這封email送到：');
//             if (mailaddress.length>0){
              
//               var url = document.URL;
//               var regex = /.*article\/+(.*)/;
//               var article_id = url.replace(regex,"$1");
//               $.post("/sendEmail",{article_id: article_id,mailaddress: mailaddress,url: url},function(res){
//                 if (res == "SEND"){
//                   alertify.set({ labels : { ok: "ok", cancel: "cancel" } });
//                   alertify.alert("已經送出信件至"+mailaddress); 
//                }
//               });
//             }
//           }
//           else{
//             if (mailaddress.length>0){
//               var url = document.URL;
//               var regex = /.*article\/+(.*)/;
//               var article_id = url.replace(regex,"$1");
//               $.post("/sendEmail",{article_id: article_id,mailaddress: mailaddress,url: url},function(res){
//                 if (res == "SEND"){
//                   alertify.set({ labels : { ok: "ok", cancel: "cancel" } });
//                   alertify.alert("已經送出信件至"+mailaddress); 
//                }
//               });
//             }  
//           }
//         });
//       });
//     }
//     else{
//       mailaddress=prompt('把這封email送到：') ;
    
//       if (mailaddress.length>0){
//         var url = document.URL;
//         var regex = /.*article\/+(.*)/;
//         var article_id = url.replace(regex,"$1");
//         $.post("/sendEmail",{article_id: article_id,mailaddress: mailaddress,url: url},function(res){
//           if (res == "SEND"){
//             alert("已經送出信件至"+mailaddress); 
//           }
//         });
//       }
//     }
//   });

// }

// function shareFB(){
//   u=location.href;
//   t=document.title;
//   window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
//   return false;
// }