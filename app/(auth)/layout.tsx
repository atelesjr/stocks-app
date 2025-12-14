import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';
import { getAuth } from '@/lib/better-auth/auth';
import { redirect } from 'next/navigation';

interface LayoutAuthProps {
	children: ReactNode;
}

export const dynamic = 'force-dynamic';

const LayoutAuth = async ({ children }: LayoutAuthProps) => {
	try {
		const auth = await getAuth();
		const session = await auth.api.getSession({ headers: await headers() });

		if (session?.user) redirect('/');

		return (
			<main className="auth-layout">
				<section className="auth-left-section scroll-hide-default">
					<Link href="/" className="auth-logo">
						<Image
							src="/assets/icons/logo.svg"
							alt="Signalist logo"
							width={140}
							height={32}
							className="h-8 w-auto"
						/>
					</Link>
					<div className="pb-6 lg:pb-8 flex-1">{children}</div>
				</section>

				<section className="auth-right-section">
					<div className="z-10 relative lg:mt-4 lg:mb-16">
						<blockquote className="auth-blockquote">
							Signalist turned my watchlist into a winning list. The alerts are
							spot-on, and I feel more confident making moves in the market
						</blockquote>
						<div className="flex items-center justify-between">
							<div>
								<cite className="auth-testimonial-author">- Ethan R.</cite>
								<p className="max-md:text-xs text-gray-500">Retail Investor</p>
							</div>
							<div className="flex items-center gap-0.5">
								{Array.from({ length: 5 }).map((_, index) => (
									<Image
										src="/assets/icons/star.svg"
										alt="Star Rating"
										width={20}
										height={20}
										className="h-5 w-5"
										key={index}
									/>
								))}
							</div>
						</div>
					</div>
					<div className="flex-1 relative">
						<Image
							src="/assets/images/dashboard.png"
							alt="Dashboard preview"
							width={1440}
							height={1150}
							className="auth-dashboard-preview absolute top-0"
						/>
					</div>
				</section>
			</main>
		);
	} catch (err) {
		// Log the error and digest so we can inspect server logs
		// eslint-disable-next-line no-console
		console.error('Server render auth (auth layout) error:', err, 'digest=', (err as any)?.digest);
		return (
			<main className="auth-layout">
				<div className="container py-10">
					<h1 className="text-2xl font-bold">Server error</h1>
					<p className="mt-4">We were unable to render the authentication page. The error has been logged.</p>
					<p className="mt-2 text-sm text-gray-500">Error digest: {(err as any)?.digest ?? 'N/A'}</p>
				</div>
			</main>
		);
	}
};
export default LayoutAuth;
