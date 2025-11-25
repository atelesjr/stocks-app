import Header from '@/components/Header/Header';

interface LayoutRootProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutRootProps) => {
	return (
		<main className="min-h-screen text-gray-400">
			<Header />
			<div className="container py-10">{children}</div>
		</main>
	);
};
export default Layout;
