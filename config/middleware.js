var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy,
    bcrypt = require('bcrypt');


var verifyHandler = function (accessToken, refreshToken, profile, done) {
   
    process.nextTick(function () {
        User.findOne({uid: profile.id}).done(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                User.create({
	            token: accessToken,
                    provider: profile.provider,
                    uid: profile.id,
	            created: new Date().getTime(),
                    name: {
			first: profile.name.givenName, 
			last: profile.name.familyName
			},
	            username: profile._json.username,
		    facebookLink: profile._json.link,
		    birthday: profile._json.birthday,
		    gender: profile.gender,
		    email: profile._json.email,
	            currentLocation: profile._json.location,
	            politicalViews: profile._json.political,
	            religion: profile._json.religion,
		    bio: profile._json.bio,
		    education: profile._json.education,
		    updated: profile._json.updated_time,
		    alerts: {
			email: true,
			mobile: false,
			features: true
			}
			
                }).done(function (err, user) {
                        return done(err, user);
                    });
            }
        });
    });
};

passport.serializeUser(function (user, done) {
    done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {
    User.findOne({uid: uid}).done(function (err, user) {
        done(err, user)
    });
});


module.exports = {

    // Init custom express middleware
    express: {
        customMiddleware: function (app) {
	console.log('Express Middleware -- Start Facebook Passport Strategy');
            passport.use(new FacebookStrategy({
                clientID: "CLIENTID",
       	        clientSecret: "CLIENTSECRET",
        	callbackURL: "http://localhost:1337/auth/facebook/callback",
                },
                verifyHandler
            ));

            app.use(passport.initialize());
            app.use(passport.session());
        }
    }

};
