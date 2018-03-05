(function(controllers) {
    var plaidControlelr = require("./plaidController");

    controllers.init = function(app) {
        plaidControlelr.init(app);
    };
})(module.exports);