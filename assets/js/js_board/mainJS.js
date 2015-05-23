var allow_create;
var searched;
var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
var loaded=false;
var page;
var keyword="";
var tab="";
var maxReport=3;
var board="";
$(document).ready(function(){
  if ($("#refresh").val() == 'yes') { location.reload(true); } else { $('#refresh').val('yes'); }
  var url = document.URL;
  if(url.search("search")!=-1) {
    regex=/.*board-+(.*)+\/search\/+(.*)+\/+(.*)+\?tab=+(.*)/
    board=url.replace(regex, "$1");
    keyword=url.replace(regex, "$2");
    keyword = decodeURIComponent(keyword);
    page=url.replace(regex,"$3");
    tab=url.replace(regex, "$4")
    setPage(page, keyword, 0);
  } else {
    var regex = /.*board-+(.*)+\/+(.*)+\?tab=+(.*)/;
    board=url.replace(regex, "$1");
    page = url.replace(regex,"$2");
    tab=url.replace(regex, "$3")
    setPage(page, "", 0);
  }


  $.get("/checkAuth", function(auth){
    if(!auth) {
      document.getElementById("forumContent").className = "span7";
    }
  });

  $("#searchWord")
  .on("keyup mouseup", function(){
    try{
      if($("#searchWord").val().trim()!=""){
        $("#search").css("background-color", "rgba(232, 81, 0, 0.7)");
      }else{$("#search").css("background-color", "rgba(102, 141, 60, 0.4)");}
        
      if (!this.lastChild || this.lastChild.nodeName.toLowerCase() != "br") {
        this.appendChild(document.createChild("br"));
      }
    }catch(err){}
  });

  // $(".tabs li a").click(function(){
  //   window.location.reload();
  // });
  $("#tabs li a").click(function(){
    window.location.reload();
  });

  document.getElementById("boardCategory").onchange=function() {
    $.get("/getBoardsOfCategory/"+$("#boardCategory").val(), function(boards) {
      var boardSelect=document.getElementById("board");
      while(boardSelect.length>0) {
        boardSelect.remove(0);
      }
      var inCate=false;
      for(var i=0; i<boards.length; i++) {
        var option=document.createElement('option');
        option.text=boards[i].title;
        option.value=boards[i].id;
        if(boards[i].id==board) {
          option.selected=true;
          inCate=true;
        }
        try {
          boardSelect.add(option, null);
        } catch(ex) {
          //for IE
          boardSelect.add(option);
        }
      }
      if(!inCate) {
        var option=document.createElement('option');
        option.text="請選擇";
        option.value="";
        option.disabled=true;
        option.selected=true;
        try {
          boardSelect.add(option, 0);
        } catch(ex) {
          //for IE
          boardSelect.add(option);
        }
      }
    });
  };
  document.getElementById("board").onchange=function() {
    if($("#board").val()!=board)
      window.location.assign("/board-"+$("#board").val()+"/1?tab=all");
  };
});

