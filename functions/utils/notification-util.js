const nodemailer = require('nodemailer');
const {readFile} = require('../utils/storage-util')
const {getSecret} = require('./secret-manager-util')
const templateData = require('./email-template-data.json')
const {logger} = require("./log-util");

const sendEmail = async (recipient, template, data) => {
    logger.log(">>> sending email..")
    data = {
        ...data,
        year: new Date().getFullYear()
    }
    let fileName = data.fileName === null || data.fileName === '' ? `generic_template.html` : data.fileName;

    //get email credentials
    // const emailCredentials = await getSecret('email-creds')
    const emailCredentials = await getSecret('email-creds')
    const auth = {
        user: emailCredentials[0],
        pass: emailCredentials[1]
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth
    });

    const send = (html) => {
        let {subject, htmlString} = replacePlaceholders(html, data, template)
        if ('staging' === process.env.ENV) {
            subject = `TEST: ${subject}`
        }

        const mailOptions = {
            from: "VoiceCode <noreply@VoiceCode.com>", // Something like: Jane Doe <janedoe@gmail.com>
            to: recipient,
            subject, // email subject
            html: htmlString
        };
        transporter.password = emailCredentials[1]
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error("ERROR Sending email: " + error)
            }
        });
    }

    // read template and send email
    //readFile(`email-templates/generic_template.html`, send)
    readFile(`email-templates/` + fileName, send)
}

const replacePlaceholders = (htmlString, data, template) => {
    logger.log(" >>> replacing placeholders in email template ...")
    // Get the subject from email-template-data.json
    logger.debug(template, "*******")
    let subject = templateData[template].subject;
    let body = templateData[template]?.body;
    try {
        //Get object of data to replace the placeholder
        const fields = Object.keys(data);

        // replace the placeholder with initial data
        fields.forEach(f => {
            body = body.replace(new RegExp("\\{" + f + "\\}", "g"), data[f]);
            subject = subject.replace(new RegExp("\\{" + f + "\\}", "g"), data[f])
        })

        htmlString = htmlString.replace(new RegExp("\\{" + "subject" + "\\}", "g"), subject);
        htmlString = htmlString.replace(new RegExp("\\{" + "body" + "\\}", "g"), body)
        htmlString = htmlString.replace(new RegExp("\\{" + "year" + "\\}", "g"), new Date().getFullYear())
    } catch (e) {
        logger.error(e.message)
    }
    return {htmlString, subject}
}




exports.sendEmail = sendEmail

