const nodemailer = require("nodemailer");
const admin = require('firebase-admin');
const functions = require("firebase-functions");
//const htmlToText = require("nodemailer-html-to-text").htmlToText;


admin.initializeApp();

const transporter = nodemailer.createTransport({
  servise: 'gmail',
  secure: false,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_TEST_APP_PSWD,
  }
})

// transporter.use('compile', htmlToText())

const sendOrderEmail = order => {
  const options = {
    from: `MrDonalds (${process.env.EMAIL})`,
    to: order.email,
    subject: 'Ваше замовлення з MrDonalds',
    html: `
      <div>
        <h2>Доброго дня</h2>
        <h3>Ваше замовлення, ${order.username}:</h3>
        <ul>
          ${order.order.map(({ name, price, count, choice, toppings }) => {
      return (`<li>
              ${name}: ${count}шт. по ${price}грн. Вcього: ${count * price} грн. <br>
              ${(() => {
          if (toppings === "no toppings") {
            return "It`s don`t have any toppings <br>"
          } else {
            return `You ordered follow toppings: ${toppings.join(', ')} <br>`
          }
        })()}
              ${(() => {
          if (choice === "no choices") {
            return "It`s don`t have any choices <br>"
          } else {
            return `You ordered this choice: ${choice} <br>`
          }
        })()} <br>
            </li>`)
    }).join('')}
        </ul>
        <p>Разом за це замовлення: ${order.order.reduce((accumulator, { price, count }) => {
      return accumulator += count * price;
    }, 0)} грн.</p>
        <small>Просто очікуйте на кур'єра</small>
        <small>Цей лист сформовано автоматично, для звернень до нас, пишіть на адрессу <a href="mailto:${process.env.EMAIL}"></a>${process.env.EMAIL}</a></small >
      </div >
  `,
    text: 'You cann`t see it)',
  }
  console.log(options)
  transporter.sendMail(options, function (err, data) {
    if (err) {
      console.error('Error occurs in transporter', err);
    } else {
      console.log('Email sent');
    }
  })
}

exports.sendUserEmail = functions.database.ref('orders/{pushId}')
  .onWrite((change, context) => {
    // exit, when data was delete
    if (!change.after.exists()) {
      return null;
    }
    const order = change.after.val();
    functions.logger.log('SendingUsersEmail', context.params.pushId, order);
    // const previousValue = change.before.data();
    sendOrderEmail(order);
  })