function setPage(page, keyword, sort) {
  // 篩選頁籤
  switch (tab) {
    case "all":
      $("#all").addClass("active");
      break;
    case "motion":
      $("#motion").addClass("active");
      break;
    case "share":
      $("#share").addClass("active");
      break;
    case "problem":
      $("#problem").addClass("active");
      break;
    case "others":
      $("#others").addClass("active");
      break;
  }
  // 獲得文章
  if(keyword!="") {
    document.getElementById("searchWord").value = keyword;
    $.post( "/searchArticle/"+tab, { keyword: keyword, board: board}, function(res){
      var boardName=res.board.title;
      var boardCate=res.board.category.title;
      document.getElementById('title').innerHTML=boardCate+"-"+boardName;

      var res_search=res.articlesList
      temp_result=res_search;
      if(res_search.length==0){
        $("#cancleSearch").css("background-color", "rgba(232, 81, 0, 0.7)");
        alert("查無資料！");
      }else{
        setSearchResult(res_search);

        $("#cancleSearch").css("background-color", "rgba(232, 81, 0, 0.7)");
      }
    }).error(function(res_search){
      alert("not found");
    });
  } else {
    $.get("/setBoardPage/"+board+"/"+tab, function(res){

      var articleList=res.articlesList;
      var boardName=res.board.title;
      var boardCate=res.board.category.title;
      document.getElementById('title').innerHTML="癌病友論壇-"+boardCate+"-"+boardName;
      res.boardCate.sort(function(a, b) {
        return a.id-b.id;
      });
      var cateSelect=document.getElementById('boardCategory');
      for(var i=0; i<res.boardCate.length; i++) {
        var option=document.createElement('option');
        option.text=res.boardCate[i].title;
        option.value=res.boardCate[i].id;
        if(res.board.category.id==res.boardCate[i].id)
          option.selected=true;
        try {
          cateSelect.add(option, null);
        } catch(ex) {
          //for IE
          cateSelect.add(option);
        }
      }
      res.boards.sort(function(a, b) {
        return a.id-b.id;
      });
      var boardSelect=document.getElementById('board');
      for(var i=0; i<res.boards.length; i++) {
        var option=document.createElement('option');
        option.text=res.boards[i].title;
        option.value=res.boards[i].id;
        if(board==res.boards[i].id)
          option.selected=true;
        try {
          boardSelect.add(option, null);
        } catch(ex) {
          //for IE
          boardSelect.add(option);
        }
      }
      test="";
      for(i=0; i<articleList.length; i++) {
        test+=articleList[i].title;
        test+=articleList[i].updatedAt;
      }

      if(sort==0) {
        articleList.sort(function(a, b) {
          return new Date(b.lastResponseTime)-new Date(a.lastResponseTime);
        });
      } else if (sort==1) {
        articleList.sort(function(a, b) {
          return new Date(b.createdAt)-new Date(a.createdAt);
        });
      }

      myTable="<tr style='background-color: #1D3521; color:white;'>";
      myTable+="<td style='width:10%; padding:10px 15px 10px 15px; text-align:center;'>文章類別</td>";
      myTable+="<td style='width:35%; padding:10px 15px 10px 15px;'>文章標題</td>";
      myTable+="<td style='text-align:center;'>發表人/發表時間</td>";
      myTable+="<td style='text-align:center;'>點閱/回覆</td>";
      myTable+="<td style='text-align:center;'>推薦</td>";
      myTable+="<td style='text-align:center;'>最新回應時間</td></tr>";



      articleNum=20;

      lastPageArticlesNum=articleList.length%articleNum;
      pageNum=(articleList.length-lastPageArticlesNum)/articleNum;
      if(lastPageArticlesNum!=0) {
        pageNum+=1;
      }
      pageContext="<tr><td>頁次：</td>"
      for(i=1; i<=pageNum; i++) {
        if(i!=page) {
          pageContext+="<td><label><a href='/board-"+board+"/"+i+"?tab="+tab+"'>"+i+"</a></label></td>";
        } else {
          pageContext+="<td>"+i+"</td>"
        }
      }
      pageContext+="</tr>"
      document.getElementById("page").innerHTML = pageContext;
      document.getElementById("pageDown").innerHTML = pageContext;

      if(articleList.length%20==0){
        pageNum=articleList.length/20+1;
      }

      if(page!=pageNum) {
        for(i=0; i<articleNum; i++) {
          clickNum=articleList[i+articleNum*(page-1)].clickNum;
          responseNum=articleList[i+articleNum*(page-1)].responseNum;
          niceNum=articleList[i+articleNum*(page-1)].nicer.length;
          lastTime=new Date(articleList[i+articleNum*(page-1)].lastResponseTime).toLocaleString();
          lastResponseTime=lastTime.slice(0, lastTime.length-3);

          createdAt=new Date(articleList[i].createdAt).toLocaleString();
          postTime=createdAt.slice(0,createdAt.length-3);

          /* 判斷發表人類別，決定稱謂與代表圖像 */
          authorType="";
          if(articleList[i].author.type=="D"){
            authorType="&nbsp醫師";
            authorIcon="<img src='/images/img_forum/doctor_icon.png' title='已認證醫師' style='margin-right:10px; height:50px; width:50px;'>";
          }else if(articleList[i].author.type=="S"){
            authorType="&nbsp社工師";
            authorIcon="<img src='/images/img_forum/sw_icon.png' title='已認證社工師' style='margin-right:10px; height:50px; width:50px;'>";
          }else if(articleList[i].author.type=="RN"){
            authorType="&nbsp護理師";
            authorIcon="<img src='/images/img_forum/sw_icon.png' title='已認證護理師' style='margin-right:10px; height:50px; width:50px;'>";
          }else if(articleList[i].author.type=="P"){
            authorIcon="<img src='/images/img_forum/user_icon.png' title='病友' style='margin-right:10px; height:50px; width:50px;'>";
          }else if(articleList[i].author.type=="F"){
            authorIcon="<img src='/images/img_forum/user_icon.png' title='家屬' style='margin-right:10px; height:50px; width:50px;'>";
          }else{
            authorIcon="<img src='/images/img_forum/user_icon.png' title='一般民眾' style='margin-right:10px; height:50px; width:50px;'>";
          }

          if(articleList[i+articleNum*(page-1)].report) {
            if(articleList[i+articleNum*(page-1)].report.length>=maxReport) {
              var link="onClick='readConfirm("+articleList[i+articleNum*(page-1)].id+");'";
              var color="color:grey;";
              var linkcolor="color:grey;";
              var badPic='<img src="/images/img_forum/bad3_icon.png" title="這篇文章被檢舉三次以上了喔!" style="margin-right:5px; height:30px; width:30px;">'
            } else {
              var link="href=\"/article/"+articleList[i+articleNum*(page-1)].id+"\"";
              var color="";
              var linkcolor="color:#000079;";
              var badPic="";
            }
          } else {
            var link="href=\"/article/"+articleList[i+articleNum*(page-1)].id+"\"";
            var color="";
            var linkcolor="color:#000079;";
            var badPic="";
          }

          if(i%2==0){
            myTable+="<tr onMouseOver=this.style.backgroundColor='rgba(" + [102,141,60,0.2].join(',') + ")'; onMouseOut=this.style.backgroundColor='rgba(" + [102,141,60,0.5].join(',') + ")'; style='background-color: rgba(102, 141, 60, 0.5);"+color+"'><td style='width:10%; padding:10px 0px 10px 0px; text-align:center;'>"+badPic+articleList[i+articleNum*(page-1)].classification+"</td>";
            myTable+="<td style='width:35%; padding:10px 15px 10px 15px;'><a "+link+" style='text-decoration:none;"+linkcolor+"text-decoration:underline;'>"+articleList[i+articleNum*(page-1)].title+"</a></td>";
            
            myTable+="<td><table><tr><td rowspan=2 style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+authorIcon+"<img src='"+articleList[i+articleNum*(page-1)].author.img+"' style='margin-right:10px; height:50px; width:50px;'></td>";
            myTable+="<td>"+"<a href='/profile?"+articleList[i+articleNum*(page-1)].author.alias+"'>"+articleList[i+articleNum*(page-1)].author.alias+"</a>"+authorType+"</td></tr>";
            myTable+="<tr><td>"+postTime+"</td></tr></table></td>";

            myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+clickNum+"/"+responseNum+"</td>";
            myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+niceNum+"&nbsp<img style='width:24px; height:24px;' src='/images/img_forum/good2_icon.png'/></td>";
            myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+lastResponseTime+"</td></tr>"; 
           
          }else{
            myTable+="<tr onMouseOver=this.style.backgroundColor='rgba(" + [102,141,60,0.2].join(',') + ")'; onMouseOut=this.style.backgroundColor='rgba(" + [102,141,60,0.3].join(',') + ")'; style='background-color: rgba(102, 141, 60, 0.3);"+color+"'><td style='width:10%; padding:10px 0px 10px 0px; text-align:center;'>"+badPic+articleList[i+articleNum*(page-1)].classification+"</td>";
            myTable+="<td style='width:35%; padding:10px 15px 10px 15px;'><a "+link+" style='text-decoration:none;"+linkcolor+"text-decoration:underline;'>"+articleList[i+articleNum*(page-1)].title+"</a></td>";
            myTable+="<td><table><tr><td rowspan=2 style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+authorIcon+"<img src='"+articleList[i+articleNum*(page-1)].author.img+"' style='margin-right:10px; height:50px; width:50px;'></td>";
            myTable+="<td>"+"<a href='/profile?"+articleList[i+articleNum*(page-1)].author.alias+"'>"+articleList[i+articleNum*(page-1)].author.alias+"</a>"+authorType+"</td></tr>";
            myTable+="<tr><td>"+postTime+"</td></tr></table></td>";

            myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+clickNum+"/"+responseNum+"</td>";
            myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+niceNum+"&nbsp<img style='width:24px; height:24px;' src='/images/img_forum/good2_icon.png'/></td>";
            myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+lastResponseTime+"</td></tr>";
          }
        }
      }
      else {

        for(i=0; i<lastPageArticlesNum; i++) {
          clickNum=articleList[i+articleNum*(page-1)].clickNum;
          responseNum=articleList[i+articleNum*(page-1)].responseNum;
          niceNum=articleList[i+articleNum*(page-1)].nicer.length;
          updateTime=new Date(articleList[i+articleNum*(page-1)].lastResponseTime).toLocaleString();
          lastResponseTime=updateTime.slice(0, updateTime.length-3);
          createdAt=new Date(articleList[i].createdAt).toLocaleString();

          postTime=createdAt.slice(0,createdAt.length-3);

          /* 判斷發表人類別，決定稱謂與代表圖像 */
          authorType="";
          if(articleList[i].author.type=="D"){
            authorType="&nbsp醫師";
            authorIcon="<img src='/images/img_forum/doctor_icon.png' title='已認證醫師' style='margin-right:10px; height:50px; width:50px;'>";
          }else if(articleList[i].author.type=="S"){
            authorType="&nbsp社工師";
            authorIcon="<img src='/images/img_forum/sw_icon.png' title='已認證社工師' style='margin-right:10px; height:50px; width:50px;'>";
          }else if(articleList[i].author.type=="RN"){
            authorType="&nbsp護理師";
            authorIcon="<img src='/images/img_forum/sw_icon.png' title='已認證護理師' style='margin-right:10px; height:50px; width:50px;'>";
          }else if(articleList[i].author.type=="P"){
            authorIcon="<img src='/images/img_forum/user_icon.png' title='病友' style='margin-right:10px; height:50px; width:50px;'>";
          }else if(articleList[i].author.type=="F"){
            authorIcon="<img src='/images/img_forum/user_icon.png' title='家屬' style='margin-right:10px; height:50px; width:50px;'>";
          }else{
            authorIcon="<img src='/images/img_forum/user_icon.png' title='一般民眾' style='margin-right:10px; height:50px; width:50px;'>";
          }
          if(articleList[i+articleNum*(page-1)].report) {
            if(articleList[i+articleNum*(page-1)].report.length>=maxReport) {
              var link="onClick='readConfirm("+articleList[i+articleNum*(page-1)].id+");'";
              var color="color:grey;";
              var linkcolor="color:grey;";
              var badPic='<img src="/images/img_forum/bad3_icon.png" title="這篇文章被檢舉三次以上了喔!" style="margin-right:5px; height:30px; width:30px;">'
            } else {
              var link="href=\"/article/"+articleList[i+articleNum*(page-1)].id+"\"";
              var color="";
              var linkcolor="color:#000079;";
              var badPic="";
            }
          } else {
            var link="href=\"/article/"+articleList[i+articleNum*(page-1)].id+"\"";
            var color="";
            var linkcolor="color:#000079;";
            var badPic="";
          }
          if(i%2==0){
            myTable+="<tr onMouseOver=this.style.backgroundColor='rgba(" + [102,141,60,0.2].join(',') + ")'; onMouseOut=this.style.backgroundColor='rgba(" + [102,141,60,0.5].join(',') + ")'; style='background-color: rgba(102, 141, 60, 0.5);"+color+"'><td style='width:10%; padding:10px 0px 10px 0px; text-align:center;'>"+badPic+articleList[i+articleNum*(page-1)].classification+"</td>";
            myTable+="<td style='width:35%; padding:10px 15px 10px 15px;'><a "+link+" style='cursor: pointer; text-decoration:none;"+linkcolor+"text-decoration:underline;'>"+articleList[i+articleNum*(page-1)].title+"</a></td>";
            
            myTable+="<td><table><tr><td rowspan=2 style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+authorIcon+"<img src='"+articleList[i+articleNum*(page-1)].author.img+"' style='margin-right:10px; height:50px; width:50px;'></td>";
            myTable+="<td>"+"<a href='/profile?"+articleList[i+articleNum*(page-1)].author.alias+"'>"+articleList[i+articleNum*(page-1)].author.alias+"</a>"+authorType+"</td></tr>";
            myTable+="<tr><td style=''>"+postTime+"</td></tr></table></td>";


            myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+articleList[i+articleNum*(page-1)].clickNum+"/"+articleList[i+articleNum*(page-1)].responseNum+"</td>";
            myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+niceNum+"&nbsp<img style='width:24px; height:24px;' src='/images/img_forum/good2_icon.png'/></td>";
            myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+lastResponseTime+"</td></tr>";
          }else{
            myTable+="<tr onMouseOver=this.style.backgroundColor='rgba(" + [102,141,60,0.2].join(',') + ")'; onMouseOut=this.style.backgroundColor='rgba(" + [102,141,60,0.3].join(',') + ")'; style='background-color: rgba(102, 141, 60, 0.3);"+color+"'><td style='width:10%; padding:10px 0px 10px 0px; text-align:center;'>"+badPic+articleList[i+articleNum*(page-1)].classification+"</td>";
            myTable+="<td style='width:35%; padding:10px 15px 10px 15px;'><a "+link+" style='cursor: pointer; text-decoration:none;"+linkcolor+"text-decoration:underline; '>"+articleList[i+articleNum*(page-1)].title+"</a></td>";
            myTable+="<td><table><tr><td rowspan=2 style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+authorIcon+"<img src='"+articleList[i+articleNum*(page-1)].author.img+"' style='margin-right:10px; height:50px; width:50px;'></td>";
            myTable+="<td>"+"<a href='/profile?"+articleList[i+articleNum*(page-1)].author.alias+"'>"+articleList[i+articleNum*(page-1)].author.alias+"</a>"+authorType+"</td></tr>";
            myTable+="<tr><td>"+postTime+"</td></tr></table></td>";

            myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+articleList[i+articleNum*(page-1)].clickNum+"/"+articleList[i+articleNum*(page-1)].responseNum+"</td>";
            myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+niceNum+"&nbsp<img style='width:24px; height:24px;' src='/images/img_forum/good2_icon.png'/></td>";
            myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+lastResponseTime+"</td></tr>";
          }
        }
      } 

      document.getElementById("articleList").innerHTML = myTable;
    }).error(function(res){
      alert(res.responseJSON.err);
    });
  }  
}

