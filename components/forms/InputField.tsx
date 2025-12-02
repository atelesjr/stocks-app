import { cn } from '@/lib/utils';

const InputField = ({
	name,
	label,
	placeholder,
	type = 'text',
	register,
	error,
	validation,
	disabled,
	value,
}: FormInputProps) => {
	return (
		<div className="flex flex-col space-y-2">
			<label htmlFor={name} className="form-label">
				{label}
			</label>
			<input
				id={name}
				type={type}
				placeholder={placeholder}
				disabled={disabled}
				value={value}
				className={cn('form-input', {
					'opacity-50 cursor-not-allowed': disabled,
				})}
				{...register(name, validation)}
			/>
			{error && <p className="text-sm text-red-500">{error.message}</p>}
		</div>
	);
};
export default InputField;
