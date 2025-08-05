import nodemailer from 'nodemailer';

export async function sendEmail(
    to: string, 
    subject: string, 
    text: string, 
    html?: string 
): Promise<void> {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
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