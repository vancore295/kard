(function(plaidController) {
    var path = require("path");
    var dotenv = require("dotenv");
    var plaid = require('plaid');

    var PLAID_CLIENT_ID = (process.env.PLAID_CLIENT_ID);
    var PLAID_SECRET = (process.env.PLAID_SECRET);
    var PLAID_PUBLIC_KEY = (process.env.PLAID_PUBLIC_KEY);
    var PLAID_ENV = (process.env.PLAID_ENV);

    // We store the access_token in memory - in production, store it in a secure
    // persistent data store
    var ACCESS_TOKEN = null;
    var PUBLIC_TOKEN = null;
    var ITEM_ID = null;

    // Initialize the Plaid client
    var client = new plaid.Client(
        PLAID_CLIENT_ID,
        PLAID_SECRET,
        PLAID_PUBLIC_KEY,
        plaid.environments[PLAID_ENV]
    );



    plaidController.init = function(app) {
        // Get the public token
        app.get("/api/plaid/get_public_token", function(req, res) {
            res.status(200).json({
                PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
                PLAID_ENV: PLAID_ENV,
            });
        });

        // Get the access token
        app.post('/api/plaid/get_access_token', function(request, response, next) {
            PUBLIC_TOKEN = request.body.public_token;
            client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
                if (error !== null) {
                    var msg = 'Could not exchange public_token!';
                    console.log(msg + '\n' + error);
                    return response.json({ error: msg });
                }
                ACCESS_TOKEN = tokenResponse.access_token;
                ITEM_ID = tokenResponse.item_id;
                console.log('Access Token: ' + ACCESS_TOKEN);
                console.log('Item ID: ' + ITEM_ID);
                response.json({ 
                    access_token: ACCESS_TOKEN,
                    item_id: ITEM_ID,
                    'error': false });
            });
        });

        // Get plaid authentication
        app.post('/api/plaid/accounts', function(req, res, next) {
            // Retrieve Auth information for the Item, which includes high-level
            // account information and account numbers for depository auth.
            console.log(req.body.access_token);
            ACCESS_TOKEN = req.body.access_token;
            client.getAuth(ACCESS_TOKEN, function(error, numbersData) {
                if (error !== null) {
                    var msg = 'Unable to pull accounts from Plaid API.';
                    console.log(msg + '\n' + error);
                    return res.json({ error: msg });
                }
                res.json({
                    error: false,
                    accounts: numbersData.accounts,
                    numbers: numbersData.numbers,
                });
            });
        });

        // Get transasction history
        app.get('/api/plaid/transactions', function(request, response, next) {
            // Pull transactions for the Item for the last 30 days
            var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
            var endDate = moment().format('YYYY-MM-DD');
            client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
                count: 250,
                offset: 0,
            }, function(error, transactionsResponse) {
                if (error !== null) {
                    console.log(JSON.stringify(error));
                    return response.json({ error: error });
                }
                console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');
                response.json(transactionsResponse);
            });
        });
    };
})(module.exports);