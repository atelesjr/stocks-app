import nodemailer from 'nodemailer';
import {
	WELCOME_EMAIL_TEMPLATE,
	NEWS_SUMMARY_EMAIL_TEMPLATE,
} from '@/lib/nodemailer/templates';

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASSWORD,
	},
	tls: {
		rejectUnauthorized: process.env.NODE_ENV !== 'development',
	},
});

// NOTE: don't run `.verify()` at module load time — Next.js runs module code
// during production `next build` which can trigger network calls during the
// build phase and fail (see: self-signed certificate in certificate chain).
// Export a helper so verification can be run explicitly in a dev/devtools
// context when desirable.
export async function verifyTransporter(): Promise<boolean> {
	try {
		await transporter.verify();
		console.log('Transporter verify: OK');
		return true;
	} catch (err) {
		console.error('Transporter verify failed:', err);
		return false;
	}
}

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
