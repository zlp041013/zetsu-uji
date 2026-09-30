const nodemailer = require('nodemailer');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sendJson(response, statusCode, payload) {
  response.setHeader('Cache-Control', 'no-store');
  response.status(statusCode).json(payload);
}

module.exports = async function submitLetter(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { success: false, message: 'POST only' });
  }

  try {
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : (request.body || {});
    const nickname = String(body.nickname || '').trim().slice(0, 80) || '匿名';
    const contact = String(body.contact || '').trim().slice(0, 254);
    const message = String(body.message || '').trim().slice(0, 10000);

    // Honeypot: silently accept automated spam without sending it.
    if (body.website) {
      return sendJson(response, 200, { success: true });
    }

    if (!EMAIL_PATTERN.test(contact) || !message) {
      return sendJson(response, 400, {
        success: false,
        message: 'メールアドレスと投稿内容を確認してください。',
      });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '');

    if (!gmailUser || !gmailAppPassword) {
      console.error('Gmail environment variables are missing.');
      return sendJson(response, 503, {
        success: false,
        message: '投稿機能は現在準備中です。',
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `舌氏月刊 <${gmailUser}>`,
      to: gmailUser,
      replyTo: contact,
      subject: `【舌氏月刊】読者投稿：${nickname.replace(/[\r\n]/g, ' ')}`,
      text: [
        `ニックネーム: ${nickname}`,
        `連絡先: ${contact}`,
        '',
        '投稿内容:',
        message,
      ].join('\n'),
    });

    return sendJson(response, 200, { success: true });
  } catch (error) {
    console.error('Letter submission failed:', error);
    return sendJson(response, 500, {
      success: false,
      message: '送信に失敗しました。時間をおいて再度お試しください。',
    });
  }
};
