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
					name="Full Name"
					label="Full Name"
					placeholder="Enter your full name"
					register={register}
					error={errors.fullName}
					validation={{ required: 'Full Name is required', minLength: 2 }}
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
