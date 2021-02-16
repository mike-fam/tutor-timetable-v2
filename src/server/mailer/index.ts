import { createTransport } from "nodemailer";

export const transporter = createTransport({
    service: "gmail",
    auth: {
        user: "noreply.tutortimetable@gmail.com",
        pass: process.env.MAIL_PASS,
    },
});
