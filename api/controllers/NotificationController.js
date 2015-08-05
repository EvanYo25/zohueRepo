/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getNotification: function(req, res) {
        var user=req.session.user.id;
        Notification.find({user: user}).populate("from").exec(function(err, not){
        	if(err) {
        		console.log(err);
        		res.send(500, {err: "DB error"});
        	} else {
                not.sort(function(a, b){return new Date(b.createdAt)-new Date(a.createdAt);});
        		// if(not.length>=10) {
        		// 	res.send(not.slice(0, 10));
        		// } else {
        			res.send(not);
        		// }
        		
        	}
        });
    },
};

