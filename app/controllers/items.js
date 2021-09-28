const { v4: uuidv4 } = require('uuid')
const Queue = require('bull')
const nodemailer = require('nodemailer')
let items = require('../Items')

const getItems = (req, reply) => {
  reply.send(items)
}

const getItem = (req, reply) => {
  const { id } = req.params

  const item = items.find((item) => item.id === id)

  reply.send(item)
}

const addItem = (req, reply) => {
  const { name } = req.body
  const item = {
    id: uuidv4(),
    name,
  }

  items = [...items, item]

  reply.code(201).send(item)
}

const deleteItem = (req, reply) => {
  const { id } = req.params

  items = items.filter((item) => item.id !== id)

  reply.send({ message: `Item ${id} has been removed` })
}

const updateItem = (req, reply) => {
  const { id } = req.params
  const { name } = req.body

  items = items.map((item) => (item.id === id ? { id, name } : item))

  item = items.find((item) => item.id === id)

  reply.send(item)
}

const testQueue = (req, reply) => {
  const sendMailQueue = new Queue('sendMail')
  const data = {
    email: 'habilmuhammad20@gmail.com'
  }

  const options = {
    delay: 15000
  }
  function sendMail(email) {
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
}
module.exports = {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
  testQueue,
}

