import nodemailer from 'nodemailer';

export async function sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string
): Promise<void> {

    // --- FIX START: Runtime Check for Environment Variables ---
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
        console.error('FATAL ERROR: Email credentials (EMAIL_USER or EMAIL_PASS) are not defined in environment variables.');
        // Throw a specific error so the developer knows the configuration is missing
        throw new Error('Email configuration is missing.');
    }

    // Remove spaces from the App Password for security and correctness
    const cleanEmailPass = emailPass.replace(/\s/g, '');
    // --- FIX END ---

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser, // Use the checked variable
                pass: cleanEmailPass, // Use the cleaned variable
            }
        });

        const mailOptions = {
            from: emailUser, // Use the checked variable
            to: to,
            subject: subject,
            text: text,
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent successfully! MessageId: ${info.messageId}`);

    } catch (error) {
        console.error('Failed to send email:', error);
        // Rethrow a generic error that is safe to send back to a client
        throw new Error('Failed to send OTP email.');
    }
}