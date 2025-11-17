import nodemailer from 'nodemailer';

export async function sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string
): Promise<void> {

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
        console.error('FATAL ERROR: Email credentials (EMAIL_USER or EMAIL_PASS) are not defined in environment variables.');
        throw new Error('Email configuration is missing.');
    }

    const cleanEmailPass = emailPass.replace(/\s/g, '');

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: emailUser,
                pass: cleanEmailPass,
            }
        });

        const mailOptions = {
            from: emailUser,
            to: to,
            subject: subject,
            text: text,
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent successfully! MessageId: ${info.messageId}`);

    } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error('Failed to send OTP email.');
    }
}