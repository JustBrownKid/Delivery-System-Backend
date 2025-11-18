import { Resend } from 'resend';

const resend = new Resend('re_i3Zz5aXD_Hpc99vNc6z9fu433hVpVXzQi');

export async function sendEmail(
    toEmail: string,
    subject: string,
    text: string,
    html: string
): Promise<void> {
    try {
        const { error } = await resend.emails.send({
            from: 'Dome <onboarding@resend.dev>',
            to: [toEmail],
            subject: subject,
            text: text,
            html: html,
        });

        if (error) {
            console.error('Resend email error:', error);
            throw new Error(`Failed to send email to ${toEmail}: ${error.message || error.name}`);
        }

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);

        throw new Error(`Email service failed: ${errorMessage}`);
    }
}