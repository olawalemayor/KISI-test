const Mailjet = require("node-mailjet");
const crypto = require("crypto");
const createMail = require("./email");

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

class Mail {
  async sendMail(name, email, color) {
    try {
      const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: process.env.FROM_EMAIL,
              Name: "KISI Articles",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: "Greetings from Kisi Article.",
            TextPart: "My first Mailjet email",
            HTMLPart: `<h3>Dear ${name}, welcome to Kisi Articles.</h3> <p>Your favourite color is ${color}<p>`,
            CustomID: crypto.randomBytes(16).toString("hex"),
          },
        ],
      });

      const result = await request;

      return result.body.Messages[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Mail;
