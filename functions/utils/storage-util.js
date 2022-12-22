const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const stream = require('stream');

const BUCKET_NAME_MAP = {prod: 'voicecode-assets', staging: 'voicecode-assets-staging'};
const bucketName = BUCKET_NAME_MAP[process.env.ENV];
const BASE_URL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/`;

const readFile = (filePath, callback) => {
    console.log(`Reading File..${filePath}`);
    const archivo = storage.bucket(bucketName).file(filePath).createReadStream();

    let  fileContent = '';
    archivo.on('data', function(d) {
        fileContent += d;
    }).on('end', function() {
        console.log("file retrieved successfully");
        callback(fileContent)
    });
}

const getStorageWriteStream = (filePath,  metadata) => {
    return storage
        .bucket(BUCKET_NAME_MAP[process.env.ENV])
        .file(filePath)
        .createWriteStream({
            metadata
        });
}

const uploadB64 = (filePath, b64, metadata) => {
    console.log("uploading b64..")
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(b64, 'base64'));
    bufferStream.pipe(getStorageWriteStream(filePath, metadata))
        .on('error', function(err) {
            console.log("error uploading b64..", err.message)
        })
        .on('finish', function() {
            console.log("upload complete")
        });
}

const getDownloadUrl = (uuid, fileName)=> {
    return `${BASE_URL}${fileName}?alt=media&token=${uuid}`
}

exports.readFile = readFile;
exports.getStorageWriteStream = getStorageWriteStream;
exports.uploadB64 = uploadB64;
exports.getDownloadUrl = getDownloadUrl;