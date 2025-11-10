import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import Application from './Application';

const mount = (): void => {
	const existingRoot = document.getElementById('root');
	const container = existingRoot ?? document.body.appendChild(document.createElement('div'));

	container.id = 'root';

	const root = createRoot(container);
	root.render(createElement(Application));
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', mount, { once: true });
} else {
	mount();
}
