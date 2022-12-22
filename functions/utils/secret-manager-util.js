const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const {logger} = require("./log-util");

const client = new SecretManagerServiceClient();

const SECRET_PATH_MAP = {staging: "projects/1076649933699/secrets/", prod: "projects/172731555428/secrets/"}

const getSecret = async (path) => {
    logger.info("retrieving secrets for", process.env.ENV)
    try {
        const [accessResponse] = await client.accessSecretVersion({
            name: `${SECRET_PATH_MAP[process.env.ENV]}${path}/versions/latest`,
        });

        const emailCredentialsString = accessResponse.payload.data.toString();
        const emailCredentials = emailCredentialsString.split(",")
        return emailCredentials
    } catch (e) {
        logger.error(e.message, 'getSecret', e)
    }
}

exports.getSecret = getSecret