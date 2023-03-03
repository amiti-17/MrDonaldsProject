// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });const functions = require("firebase-functions");

const dotenv = require('dotenv').config();
const nodemailer = require("nodemailer");
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true })

const functions = require("firebase-functions");
const htmlToText = require("nodemailer-html-to-text").htmlToText;
const { email, password } = require('./config')

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
    from: `MrDonalds (${email})`,
    to: order.email,
    subject: `Ваше замовлення з MrDonalds`,
    html: `
      <div>
        <h2>Доброго дня</h2>
        <h3>Ваше замовлення: ${order.username}</h3>
        <ul>
          <li>1</li>
          <li>2</li>
        </ul >
        <small>Просто очікуйте на кур'єра</small>
        <small>Цей лист сформовано автоматично, для звернень до нас, пишіть на адрессу <a href="mailto:timshk17@gmail.com"></a>timshk17@gmail.com</a></small >
      </div >
  `,
    text: 'some text',
  }
  console.log(options)
  transporter.sendMail(options, function (err, data) {
    if (err) {
      console.log('Error occurs', err);
    } else {
      console.log('Email sent')
    }
  })
}

// exports.sendUsernEmail = functions.database.ref('orders/{pushId}')
//   .onCreate(order => sendOrderEmail())//order.val()))

// exports.sendUser2Email = functions.database.ref('orders/Tim-Wr8cwpDaLDZqrysJJ8fQYpqt6i23')
//   .onCreate(order => sendOrderEmail())//order.val()))

exports.sendUserEmail = functions.database.ref('orders/{pushId}')
  .onUpdate((change, context) => {
    const order = change.after.val();
    functions.logger.log('SendingUsersEmail', context.params.pushId, order);
    // const previousValue = change.before.data();
    sendOrderEmail(order);
  })

// exports.makeUppercase = functions.database.ref('/messages/{pushId}')
//   .onCreate((snapshot, context) => {
//     // Grab the current value of what was written to the Realtime Database.
//     const original = snapshot.val();
//     functions.logger.log('Uppercasing', context.params.pushId, original);
//     const uppercase = original.toUpperCase();
//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to the Firebase Realtime Database.
//     // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//     return snapshot.ref.parent.child('uppercase').set(uppercase);
//   });
// order => sendOrderEmail())//order.val()))

// exports.sendUser4Email = functions.database.ref('orders/Tim-Wr8cwpDaLDZqrysJJ8fQYpqt6i23')
//   .onUpdate(order => sendOrderEmail())//order.val()))
