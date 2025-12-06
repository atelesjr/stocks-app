import nodemailer from 'nodemailer';
import {
	WELCOME_EMAIL_TEMPLATE,
	NEWS_SUMMARY_EMAIL_TEMPLATE,
} from '@/lib/nodemailer/templates';

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.NODEMAILER_EMAIL!,
		pass: process.env.NODEMAILER_PASSWORD!,
	},
});

// add near transporter creation for debug (temporary)
console.log('NODEMAILER_EMAIL present?', !!process.env.NODEMAILER_EMAIL);
console.log('NODEMAILER_PASSWORD present?', !!process.env.NODEMAILER_PASSWORD);

transporter
	.verify()
	.then(() => console.log('Transporter verify: OK'))
	.catch((err) => console.error('Transporter verify failed:', err));

export const sendWelcomeEmail = async ({
	email,
	name,
	intro,
}: WelcomeEmailData) => {
	const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace(
		'{{intro}}',
		intro
	);

	const mailOptions = {
		from: `"Signalist" <signalist@jsmastery.pro>`,
		to: email,
		subject: `Welcome to Signalist - your stock market toolkit is ready!`,
		text: 'Thanks for joining Signalist',
		html: htmlTemplate,
	};

	await transporter.sendMail(mailOptions);
};

export const sendNewsSummaryEmail = async ({
	email,
	date,
	newsContent,
}: {
	email: string;
	date: string;
	newsContent: string;
}): Promise<void> => {
	const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE.replace(
		'{{date}}',
		date
	).replace('{{newsContent}}', newsContent);

	const mailOptions = {
		from: `"Signalist News" <signalist@jsmastery.pro>`,
		to: email,
		subject: `📈 Market News Summary Today - ${date}`,
		text: `Today's market news summary from Signalist`,
		html: htmlTemplate,
	};

	await transporter.sendMail(mailOptions);
};
