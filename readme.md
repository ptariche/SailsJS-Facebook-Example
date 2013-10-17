Here is a basic example on how to intergrate Facebook Connect with Sails.JS

Please follow the instructions on sailsjs.org to launch SailsJS.

In order to utilize the application, please modify: config/middleware.js; change the CLIENTID and CLIENTSECRET.

Please run npm install before lifting Sails.

passport.use(new FacebookStrategy({
                clientID: "CLIENTID",
                clientSecret: "CLIENTSECRET",
                callbackURL: "http://localhost:1337/auth/facebook/callback",
                },

Sails.JS is an impressive Node.JS Framework, and I've beeb playing around with it for the last two-weeks. I hope you enjoy and utilize this framework as much as I do. 

Note: The current settings are built to use Mongo. You can change to local by changing the adapter settings.
