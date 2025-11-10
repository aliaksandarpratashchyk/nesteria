/**
 * Nesteria v0.1.0
 * Copyright (c) 2025 Aliaksandar Pratashchyk <aliaksandarpratashchyk@gmail.com>
 * Licensed under GNU GPL v3 + No AI Use Clause (see LICENSE)
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, JSX } from 'react';

import { FRAME, Machine, ines, type FrameEventDetail } from '@aliaksandarpratashchyk/nesteria';

import RomFileInput from './RomFileInput';
import styles from './Application.module.css';

const NES_WIDTH = 256;
const NES_HEIGHT = 240;

type Status = {
	message: string;
	level: 'info' | 'error';
};

const Application = (): JSX.Element => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const machineRef = useRef<Machine | null>(null);
	const imageDataRef = useRef<ImageData | null>(null);

	if (!machineRef.current) {
		machineRef.current = new Machine();
	}

	const [status, setStatus] = useState<Status>({ level: 'info', message: 'No ROM loaded' });
	const [hasCartridge, setHasCartridge] = useState(false);

	useEffect(() => {
		document.body.classList.add(styles.bodyTheme);
		return () => {
			document.body.classList.remove(styles.bodyTheme);
		};
	}, [styles.bodyTheme]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const machine = machineRef.current;
		if (!canvas || !machine) return;

		const context = canvas.getContext('2d');
		if (!context) {
			setStatus({ level: 'error', message: 'Unable to initialize renderer' });
			return;
		}

		const handleFrame = (event: Event): void => {
			const detail = (event as CustomEvent<FrameEventDetail>).detail;

			if (!imageDataRef.current) {
				imageDataRef.current = context.createImageData(NES_WIDTH, NES_HEIGHT);
			}

			imageDataRef.current.data.set(detail.frameBuffer);
			context.putImageData(imageDataRef.current, 0, 0);
		};

		machine.ppu.addEventListener(FRAME, handleFrame as EventListener);

		return () => {
			machine.stop();
			machine.ppu.removeEventListener(FRAME, handleFrame as EventListener);
		};
	}, []);

	const overlayClassName = `${styles.overlayButton} ${
		hasCartridge ? styles.overlayLoaded : styles.overlayIdle
	}`;
	const statusClassName = [styles.status, status.level === 'error' ? styles.statusError : undefined]
		.filter(Boolean)
		.join(' ');

	const handleOverlayClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const handleFileChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
		const input = event.currentTarget;
		const file = input.files?.[0];
		if (!file) return;

		setStatus({ level: 'info', message: `Loading "${file.name}"...` });

		try {
			const machine = machineRef.current;
			if (!machine) throw new Error('Machine not initialised');

			const buffer = new Uint8Array(await file.arrayBuffer());
			const cartridge = ines(buffer);

			machine.stop();
			machine.insert(cartridge);
			machine.start();

			setStatus({
				level: 'info',
				message: `Loaded: mapper #${cartridge.mapper} (${cartridge.type})`,
			});
			setHasCartridge(true);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			setStatus({ level: 'error', message: `Error: ${message}` });
		} finally {
			input.value = '';
		}
	}, []);

	return (
		<div className={styles.root}>
			<div className={styles.frame}>
				<div className={styles.badge}>NES</div>
				<div className={styles.screenWrapper}>
					<canvas ref={canvasRef} width={NES_WIDTH} height={NES_HEIGHT} className={styles.canvas} />
					<button type="button" onClick={handleOverlayClick} className={overlayClassName}>
						<span>Open New Game</span>
					</button>
				</div>

				<div className={statusClassName}>{status.message}</div>

				<RomFileInput ref={fileInputRef} onChange={handleFileChange} className={styles.fileInput} />
			</div>
		</div>
	);
};

export default Application;
