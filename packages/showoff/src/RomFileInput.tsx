import { forwardRef, type ChangeEventHandler } from 'react';

type RomFileInputProps = {
	className?: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
};

const RomFileInput = forwardRef<HTMLInputElement, RomFileInputProps>(
	({ className, onChange }, ref) => (
		<input
			ref={ref}
			type="file"
			accept=".nes,application/octet-stream"
			onChange={onChange}
			className={className}
		/>
	),
);

RomFileInput.displayName = 'RomFileInput';

export default RomFileInput;
