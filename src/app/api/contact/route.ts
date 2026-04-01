import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const { firstName, lastName, email, company, phone, message } = await request.json();

    if (!firstName || !lastName || !email || !company || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'Peerforum Website <contact@peerforum.com>',
      to: 'juan.gomeznaar@peerforum.com',
      replyTo: email,
      subject: `New contact from ${firstName} ${lastName} — ${company}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Company</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${company}</td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${phone}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Message</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${message}</td>
          </tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
