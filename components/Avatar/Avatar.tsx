import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface AvatarProps {
	user: {
		name: string;
		email: string;
	};
	menuContent?: boolean;
}

const UserAvatar = ({ user, menuContent = false }: AvatarProps) => {
	const { name, email } = user;

	const avatarOnMenuContent = menuContent ? 'h-10 w-10' : 'h-8 w-8';

	const renderUserInfo = () => {
		if (menuContent) {
			return (
				<div className="flex flex-col">
					<span className="text-base font-medium text-gray-400">{name}</span>
					<span className="text-sm text-gray-500">{email}</span>
				</div>
			);
		}

		return (
			<div className="hidden md:flex flex-col items-start">
				<span className="text-base font-medium text-gray-400">{user.name}</span>
				<span className="text-sm text-gray-500">{email}</span>
			</div>
		);
	};

	return (
		<>
			<Avatar className={avatarOnMenuContent}>
				<AvatarImage src="https://github.com/shadcn.png" alt={name} />
				<AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
					{user.name?.[0]?.toUpperCase() || '?'}
				</AvatarFallback>
			</Avatar>

			{renderUserInfo()}
		</>
	);
};

export default UserAvatar;
