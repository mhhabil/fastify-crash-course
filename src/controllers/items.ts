
import Queue from 'bull'
import nodemailer from 'nodemailer'

const testQueue = (request: any, reply: any) => {
  const sendMailQueue = new Queue('sendMail')
  const data = {
    email: 'habilmuhammad20@gmail.com'
  }

  const options = {
    delay: 15000
  }
  function sendMail(email: any) {
    return new Promise((resolve, reject) => {
      let mailOptions = {
        from: 'habil@gic-indonesia.com',
        to: email,
        subject: 'Testing Queue',
        text: 'tewahadhadijaijdwijadijawd.'
      };
      let mailConfig = {
        service: 'gmail',
        auth: {
          user: 'habil@gic-indonesia.com',
          pass: '19April2000'
        }
      };
      nodemailer.createTransport(mailConfig).sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info)
        }
      })
    })
  }
  sendMailQueue.add(data, options);
  sendMailQueue.process(async job => {
    return await sendMail(job.data.email)
  })
  reply.send(200)
}
export default testQueue;

