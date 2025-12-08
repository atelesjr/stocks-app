'use client';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '@/components/forms/InputField/InputField';
import SelectField from '@/components/forms/SelectField/SelectField';
import {
	INVESTMENT_GOALS,
	PREFERRED_INDUSTRIES,
	RISK_TOLERANCE_OPTIONS,
} from '@/lib/constants';
import { CountrySelectField } from '@/components/forms/CountrySelectField/CountrySelectedField';
import FooterLink from '@/components/forms/FooterLink/FooterLink';
import { useRouter } from 'next/navigation';
import { signUpWithEmail } from '@/lib/actions/auth.actions';
import { toast } from 'sonner';

const SignUpPage = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,
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
			const result = await signUpWithEmail(data);
			if (result.success) {
				router.push('/');
			}
		} catch (e) {
			console.error(e);
			toast.error('Sign up failed', {
				description:
					e instanceof Error ? e.message : 'Failed to create an account.',
			});
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
					validation={{
						required: 'Full Name is required',
						minLength: { value: 2, message: 'Too short' },
					}}
				/>
				<InputField
					name="email"
					label="Email"
					placeholder="Enter your email"
					register={register}
					error={errors.email}
					validation={{
						required: 'Email is required',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Invalid email address',
						},
					}}
				/>
				<InputField
					name="password"
					label="Password"
					placeholder="Enter a strong password"
					type="password"
					register={register}
					error={errors.password}
					validation={{
						required: 'Password is required',
						minLength: { value: 8, message: 'Too short' },
					}}
				/>

				<CountrySelectField
					name="country"
					label="Country"
					control={control}
					error={errors.country}
					required
				/>

				<SelectField
					name="investmentGoals"
					label="Investment Goals"
					placeholder="Select your investment goals"
					options={INVESTMENT_GOALS}
					control={control}
					error={errors.investmentGoals}
					required
				/>

				<SelectField
					name="riskTolerance"
					label="Risk Tolerance"
					placeholder="Select your risk level"
					options={RISK_TOLERANCE_OPTIONS}
					control={control}
					error={errors.riskTolerance}
					required
				/>

				<SelectField
					name="preferredIndustry"
					label="Preferred Industry"
					placeholder="Select your preferred industry"
					options={PREFERRED_INDUSTRIES}
					control={control}
					error={errors.preferredIndustry}
					required
				/>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="yellow-btn w-full mt-5"
				>
					{isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
				</Button>
				<FooterLink
					text="Already have an account?"
					linkText="Sign in"
					href="/sign-in"
				/>
			</form>
		</div>
	);
};
export default SignUpPage;
