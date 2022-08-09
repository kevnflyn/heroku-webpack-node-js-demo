const chalk = require('chalk')
const debugMail = require('debug')('mail')
const nodemailer = require('nodemailer')

module.exports = {
  sendMail: (to, subject, html) => {
    const transporter = nodemailer.createTransport({
      host: 'mail.privateemail.com',
      port: 587,
      auth: {
        user: 'automated@getphare.com',
        pass: 'nQq6jB5CJeUvBXwE'
      }
    })
    debugMail(chalk.green('set up transporter'))

    const mailOptions = {
      from: 'automated@getphare.com',
      to,
      subject,
      html
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        debugMail(chalk.red(error))
      } else {
        debugMail(chalk.green('Email sent: ' + info.response))
      }
    })
  }
}
