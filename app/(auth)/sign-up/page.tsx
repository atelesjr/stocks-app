'use client';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '@/components/forms/InputField';

const SignUpPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			country: 'US',
			investmentGoals: 'Growth',
			riskTolerance: 'Medium',
			preferredIndustry: 'Technology',
		},
		mode: 'onBlur',
	});

	console.log('Form Errors:', errors);

	const onSubmit = async (data: SignUpFormData) => {
		try {
			console.log('Form Data:', data);
		} catch (error) {
			console.error('Error during sign-up:', error);
		}
	};

	return (
		<div>
			<h1 className="form-title">Sign Up & Personalize</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				<InputField
					name="fullName"
					label="Full Name"
					placeholder="Enter your full name"
					register={register}
					error={errors.fullName}
					validation={{ required: 'Full Name is required', minLength: 2 }}
				/>
				<InputField
					name="email"
					label="Email"
					placeholder="Enter your email"
					register={register}
					error={errors.email}
					validation={{
						required: 'Email name is required',
						pattern: /^\w+@\w+\.\w+$/,
						message: 'Email address is required',
					}}
				/>
				<InputField
					name="password"
					label="Password"
					placeholder="Enter a strong password"
					type="password"
					register={register}
					error={errors.password}
					validation={{ required: 'Password is required', minLength: 8 }}
				/>
				<Button
					type="submit"
					disabled={isSubmitting}
					className="yellow-btn w-full mt-5"
				>
					{isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
				</Button>
			</form>
		</div>
	);
};
export default SignUpPage;
