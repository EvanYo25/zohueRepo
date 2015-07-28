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
  'POST /fullSignup': 'UserController.fullSignup',
  'POST /change': 'UserController.change',
  'POST /ez_change': 'UserController.ez_change',
  'POST /login': 'UserController.login',
  'POST /logout': 'UserController.logout',
  'POST /changePassword': 'UserController.changePassword',
  'POST /postArticle': 'ArticlesController.postArticle',
  'POST /changeArticle': 'ArticlesController.changeArticle',
  'POST /deleteArticle': 'ArticlesController.deleteArticle',
  'POST /leaveComment': 'ResponseController.leaveComment',
  'POST /updateResponseNum': 'ResponseController.updateResponseNum',
  'POST /updateClickNum': 'ArticlesController.updateClickNum',
  'POST /clickNice': 'ArticlesController.clickNice',
  'POST /cancelNice': 'ArticlesController.cancelNice',
  'POST /clickReport': 'ArticlesController.clickReport',
  'POST /cancelReport': 'ArticlesController.cancelReport',
  'POST /niceResponse': 'ArticlesController.niceResponse',
  'POST /notNiceResponse': 'ArticlesController.notNiceResponse',
  'POST /searchArticle/:tab': 'ArticlesController.searchArticle',
  'POST /searchProInfo': 'ProInfoController.searchProInfo',
  'POST /imgupload_avatar': 'ImguploadController.upload_avatar',
  'POST /imgupload_post': 'ImguploadController.upload_post',
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
  'POST /setTimelinePage/:account': 'Timelines.setTimelinePage',
  'POST /TimelineNice': 'Timelines.clickNice',
  'POST /TimelineCancelNice': 'Timelines.cancelNice',
  'POST /leaveCommentTimeline': 'TimelineResponseController.leaveCommentTimeline',
  'POST /editCommentTimeline': 'TimelineResponseController.editCommentTimeline',
  'POST /delCommentTimeline': 'TimelineResponseController.delCommentTimeline',
  'POST /TimelineResponseNice': 'TimelineResponseController.clickNice',
  'POST /TimelineResponseCancelNice': 'TimelineResponseController.cancelNice',
  'POST /TimelineReport': 'TimelineReport.clickReport',
  'POST /TimelineCancelReport': 'TimelineReport.cancelReport',
  //'POST /TimelineResponseReport': 'ArticlesController.clickReport',
  'POST /TimelineResponseReport': 'TimelineResponseReport.clickReport',
  'POST /TimelineResponseCancelReport': 'TimelineResponseReport.cancelReport',

  'POST /subscribe': 'SubscribeEmailController.subscribe',
  'POST /searchFriends': 'User.searchFriends',
  'POST /sendNewsLetter' : 'SubscribeEmailController.sendNewsLetter',
  'POST /deleteFile' : 'SubscribeEmailController.deleteFile',
  'POST /auth_setTimeline':'Timelines.auth_set',
  'POST /deleteSubscriber': 'SubscribeEmailController.deleteSubscriber',
  'POST /fileUpload': 'SubscribeEmailController.upload',
  'POST /createAdmin': 'BackendController.createAdmin',
  'POST /adminLogin': 'BackendController.adminLogin',
  
  'GET /authCheck/:account': 'UserAuth.authCheck',   //檢查兩個人的關係
  'GET /checkAuth': 'SessionController.checkAuth',   //檢查有沒有登入
  'GET /checkFull': 'User.checkFull',
  'GET /getEmail' : 'User.getEmail',
  'GET /setBoardPage/:board/:tab': 'Articles.setBoardPage',
  'GET /getArticles/:board': 'Backend.getArticles',
  'GET /getArticlesByBoards': 'Backend.getArticlesByBoards',
  'GET /getArticlesByCategory/:category': 'Backend.getArticlesByCategory',
  'GET /setArticlePage/:article_id': 'Articles.setArticlePage',
  'GET /setProInfoPage': 'ProInfo.setProInfoPage',
  'GET /getBoardsOfCategory/:category': 'Boards.getBoardsOfCategory',
  'GET /showProfile':'User.showProfile',
  'GET /getProfile/:account':'User.getProfile',
  'GET /getAllUsers':'User.getAllUsers',
  'GET /getAllSubscribers':'SubscribeEmail.getAllSubscribers',
  'GET /setProfileAuth/:item/:status' : 'UserAuth.authSet',
  'GET /Auth_data':'UserAuth.authGet',
  'GET /getBoardCategory': 'BoardCategory.getBoardCategory',
  'GET /checkAdmin': 'Backend.checkAdmin',
  'GET /article/*': {
    view: 'article/index'
  },

  'GET /profile': {
    view: 'profile/index',
    locals: {
      scripts: [
        '/js/js_public/modalBox.js-master/modalBox-min.js',
        '/js/js_public/alertify.js',
        '/js/js_profile/mainJS.js',
        '/js/js_post/cropper.min.js',
        '/js/js_profile/crop-avatar.js?ver=1'
      ],
      stylesheets: [
        '/styles/css_profile/style.css',
        '/styles/css_post/crop-avatar.css',
        '/styles/css_post/cropper.min.css',
        '/styles/importer.css',
        '/styles/css_public/themes/alertify.core.css',
        '/styles/css_public/themes/alertify.default.css'
      ]
    }
  },

  'GET /editArticle/*': {
    view: 'editArticle/index'
  },

  'get /signup': {
    view: 'signup/index'
  },

  '/home': {
    view: 'home/index',
    locals: {
      scripts: [
        '/js/js_home/mainJS.js'
      ],
      stylesheets: [
        '/styles/css_home/style.css',
        '/styles/importer.css'],
      welcome: '歡迎光臨'
    }
  },

  '/changePassword': {
    view: 'changePassword/index',
  },

  '/change': {
    view: 'change/index'
  },

  '/forum': {
    view: 'forum/index'
  },

  '/proInfo/*': {
    view: 'proInfo/index'
  },
  'GET /proInfodestroyAll': 'ProInfo.destroyAll',
  'GET /proInfoCreateFromCSV': 'ProInfo.createProinfo',

  '/post/*': {
    view: 'post/index'
  },

  '/article/:id': {
    view: 'article/index'
  },
  '/board-*': {
    view: 'board/index'
  },
  '/friends': {
    view: 'friends/index'
  },
  '/backend': {
    //view: 'backend/adminLoginPage',
    controller: 'backend'
  },
  // '/backend': {
  //   //view: 'backend/index',
  //   controller: 'backend'
  // },


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
