import AWS from "aws-sdk";

const SES_CONFIG = {
    accessKeyId: process.env.S3_ACCESS_KEY as string ,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    region: process.env.S3_BUCKET_REGION as string,
}

const AWS_SES = new AWS.SES(SES_CONFIG)

let sendEmail = (recipientEmail: string, body: string, subject: string) => {
    let params = {
        Source: process.env.EMAIL_USER as string,
        Destination: {
          ToAddresses: [
            recipientEmail
          ],
        },
        ReplyToAddresses: [],
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: `${body}`,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: `${subject}`,
          }
        },
      };

      return AWS_SES.sendEmail(params).promise()

}

export default sendEmail;
