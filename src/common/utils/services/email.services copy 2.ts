import nodemailer from 'nodemailer';

export async function sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string
): Promise<void> {

    // 💡 Environment Variable မှ ရယူသော Port ကို Number သို့ ပြောင်းပါ။
    const brevoHost = process.env.BREVO_HOST || 'smtp-relay.brevo.com';
    // ⚠️ Port ကို Number() ဖြင့် ချက်ချင်းပြောင်းပါ။ ၎င်းသည် 465 သို့မဟုတ် 587 ဖြစ်ရမည်။
    const brevoPort = Number(process.env.BREVO_PORT) || 587;

    // BREVO_USER သည် 9bd985001@smtp-brevo.com ကဲ့သို့သော Login ဖြစ်ရမည်
    const brevoUser = process.env.BREVO_USER;
    // BREVO_KEY သည် xsmtpsib-... ကဲ့သို့သော SMTP Key ဖြစ်ရမည်
    const brevoKey = process.env.BREVO_KEY;

    if (!brevoUser || !brevoKey) {
        console.error('FATAL ERROR: Brevo credentials (BREVO_USER or BREVO_KEY) are not defined in environment variables.');
        throw new Error('Brevo configuration is missing.');
    }

    // SMTP Key တွင် နေရာလွတ်များ ပါဝင်လာပါက ဖယ်ရှားရန်
    const cleanBrevoKey = brevoKey.replace(/\s/g, '');

    // 💡 Port 465 ကို သုံးပါက secure: true ဖြစ်ရမည်။
    const isSecure = brevoPort === 465;

    try {
        const transporter = nodemailer.createTransport({
            host: brevoHost,
            port: brevoPort, // ✅ ပြင်ဆင်ပြီး၊ Number type ဖြစ်နေပြီ။
            secure: isSecure, // 465 အတွက် true, 587 အတွက် false
            auth: {
                user: brevoUser,
                pass: cleanBrevoKey,
            }
        });

        // 💡 mailOptions.from ကို Environment Variable (SENDER_EMAIL) မှ ယူခြင်းသည် ပိုကောင်းသည်။
        // သို့မဟုတ် စာလုံးအဖြစ် ထည့်သွင်းထားသော 'larakid8080@gmail.com' သည် Verified ဖြစ်ရမည်။
        const mailOptions = {
            from: 'larakid8080@gmail.com',
            to: to,
            subject: subject,
            text: text,
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent successfully! MessageId: ${info.messageId}`);

    } catch (error) {
        console.error('--- BREVO SMTP ERROR DETAILS ---');
        console.error(error);
        console.error('----------------------------------');
        // Render Logs များကို ရှင်းလင်းစွာ သိရှိနိုင်ရန် Error Message ကို ပိုမိုအတည်ပြုသည်။
        throw new Error(`Failed to send email: ${(error as Error).message || 'Unknown SMTP error'}`);
    }
}