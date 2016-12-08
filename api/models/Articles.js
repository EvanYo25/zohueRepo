/**
* Articles.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    author: {
      model: 'user',
      required: true
    },
    content: {
      type: 'string',
      required: true
    },
    classification: {
      type: 'string',
      required: true
    },
    response: {
      collection: 'response',
      via: 'article'
    },
    clickNum: {
      type: 'string',
      required: true
    },
    nicer: {
      collection: 'user'
    },
    report: {
      collection: 'report',
      via: 'article'
    },
    lastResponseTime: {
      type: 'datetime'
    }, 
    board: {
      model: 'boards'
    },
    deleted: {
      type: 'string',
      defaultsTo : 'false'
    },
    follower: {
      collection: 'user',
    },
    elite: {
      type: 'string',
      //defaulsTo: "0"
    }
  }
};

