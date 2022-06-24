require("dotenv").config()
const fs = require("fs")
const S3 = require("aws-sdk/clients/s3")

// const bucketName = process.env.AWS_BUCKET_NAME;
// const region = process.env.AWS_BUCKET_REGION;
// const accessKeyId = process.env.AWS_ACCESS_KEY;
// const secretAceessKey = process.env.AWS_SECRET_KEY;

const bucketName = "inventoryplus"
const region = "us-east-2"
const accessKeyId = "AKIASDTCYWN37XY53C6T"
const secretAccessKey = process.env.AWS_SECRET_KEY;



const s3 = new S3({
    region,accessKeyId,secretAccessKey
})

const uploadFile = (file)=>{
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}

const getFileStream = (fileKey)=>{
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}

module.exports = {uploadFile,getFileStream}