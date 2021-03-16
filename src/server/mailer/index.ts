import { createTransport } from "nodemailer";

const sender = "noreply.tutortimetable@gmail.com";

export const transporter = createTransport({
    service: "gmail",
    auth: {
        user: sender,
        pass: process.env.EMAIL_PW,
    },
});

export const sendMail = async (
    recipient: string,
    cc: string[],
    subject: string,
    content: string
) => {
    await transporter.sendMail({
        from: sender,
        to: recipient,
        cc,
        subject,
        text: content,
    });
};
