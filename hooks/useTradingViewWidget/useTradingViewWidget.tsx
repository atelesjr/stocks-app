'use client';

import { useEffect, useMemo, useRef } from 'react';

const useTradingViewWidget = (
	scriptURL: string,
	config: Record<string, unknown>,
	height: number = 600
) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const configString = useMemo(() => JSON.stringify(config), [config]);

	// build a proper widget container element (use `class` for innerHTML)
	const graphDiv = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`;

	useEffect(() => {
		if (!containerRef.current) return;
		if (containerRef.current.dataset.loaded) return;

		// Insert the widget container markup (don't stringify an object)
		containerRef.current.innerHTML = graphDiv;

		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = scriptURL;
		script.async = true;

		// TradingView embed scripts expect the config object as the script's content
		// (i.e. the object literal inside the <script> tag). JSON.stringify is fine
		// because the embed script reads it as JSON.
		script.text = JSON.stringify(config);

		containerRef.current.appendChild(script);
		containerRef.current.dataset.loaded = 'true';

		return () => {
			if (containerRef.current) {
				containerRef.current.innerHTML = '';
				delete containerRef.current.dataset.loaded;
			}
		};
	}, [scriptURL, configString, height]);

	return containerRef;
};

export default useTradingViewWidget;
