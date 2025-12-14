import Header from '@/components/Header';
import { getAuth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

interface LayoutRootProps {
	children: React.ReactNode;
}

export const dynamic = 'force-dynamic';

const Layout = async ({ children }: LayoutRootProps) => {
	try {
		const auth = await getAuth();
		const session = await auth.api.getSession({ headers: await headers() });

		if (!session?.user) {
			redirect('/sign-in');
		}

		const user = {
			id: session.user.id,
			name: session.user.name,
			email: session.user.email,
		};
		return (
			<main className="min-h-screen text-gray-400">
				<Header user={user} />
				<div className="container py-10">{children}</div>
			</main>
		);
	} catch (err) {
		// Log the error and digest to server logs for debugging
		// eslint-disable-next-line no-console
		console.error('Server render auth error:', err, 'digest=', (err as any)?.digest);

		// Render a simple fallback so the client doesn't show a blank/black screen
		return (
			<main className="min-h-screen text-gray-400">
				<div className="container py-10">
					<h1 className="text-2xl font-bold">Server error</h1>
					<p className="mt-4">We were unable to verify your session. The error has been logged.</p>
					<p className="mt-2 text-sm text-gray-500">Error digest: {(err as any)?.digest ?? 'N/A'}</p>
				</div>
			</main>
		);
	}
};
export default Layout;
