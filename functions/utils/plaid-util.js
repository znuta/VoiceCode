const {getSecret} = require("./secret-manager-util");
const { Configuration, PlaidApi, Products, PlaidEnvironments} = require('plaid');

exports.getPlaidClient = async () => {
    const PLAID_CREDS = await getSecret('plaid-creds', process.env.ENV)

    const configuration = new Configuration({
        basePath: PlaidEnvironments[process.env.PLAID_ENV],
        baseOptions: {
            headers: {
                'PLAID-CLIENT-ID': PLAID_CREDS[0],
                'PLAID-SECRET': PLAID_CREDS[1],
                'Plaid-Version': '2020-09-14',
            },
        },
    });
    new PlaidApi(configuration);
}