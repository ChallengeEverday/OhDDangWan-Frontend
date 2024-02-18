import AWS from "aws-sdk"
import dayjs from "dayjs"

// 참고: https://medium.com/how-to-react/how-to-upload-files-on-an-s3-bucket-in-react-js-97a3ccd519d1

// S3 Bucket Name
const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET as string
const REGION = process.env.NEXT_PUBLIC_S3_REGION as string
const ACCESS_KEY = process.env.NEXT_PUBLIC_S3_ACCESS_KEY as string
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY as string

// Function to upload file to s3
export const uploadFileS3 = async (file: File) => {
  // S3 Credentials
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  })

  const fileName = `${dayjs().unix()}-${file.name}`
  const s3 = new AWS.S3({
    params: { Bucket: `${S3_BUCKET}/thumbnail` },
    region: REGION,
  })

  // Files Parameters
  const params = {
    Bucket: `${S3_BUCKET}/thumbnail`,
    Key: fileName,
    Body: file,
  }

  // Uploading file to s3
  const upload = s3
    .putObject(params)
    .on("httpUploadProgress", (evt) => {
      // File uploading progress
      console.log(
        "Uploading " + Math.floor((evt.loaded * 100) / evt.total) + "%",
      )
    })
    .promise()

  // Fille successfully uploaded
  const result = await upload

  return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${fileName}`
}
