export const transportOptions = {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_SMTP_PORT),
};

export const mailOptions = {
    from: '"no-reply" <no-reply@medical-api.abnk.uk>',
};
