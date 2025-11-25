'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import UserAvatar from '../Avatar/Avatar';
import { LogOut } from 'lucide-react';
import NavItems from '../NavItems/NavItems';

const UserDropdown = () => {
	const router = useRouter();

	const handleSignOut = async () => {
		// Perform sign-out logic here (e.g., clear auth tokens, update state)
		// After sign-out, redirect to the homepage
		router.push('/sign-in');
	};

	const user = { name: 'John Doe', email: 'contact@example.com' }; // Replace with actual user data

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex items-center gap-3 text-gray-400 hover:text-yellow-500 cursor-pointer"
				>
					<UserAvatar user={user} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="text-gray-400">
				<DropdownMenuLabel>
					<div className="flex relative items-center gap-3 py-2">
						<UserAvatar user={user} menuContent />
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator className="bg-gray-600" />
				<DropdownMenuItem
					onClick={handleSignOut}
					className="
          text-gray-100 text-md font-medium 
          focus:bg-transparent focus:text-yellow-500 
          transition-colors cursor-pointer"
				>
					<LogOut className="h-4 w-4 mr-2 hidden sm:block" />
					Logout
				</DropdownMenuItem>

				<DropdownMenuSeparator className="hidden sm:block bg-gray-600" />
				<nav className="sm:hidden">
					<NavItems />
				</nav>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
export default UserDropdown;
