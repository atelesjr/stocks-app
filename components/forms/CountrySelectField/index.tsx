'use client';
import { useState } from 'react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import countryList from 'react-select-country-list';

interface CountrySelectProps {
	value: string;
	onChange: (value: string) => void;
	id?: string;
}

const CountrySelect = ({ value, onChange, id }: CountrySelectProps) => {
	const [open, setOpen] = useState(false);

	// Get country options with flags
	const countries = countryList().getData();

	// Helper function to get flag emoji
	const getFlagEmoji = (countryCode: string) => {
		const codePoints = countryCode
			.toUpperCase()
			.split('')
			.map((char) => 127397 + char.charCodeAt(0));
		return String.fromCodePoint(...codePoints);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="country-select-trigger"
					id={id}
				>
					{value ? (
						<span className="flex items-center gap-2">
							<span>{getFlagEmoji(value)}</span>
							<span>
								{
									countries.find(
										(country: { value: string; label: string }) =>
											country.value === value
									)?.label
								}
							</span>
						</span>
					) : (
						'Select your country...'
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-full p-0 bg-gray-800 border-gray-600"
				align="start"
			>
				<Command className="bg-gray-800 border-gray-600">
					<CommandInput
						placeholder="Search countries..."
						className="country-select-input"
					/>
					<CommandEmpty className="country-select-empty">
						No country found.
					</CommandEmpty>
					<CommandList className="max-h-60 bg-gray-800 scrollbar-hide-default">
						<CommandGroup className="bg-gray-800">
							{countries.map((country: { value: string; label: string }) => (
								<CommandItem
									key={country.value}
									value={`${country.label} ${country.value}`}
									onSelect={() => {
										onChange(country.value);
										setOpen(false);
									}}
									className="country-select-item"
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4 text-yellow-500',
											value === country.value ? 'opacity-100' : 'opacity-0'
										)}
									/>
									<span className="flex items-center gap-2">
										<span>{getFlagEmoji(country.value)}</span>
										<span>{country.label}</span>
									</span>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default CountrySelect;
