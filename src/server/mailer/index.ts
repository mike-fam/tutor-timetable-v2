import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: "mailhub.eait.uq.edu.au",
    port: 25,
    secure: false,
    tls: {
        rejectUnauthorized: false,
    },
});

const message = {
    from: {
        name: "Q NoReply",
        address: "noreply@q.uqcloud.net",
    },
    to: "b.pham@uqconnect.edu.au",
    bcc: "mike.pham@uq.edu.au",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>",
};

transporter.sendMail(message);
