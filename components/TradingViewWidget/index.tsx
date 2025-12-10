'use client';

import useTradingViewWidget from '@/hooks/useTradingViewWidget';
import React, { memo } from 'react';

interface TradingViewWidgetProps {
	title?: string;
	scriptUrl: string;
	config: Record<string, unknown>;
	height?: number;
	className?: string;
}

const TradingViewWidget = ({
	title,
	scriptUrl,
	config,
	height = 600,
	className,
}: TradingViewWidgetProps) => {
	const widgetRef = useTradingViewWidget(scriptUrl, config, height);
	const rawSymbol = config?.symbol ?? '';
	const symbolStr = String(rawSymbol || '').trim();
	const urlSymbol = symbolStr
		? symbolStr.replace(':', '-').replace(/[^A-Za-z0-9\-_]/g, '-')
		: 'AAPL';
	const symbolLabel = symbolStr
		? (symbolStr.split(':').pop() as string)
		: 'AAPL';
	const attributionUrl = `https://www.tradingview.com/symbols/${urlSymbol}/`;
	const attributionText = `${symbolLabel} stock chart`;

	return (
		<div
			className={`tradingview-widget-container ${className ?? ''}`}
			style={{ height: `${height}px`, width: '100%' }}
		>
			{title && <h2>{title}</h2>}
			<div
				className="tradingview-widget-container__widget"
				style={{ height: 'calc(100% - 32px)', width: '100%' }}
				ref={widgetRef}
			/>
			<div className="tradingview-widget-copyright">
				<a href={attributionUrl} rel="noopener nofollow" target="_blank">
					<span className="blue-text">{attributionText}</span>
				</a>
				<span className="trademark"> by TradingView</span>
			</div>
		</div>
	);
};

export default memo(TradingViewWidget);
