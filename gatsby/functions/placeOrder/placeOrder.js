// Importing the oldschool way
const nodemailer = require('nodemailer');

// Note that the function below (generateOrderEmail) isn't 'React Land'
const generateOrderEmail = ({ order, total }) => {
  return `<div>
      <h2>Your Recent Order for ${total}</h2>
      <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
      <ul>
        ${order
          .map((item) => {
            return `<li>
          <img src="${item.thumbnail}" alt="${item.name}"/>
          ${item.size} ${item.name} - ${item.price}
        </li>`;
          })
          .join('')}
      </ul>
      <p>Your total is <strong>${total}</strong> due at pickup.</p>
      <style>
        ul {
          list-style: none;
        }
      </style>
    </div>`;
};

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Used this to test loading
// const wait = (ms) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms);
//   });
// };

exports.handler = async (event, context) => {
  // You can use this console.log to see what's being sent over
  const body = JSON.parse(event.body);
  console.log(body);
  // Check if they have filled out the honeypot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boop beep bop zzzstt good bye!',
      }),
    };
  }
  // Validate the data coming in is correct
  const requiredFeilds = ['email', 'name', 'order'];

  for (const field of requiredFeilds) {
    console.log(`Checking that ${field} is good.`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // Make sure they actually have items in that order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  // Send the email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>`,
    subject: 'New order',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
