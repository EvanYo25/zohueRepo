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
  'POST /delTimeline': 'TimelinesController.delTimeline',
  'POST /setTimelinePage/:account': 'Timelines.setTimelinePage',
  'POST /leaveCommentTimeline': 'TimelineResponseController.leaveCommentTimeline',
  'POST /delCommentTimeline': 'TimelineResponseController.delCommentTimeline',
  'POST /updateResponseNumTimeline': 'TimelineResponseController.updateResponseNumTimeline',
  'POST /subscribe': 'SubscribeEmailController.subscribe',
  'POST /searchAlias': 'User.searchAlias',
  'POST /sendNewsLetter' : 'SubscribeEmailController.sendNewsLetter',

  'GET /setFriendPage': 'User.setFriendPage',
  'GET /checkAuth': 'SessionController.checkAuth',
  'GET /checkFull': 'User.checkFull',
  'GET /getEmail' : 'User.getEmail',
  'GET /setBoardPage/:board/:tab': 'Articles.setBoardPage',
  'GET /setArticlePage/:article_id': 'Articles.setArticlePage',
  'GET /setProInfoPage': 'ProInfo.setProInfoPage',
  'GET /getBoardsOfCategory/:category': 'Boards.getBoardsOfCategory',
  'GET /showProfile':'User.showProfile',
  'GET /getProfile/:account':'User.getProfile',
  'GET /article/*': {
    view: 'article/index'
  },

  'GET /profile': {
    view: 'profile/index'
  },

  'GET /editArticle/*': {
    view: 'editArticle/index'
  },

  'get /signup': {
    view: 'signup/index'
  },

  '/home': {
    view: 'home/index',
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
    view: 'backend/index'
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
