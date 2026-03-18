import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { empresa, email, mensagem } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "mail.zaiauniformes.com.br", // 🔥 melhor usar o domínio
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Zaia Uniformes" <comercial@zaiauniformes.com.br>`, // 🔥 FIXO
      to: "comercial@zaiauniformes.com.br", // ✅ CORRIGIDO
      replyTo: email,
      subject: `Novo contato - ${empresa}`, // 🔥 garante subject
      text: `
Empresa: ${empresa}
Email: ${email}

Mensagem:
${mensagem}
      `,
      html: `
        <h2>Novo contato recebido</h2>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}