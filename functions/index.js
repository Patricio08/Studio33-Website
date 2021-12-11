const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const cors = require('cors')({origin: 'https://sky-studio33.web.app'});

admin.initializeApp();

// todo: change location (us server)

// [START trigger]
exports.date = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!');
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    // [END usingMiddleware]
    res.status(200).send({ data: 'test' });
  });
});

const CLIENT_ID = functions.config().auth.clientid;
const CLIENT_SECRET = functions.config().auth.clientsecret;
const REDIRECT_URI = functions.config().auth.redirect_uri;
const REFRESH_TOKEN = functions.config().auth.refresh_token;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const accessToken = oAuth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: functions.config().gmail.email,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    const body = req.body
    const name = req.body.name
    const email = req.body.email
    const option = req.body.option
    const message = req.body.message

    const from = functions.config().gmail.email // Change to your verified sender
    const to = functions.config().gmail.to_email
    const subject = 'NOVA MENSAGEM'
    const text = 'Tens uma nova mensagem: \n'
    const msg = {
        to,
        from,
        subject,
        text,
        html: `<strong>${text}</strong>
              <p>Nome: ${name}</p>
              <p>Email: ${email}</p>
              <p>Assunto: ${option}</p>
              <p>Mensagem: ${message}</p>`,
    }
    transporter
      .sendMail(msg)
      // eslint-disable-next-line promise/always-return
      .then(() => {
          res.status(200).send({ data: body });
      })
      .catch((error) => {
          res.status(200).send({ data: error });
      })
  });
});



exports.sendEmailTest = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
      res.status(200).send({ data: error });
  });
});

const transporter1 = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: functions.config().nodemailer.email,
      pass: functions.config().nodemailer.password
  }
})

exports.sendEmailTest1 = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    const from = functions.config().nodemailer.email // Change to your verified sender
    const to = functions.config().nodemailer.email
    const subject = 'Hello there'
    const text = 'Something for you to know'
    const msg = {
        to,
        from,
        subject,
        text,
        html: `<strong>${text}</strong>`,
    }
    transporter1
      .sendMail(msg)
      // eslint-disable-next-line promise/always-return
      .then(() => {
          res.status(200).send({ data: 'Sent.' });
      })
      .catch((error) => {
          res.status(200).send({ data: error });
      })
  });
});