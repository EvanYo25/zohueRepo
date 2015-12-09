/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'POST /simpleSignup': 'UserController.signup',
  'POST /simpleSignupAccountCheck': 'UserController.signupAccountCheck',
  'POST /fullSignup': 'UserController.fullSignup',
  'POST /change': 'UserController.change',
  'POST /ez_change': 'UserController.ez_change',
  'POST /login': 'UserController.login',
  'POST /logout': 'UserController.logout',
  'POST /changePassword': 'UserController.changePassword',
  'POST /postArticle': 'ArticlesController.postArticle',
  'POST /syncArticleToTimeline': 'ArticlesController.syncArticleToTimeline',
  'POST /changeArticle': 'ArticlesController.changeArticle',
  'POST /deleteArticle': 'ArticlesController.deleteArticle',
  'POST /setEliteArticle': 'ArticlesController.setEliteArticle',
  'POST /cancelEliteArticle': 'ArticlesController.cancelEliteArticle',
  'POST /leaveComment': 'ResponseController.leaveComment',
  'POST /updateClickNum': 'ArticlesController.updateClickNum',
  'POST /clickNice': 'ArticlesController.clickNice',
  'POST /cancelNice': 'ArticlesController.cancelNice',
  'POST /clickReport': 'ArticlesController.clickReport',
  'POST /cancelReport': 'ArticlesController.cancelReport',
  'POST /niceResponse': 'ArticlesController.niceResponse',
  'POST /notNiceResponse': 'ArticlesController.notNiceResponse',
  'POST /searchArticle/:tab': 'ArticlesController.searchArticle',
  'POST /searchArticleFront/:tab': 'ArticlesController.searchArticleFront',
  'POST /searchProInfo': 'ProInfoController.searchProInfo',
  'POST /imgupload_avatar': 'ImguploadController.upload_avatar',
  'POST /imgupload_post': 'ImguploadController.upload_post',
  'POST /imgupload_homepagePic': 'HomeController.upload_homepagePic', /*還沒寫完by chien*/
  'POST /sendEmail' : 'ArticlesController.mailAritlce',
  'POST /checkFB' : 'User.checkFB',
  'POST /removeBlack': 'User.removeBlack',
  'POST /addFriend': 'User.addFriend',
  'POST /addBlack' : 'User.addBlack',
  'POST /confirmFriend': 'User.confirmFriend',
  'POST /removeFriend': 'User.removeFriend',
  'POST /removeAddFriend': 'User.removeAddFriend',

  'POST /postTimeline': 'TimelinesController.postTimeline',
  'POST /editTimeline': 'TimelinesController.editTimeline',
  'POST /delTimeline': 'TimelinesController.delTimeline',
  // 'POST /setTimelinePage/:id': 'Timelines.setTimelinePage',
  'POST /TimelineNice': 'Timelines.clickNice',
  'POST /TimelineCancelNice': 'Timelines.cancelNice',
  'POST /leaveCommentTimeline': 'TimelineResponseController.leaveCommentTimeline',
  'POST /editCommentTimeline': 'TimelineResponseController.editCommentTimeline',
  'POST /delCommentTimeline': 'TimelineResponseController.delCommentTimeline',
  'POST /TimelineResponseNice': 'TimelineResponseController.clickNice',
  'POST /TimelineResponseCancelNice': 'TimelineResponseController.cancelNice',
  'POST /TimelineReport': 'TimelineReport.clickReport',
  'POST /TimelineCancelReport': 'TimelineReport.cancelReport',
  'POST /recordProInfo':'ProInfoController.recordProInfo',
  
  //'POST /TimelineResponseReport': 'ArticlesController.clickReport',
  'POST /changeProInfo':'ProInfoController.changeProInfo',
  'POST /TimelineResponseReport': 'TimelineResponseReport.clickReport',
  'POST /TimelineResponseCancelReport': 'TimelineResponseReport.cancelReport',
  'POST /subscribe': 'SubscribeEmailController.subscribe',
  'POST /searchFriends': 'User.searchFriends',
  'POST /sendNewsLetter' : 'SubscribeEmailController.sendNewsLetter',
  'POST /deleteFile' : 'SubscribeEmailController.deleteFile',
  'POST /auth_setTimeline':'Timelines.auth_set',
  'POST /deleteSubscriber': 'SubscribeEmailController.deleteSubscriber',
  'POST /fileUpload': 'SubscribeEmailController.upload',
  'POST /adminLogout': 'BackendController.adminLogout',
  'POST /recoverArticle': 'BackendController.recoverArticle',
  'POST /forgetAnswer' : 'UserController.forgetA',
  'POST /setRead': 'NotificationController.checkNotification',
  'POST /getQ':'UserController.getQ', 
  'POST /getPassword':'UserController.getPassword',
  'POST /suspendUser': 'BackendController.suspendUser',
  'POST /recoverUser': 'BackendController.recoverUser',
  'POST /changeFollow': 'ArticlesController.changeFollow',
  'POST /appeal': 'BackendController.appeal',
  'POST /proInfoSubmit':'BackendController.proInfoSubmit',
  'POST /backendEditArticle':'BackendController.backendEditArticle',
  'POST /deleteHomepagePic': 'HomeController.deleteHomepagePic',
  'POST /addHomepagePic': 'HomeController.addHomepagePic',
  'POST /setTopArticleFormula': 'HomeController.setTopArticleFormula',
  'GET /getTopArticleFormula': 'HomeController.getTopArticleFormula',

  'GET /recordLink/:target':'HomeController.recordLink',
  'GET /deletetProInfo/:id' : 'ProInfoController.deletetProInfo',
  'GET /recordDownload':'BackendController.recordDownload',
  'GET /getAnnouncement': 'Home.getAnnouncement',
  'GET /getTopArticles': 'Home.getTopArticles',
  'GET /getHomepagePic': 'HomeController.getHomepagePic',
  'GET /getRecord/:num':'Backend.getRecord',
  'GET /friendStatus/:target_id' : 'User.friendStatus',
  'GET /authCheck/:id': 'UserAuth.authCheck',   //檢查兩個人的關係
  'GET /checkAuth': 'SessionController.checkAuth',   //檢查有沒有登入
  'GET /checkFull': 'User.checkFull',
  'GET /getEmail' : 'User.getEmail',
  'GET /setBoardFrontPage/:tab': 'Articles.setBoardFrontPage',
  'GET /setBoardPage/:board/:tab': 'Articles.setBoardPage',
  'GET /getArticles/:board': 'Backend.getArticles',
  'GET /getArticlesByBoards': 'Backend.getArticlesByBoards',
  'GET /getArticlesByArticleId': 'BackendController.getArticlesByArticleId',
  'GET /getArticlesByCategory/:category': 'Backend.getArticlesByCategory',
  //'GET /setArticlePage/:article_id': 'Articles.setArticlePage',
  'GET /setProInfoPage': 'ProInfo.setProInfoPage',
  'GET /getBoardsOfCategory/:category': 'Boards.getBoardsOfCategory',
  'GET /getCategoryOfBoard/:board': 'Boards.getCategoryOfBoard',
  'GET /showProfile':'User.showProfile',
  'GET /getProfile/:id':'User.getProfile',
  'GET /getProInfo/:id':'ProInfoController.getProInfo',
  'GET /getAllUsers':'Backend.getAllUsers',
  'GET /getAllSubscribers':'SubscribeEmail.getAllSubscribers',
  'GET /setProfileAuth/:item/:status' : 'UserAuth.authSet',
  'GET /Auth_data':'UserAuth.authGet',
  'GET /getBoardCategory': 'BoardCategory.getBoardCategory',
  'GET /checkAdmin': 'Backend.checkAdmin',
  'GET /getAllSuspendReason': 'Backend.getAllSuspendReason',
  'GET /getSuspendReason': 'Backend.getSuspendReason',
  'GET /countForum': 'Articles.countForum',
  'GET /updateLastForumTime': 'User.updateLastForumTime',

  'GET /profile': {
    controller: 'TimelinesController',
    action: 'setProfilePage',
    skipAssets: true
  },

  'GET /editArticle/*': {
    view: 'editArticle/index',
    locals: {
      scripts: [
        '/js/js_editArticle/mainJS.js',
        '/js/js_post/cropper.min.js',
        '/js/js_editArticle/crop-avatar.js'
      ],
      stylesheets: [
        '/styles/css_editArticle/style.css',
        '/styles/css_post/crop-avatar.css',
        '/styles/css_post/cropper.min.css',
        '/styles/importer.css'
      ]
    }
  },

  'get /signup': {
    view: 'signup/index',
    locals: {
      scripts: [
        'js/js_post/cropper.min.js',
        'js/js_signup/crop-avatar.js',
        'js/js_signup/joinus.js'
      ],
      stylesheets: [
        'styles/css_post/crop-avatar.css',
        'styles/css_post/cropper.min.css',
        'styles/css_signup/style_signup.css'
      ]
    }
  },

  'GET /nots': 'Notification.getNotification',
  'GET /countNot': 'Notification.countNotification',
  // '/seeNot':{
  //   controller: 'NotificationController',
  //   action: 'setNotificationPage',
  //   skipAssets: true,
  // },


  '/home': {
    controller: 'HomeController',
    action: 'getHomepagePic',
    skipAssets: true,
  },


  '/changePassword': {
    view: 'changePassword/index',
    locals: {
      scripts: [
        '/js/js_changePassword/mainJS.js'
      ],
      stylesheets: [
        '/styles/css_changePassword/style.css',
        '/styles/importer.css'
      ]
    }
  },

  '/change': {
    view: 'change/index',
    locals: {
      scripts: [
        'js/js_post/cropper.min.js',
        'js/js_change/crop-avatar.js',
        'js/js_change/joinus.js'
      ],
      stylesheets: [
        'styles/css_post/crop-avatar.css',
        'styles/css_post/cropper.min.css',
        'styles/css_change/style_signup.css'
      ]
    }
  },

  '/forum': {
    view: 'forum/index',
    locals: {
      scripts: [
      ],
      stylesheets: [
        '/styles/importer.css'
      ]
    }
  },

  '/proInfo/:page': {
    controller:'ProInfoController',
    action: 'setPage',
    skipAssets:true
    // view: 'proInfo/index',
    // locals: {
    //   scripts: [
    //     '/js/js_public/modalBox.js-master/modalBox-min.js',
    //     '/js/js_ProInfo/mainJS.js',
    //   ],
    //   stylesheets: [
    //     '/styles/css_ProInfo/style.css',
    //     '/styles/importer.css'
    //   ]
    // }
  },
  'GET /proInfodestroyAll': 'ProInfo.destroyAll',
  'GET /proInfoCreateFromCSV': 'ProInfo.createProinfo',
  'GET /article/:article_id': {
    controller: 'ArticlesController',
    action: 'setArticlePage',
    skipAssets: true
  },
  'GET /article/:id': {
    controller: 'ArticlesController',
    action: 'setMeta',
    skipAssets: true
  },
  'GET /post/:board': {
    controller: 'SessionController',
    action: 'checkPostAuth',
    skipAssets: true
  },
  '/getPassword/*':{
    view: 'forget/getPassword',
    locals:{
      scripts:[
      '/js/js_forget/forget.js'
      ],
      stylesheets:[
        '/styles/css_forget/style.css',
        '/styles/importer.css'
      ]
    }
  },
  '/board-:board': {
    controller: 'ArticlesController',
    action: 'setBoardPage',
    skipAssets: true
  },
  '/frontboard/*': {
    view: 'frontboard/index',
    locals: {
      scripts: [
        '/js/js_frontboard/mainJS.js'
      ],
      stylesheets: [
        '/styles/css_frontboard/style.css',
        '/styles/importer.css'
      ]
    }
  },
  '/friends': {
    view: 'friends/index',
    locals: {
      scripts: [
        '/js/js_public/modalBox.js-master/modalBox-min.js',
        '/js/js_public/alertify.js',
        '/js/js_friends/mainJS.js'
      ],
      stylesheets: [
        '/styles/importer.css',
        '/styles/css_public/themes/alertify.core.css',
        '/styles/css_public/themes/alertify.default.css',
        '/styles/css_friends/style.css'
      ]
    }
  },
  '/notifications': {
    controller: 'NotificationController',
    action: 'setNotificationPage',
    skipAssets: true,
  },
  '/backendbackend': {
    //view: 'backend/adminLoginPage',
    controller: 'backend',
    locals: {
      scripts: [
      ],
      stylesheets: [
      ]
    }
  },
  '/forget':{
    view:'forget/index',
    locals:{
      scripts:[
        '/js/js_forget/mainJS.js'
      ],
      stylesheets:[
        '/styles/css_forget/style.css',
        '/styles/importer.css'
      ]
    }
  },
  '/gettingStarted':{
    view:'gettingStarted/index',
    locals:{
      scripts: [
      ],
      stylesheets:[
        '/styles/css_gettingStarted/style.css',
        '/styles/importer.css'
      ]
    }
  },

  '/': '/home'





  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