function readConfirm(articleid){
  if(confirm("這篇文章已經被檢舉超過三次以上囉！確定要觀看嗎？")){
    window.location = "/article/"+articleid;
  }
}

function postArticle() {
  location.assign("/post/"+board);
}

function check(){
  allow_create = 1;
  if($("#UserAlias").val() == ""){
    $("label[id = checkAlias]").text("  *這裡也要填喔！");allow_create = 0;
  }else{$("label[id = checkAlias]").text("");}

  if($("#UserAccount").val() == ""){
    $("label[id = checkAccount]").text("  *這裡也要填喔！");allow_create = 0;
  }else{$("label[id = checkAccount]").text("");}

  if($("#UserPwd").val() == ""){
    $("label[id = checkPwd]").text("  *這裡也要填喔！");allow_create = 0;
  }else{$("label[id = checkPwd]").text("");}

  if($("#UserPwdConfirm").val() == ""){
    $("label[id = checkPwdConfirm]").text("  *這裡也要填喔！");allow_create = 0;
  }else{$("label[id = checkPwdConfirm]").text("");}

  if(allow_create==1 && $("#UserEmail").val() != "") {
    checkEmail();
  }
  if(allow_create==1) {
    checkPwd();
  }

  if(allow_create==1){
    Submit();
  }
}

