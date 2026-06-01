import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, phone, service, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email and message are required.' },
                { status: 400 }
            );
        }

        const { error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>', // swap after domain verify
            to: ['omchy34@gmail.com'],                        // ← your email
            subject: `New enquiry from ${name} — ${service || 'General'}`,
            html: `
        <div style="font-family:sans-serif;max-width:560px">
          <h2 style="color:#7c3aed">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#888;width:120px">Name</td>
                <td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Email</td>
                <td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#888">Phone</td>
                <td style="padding:8px 0">${phone || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Service</td>
                <td style="padding:8px 0">${service || '—'}</td></tr>
          </table>
          <hr style="border:1px solid #eee;margin:16px 0"/>
          <p style="color:#444;line-height:1.7">${message}</p>
        </div>
      `,
        });

        if (error) {
            console.error('Resend error details:', JSON.stringify(error, null, 2)); // ← add
            return NextResponse.json({ error: error.message ?? 'Send failed' }, { status: 500 });
        }

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}