function searchArticle() {
  var searchWord = document.getElementById('searchWord');
  var search = document.getElementById('search');
  var keyword = searchWord.value.replace(/^s*|s*$/g, '');
  searched = 1;

  if($("#searchWord").val().replace(/^\s+$/m,'') == ""){
    alert("搜尋不能搜空白唷！");
  }
  else{
    window.location.assign("/board-"+board+"/search/"+keyword+"/1?tab="+tab);
  }
}

function cancleSearch(){
  
  document.getElementById("searchWord").value = "";
  window.location.assign("/board-"+board+"/1?tab="+tab);
  
}


function setSearchResult(articleList){

    articleList.sort(function(a, b) {
      return new Date(b.lastResponseTime)-new Date(a.lastResponseTime);
    });
    var url = document.URL;
    regex=/.*search\/+(.*)+\/+(.*)\?tab=+(.*)/
    var keyword=url.replace(regex, "$1");
    var page=url.replace(regex,"$2");

    myTable="<tr style='background-color: #1D3521; color:white;'>"
    myTable+="<td style='width:10%; padding:10px 15px 10px 15px; text-align:center;'>文章類別</td>"
    myTable+="<td style='width:35%; padding:10px 15px 10px 15px;'>文章標題</td>"
    myTable+="<td style='text-align:center;'>發表人/發表時間</td>";
    myTable+="<td style='text-align:center;'>點閱/回覆</td>";
    myTable+="<td style='text-align:center;'>推薦</td>";
    myTable+="<td style='text-align:center;'>最新回應時間</td></tr>";

    articleNum=20;

    lastPageArticlesNum=articleList.length%articleNum;
    pageNum=(articleList.length-lastPageArticlesNum)/articleNum;
    if(lastPageArticlesNum!=0) {
      pageNum+=1;
    }
    pageContext="<tr><td>頁次：</td>";
    for(i=1; i<=pageNum; i++) {
      if(i!=page) {
        pageContext+="<td><label><a href='/board-"+board+"/search/"+keyword+"/"+i+"?tab="+tab+"'>"+i+"</a></label></td>";
      } else {
        pageContext+="<td>"+i+"</td>";
      }
    }
    pageContext+="</tr>"
    document.getElementById("page").innerHTML = pageContext;
    document.getElementById("pageDown").innerHTML = pageContext;

    if(articleList.length%20==0){
      pageNum=articleList.length/20+1;
    }
    if(page!=pageNum) {
      for(i=0; i<articleNum; i++) {
        clickNum=articleList[i+articleNum*(page-1)].clickNum;
        responseNum=articleList[i+articleNum*(page-1)].responseNum;
        niceNum=articleList[i+articleNum*(page-1)].nicer.length;

        lastTime=new Date(articleList[i+articleNum*(page-1)].lastResponseTime).toLocaleString();
        lastResponseTime=lastTime.slice(0, lastTime.length-3);
        
        createdAt=new Date(articleList[i].createdAt).toLocaleString();
        postTime=createdAt.slice(0,createdAt.length-3);

        /* 判斷發表人類別，決定稱謂與代表圖像 */
        authorType="";
        if(articleList[i].author.type=="D"){
          authorType="&nbsp醫師";
          authorIcon="<img src='/images/img_forum/doctor_icon.png' title='已認證醫師' style='margin-right:10px; height:50px; width:50px;'>";
        }else if(articleList[i].author.type=="S"){
          authorType="&nbsp社工師";
          authorIcon="<img src='/images/img_forum/sw_icon.png' title='已認證社工師' style='margin-right:10px; height:50px; width:50px;'>";
        }else if(articleList[i].author.type=="RN"){
          authorType="&nbsp護理師";
          authorIcon="<img src='/images/img_forum/sw_icon.png' title='已認證護理師' style='margin-right:10px; height:50px; width:50px;'>";
        }else if(articleList[i].author.type=="P"){
          authorIcon="<img src='/images/img_forum/user_icon.png' title='病友' style='margin-right:10px; height:50px; width:50px;'>";
        }else if(articleList[i].author.type=="F"){
          authorIcon="<img src='/images/img_forum/user_icon.png' title='家屬' style='margin-right:10px; height:50px; width:50px;'>";
        }else{
          authorIcon="<img src='/images/img_forum/user_icon.png' title='一般民眾' style='margin-right:10px; height:50px; width:50px;'>";
        }

        if(i%2==0){
          myTable+="<tr onMouseOver=this.style.backgroundColor='rgba(" + [102,141,60,0.2].join(',') + ")'; onMouseOut=this.style.backgroundColor='rgba(" + [102,141,60,0.5].join(',') + ")'; style='background-color: rgba(102, 141, 60, 0.5);'><td style='width:10%; padding:10px 0px 10px 0px; text-align:center;'>"+articleList[i+articleNum*(page-1)].classification+"</td>";
          myTable+="<td style='width:35%; padding:10px 15px 10px 15px;'><a href=\"/article/"+articleList[i+articleNum*(page-1)].id+"\" style='text-decoration:none; color:#000079;text-decoration:underline;'>"+articleList[i+articleNum*(page-1)].title+"</a></td>";
  
          myTable+="<td><table><tr><td rowspan=2 style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+authorIcon+"<label style='display: inline-block;height:50px;width:50px;background-image:url("+articleList[i+articleNum*(page-1)].author.img+");background-size: 50px 50px;'></label></td>";
          myTable+="<td>"+"<a href='/profile?"+articleList[i+articleNum*(page-1)].author.alias+"'>"+articleList[i+articleNum*(page-1)].author.alias+"</a>"+authorType+"</td></tr>";
          myTable+="<tr><td>"+postTime+"</td></tr></table></td>";

          myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+clickNum+"/"+responseNum+"</td>";
          myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+niceNum+"&nbsp<img style='width:24px; height:24px;' src='/images/img_forum/good2_icon.png'/></td>";
          myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+lastResponseTime+"</td></tr>"; 
         
        }else{
          myTable+="<tr onMouseOver=this.style.backgroundColor='rgba(" + [102,141,60,0.2].join(',') + ")'; onMouseOut=this.style.backgroundColor='rgba(" + [102,141,60,0.3].join(',') + ")'; style='background-color: rgba(102, 141, 60, 0.3);'><td style='width:10%; padding:10px 0px 10px 0px; text-align:center;'>"+articleList[i+articleNum*(page-1)].classification+"</td>";
          myTable+="<td style='width:35%; padding:10px 15px 10px 15px;'><a href=\"/article/"+articleList[i+articleNum*(page-1)].id+"\" style='text-decoration:none; color:#000079;text-decoration:underline;'>"+articleList[i+articleNum*(page-1)].title+"</a></td>";
          
          myTable+="<td><table><tr><td rowspan=2 style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+authorIcon+"<label style='display: inline-block;height:50px;width:50px;background-image:url("+articleList[i+articleNum*(page-1)].author.img+");background-size: 50px 50px;'></label></td>";
          myTable+="<td>"+"<a href='/profile?"+articleList[i+articleNum*(page-1)].author.alias+"'>"+articleList[i+articleNum*(page-1)].author.alias+"</a>"+authorType+"</td></tr>";
          myTable+="<tr><td>"+postTime+"</td></tr></table></td>";

          myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+clickNum+"/"+responseNum+"</td>";
          myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+niceNum+"&nbsp<img style='width:24px; height:24px;' src='/images/img_forum/good2_icon.png'/></td>";
          myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+lastResponseTime+"</td></tr>";
        }
      }
    }
    else {

      for(i=0; i<lastPageArticlesNum; i++) {

        clickNum=articleList[i+articleNum*(page-1)].clickNum;
        responseNum=articleList[i+articleNum*(page-1)].responseNum;
        niceNum=articleList[i+articleNum*(page-1)].nicer.length;

        updateTime=new Date(articleList[i+articleNum*(page-1)].lastResponseTime).toLocaleString();
        lastResponseTime=updateTime.slice(0, updateTime.length-3);


        createdAt=new Date(articleList[i].createdAt).toLocaleString();
        postTime=createdAt.slice(0,createdAt.length-3);

        /* 判斷發表人類別，決定稱謂與代表圖像 */
        authorType="";
        if(articleList[i].author.type=="D"){
          authorType="&nbsp醫師";
          authorIcon="<img src='/images/img_forum/doctor_icon.png' title='已認證醫師' style='margin-right:10px; height:50px; width:50px;'>";
        }else if(articleList[i].author.type=="S"){
          authorType="&nbsp社工師";
          authorIcon="<img src='/images/img_forum/sw_icon.png' title='已認證社工師' style='margin-right:10px; height:50px; width:50px;'>";
        }else if(articleList[i].author.type=="RN"){
          authorType="&nbsp護理師";
          authorIcon="<img src='/images/img_forum/sw_icon.png' title='已認證護理師' style='margin-right:10px; height:50px; width:50px;'>";
        }else if(articleList[i].author.type=="P"){
          authorIcon="<img src='/images/img_forum/user_icon.png' title='病友' style='margin-right:10px; height:50px; width:50px;'>";
        }else if(articleList[i].author.type=="F"){
          authorIcon="<img src='/images/img_forum/user_icon.png' title='家屬' style='margin-right:10px; height:50px; width:50px;'>";
        }else{
          authorIcon="<img src='/images/img_forum/user_icon.png' title='一般民眾' style='margin-right:10px; height:50px; width:50px;'>";
        }

        if(i%2==0){
          myTable+="<tr onMouseOver=this.style.backgroundColor='rgba(" + [102,141,60,0.2].join(',') + ")'; onMouseOut=this.style.backgroundColor='rgba(" + [102,141,60,0.5].join(',') + ")'; style='background-color: rgba(102, 141, 60, 0.5);'><td style='width:10%; padding:10px 0px 10px 0px; text-align:center;'>"+articleList[i+articleNum*(page-1)].classification+"</td>";
          myTable+="<td style='width:35%; padding:10px 15px 10px 15px;'><a href=\"/article/"+articleList[i+articleNum*(page-1)].id+"\" style='text-decoration:none; color:#000079;text-decoration:underline;'>"+articleList[i+articleNum*(page-1)].title+"</a></td>";

          myTable+="<td><table><tr><td rowspan=2 style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+authorIcon+"<label style='display: inline-block;height:50px;width:50px;background-image:url("+articleList[i+articleNum*(page-1)].author.img+");background-size: 50px 50px;'></label></td>";
          myTable+="<td>"+"<a href='/profile?"+articleList[i+articleNum*(page-1)].author.alias+"'>"+articleList[i+articleNum*(page-1)].author.alias+"</a>"+authorType+"</td></tr>";
          myTable+="<tr><td>"+postTime+"</td></tr></table></td>";

          myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+articleList[i+articleNum*(page-1)].clickNum+"/"+articleList[i+articleNum*(page-1)].responseNum+"</td>";
          myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+niceNum+"&nbsp<img style='width:24px; height:24px;' src='/images/img_forum/good2_icon.png'/></td>";
          myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+lastResponseTime+"</td></tr>";
        }else{
          myTable+="<tr onMouseOver=this.style.backgroundColor='rgba(" + [102,141,60,0.2].join(',') + ")'; onMouseOut=this.style.backgroundColor='rgba(" + [102,141,60,0.3].join(',') + ")'; style='background-color: rgba(102, 141, 60, 0.3);'><td style='width:10%; padding:10px 0px 10px 0px; text-align:center;'>"+articleList[i+articleNum*(page-1)].classification+"</td>";
          myTable+="<td style='width:35%; padding:10px 15px 10px 15px;'><a href=\"/article/"+articleList[i+articleNum*(page-1)].id+"\" style='text-decoration:none; color:#000079;text-decoration:underline;'>"+articleList[i+articleNum*(page-1)].title+"</a></td>";
          myTable+="<td><table><tr><td rowspan=2 style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+authorIcon+"<label style='display: inline-block;height:50px;width:50px;background-image:url("+articleList[i+articleNum*(page-1)].author.img+");background-size: 50px 50px;'></label></td>";
          myTable+="<td>"+"<a href='/profile?"+articleList[i+articleNum*(page-1)].author.alias+"'>"+articleList[i+articleNum*(page-1)].author.alias+"</a>"+authorType+"</td></tr>";
          myTable+="<tr><td>"+postTime+"</td></tr></table></td>";

          myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+articleList[i+articleNum*(page-1)].clickNum+"/"+articleList[i+articleNum*(page-1)].responseNum+"</td>";
          myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+niceNum+"&nbsp<img style='width:24px; height:24px;' src='/images/img_forum/good2_icon.png'/></td>";
          myTable+="<td style='width:0%; padding:10px 15px 10px 15px; text-align:center;'>"+lastResponseTime+"</td></tr>";
        }
      }
    } 

    document.getElementById("articleList").innerHTML = myTable;
}

function enterSearch(e) {
  var keynum;
  if(window.event) {
    keynum = e.keyCode;
  } else if(e.which) {
    keynum = e.which;
  }
  if(keynum=="13") {
    searchArticle();
  }
}