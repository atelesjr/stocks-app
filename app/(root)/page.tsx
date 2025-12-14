export const dynamic = 'force-dynamic';

import TradingViewWidget from '@/components/TradingViewWidget';
import {
	HEATMAP_WIDGET_CONFIG,
	MARKET_DATA_WIDGET_CONFIG,
	MARKET_OVERVIEW_WIDGET_CONFIG,
	TOP_STORIES_WIDGET_CONFIG,
} from '@/lib/constants';

const Home = () => {
	const scriptUrl =
		'https://s3.tradingview.com/external-embedding/embed-widget-';
	const marketOverviewWidget = `${scriptUrl}market-overview.js`;
	const stockHeatmapWidget = `${scriptUrl}stock-heatmap.js`;
	const timelineWidget = `${scriptUrl}timeline.js`;
	const marketQuoteWidget = `${scriptUrl}market-quotes.js`;

	return (
		<div className="flex min-h-screen home-wrapper">
			<section className="grid w-full gap-8 home-section">
				<div className="md:col-span-1 xl:col-span-1">
					<TradingViewWidget
						title="Market Overview"
						scriptUrl={marketOverviewWidget}
						config={MARKET_OVERVIEW_WIDGET_CONFIG}
						className="custom-chart"
					/>
				</div>
				<div className="md:col-span xl:col-span-2">
					<TradingViewWidget
						title="Stock Heatmap"
						scriptUrl={stockHeatmapWidget}
						config={HEATMAP_WIDGET_CONFIG}
						className="custom-chart"
					/>
				</div>
			</section>
			<section className="grid w-full gap-8 home-section">
				<div className="h-full md:col-span-1 xl:col-span-1">
					<TradingViewWidget
						title="Top Stories"
						scriptUrl={timelineWidget}
						config={TOP_STORIES_WIDGET_CONFIG}
						className="custom-chart"
					/>
				</div>
				<div className="h-full md:col-span-1 xl:col-span-2">
					<TradingViewWidget
						title="Market Quotes"
						scriptUrl={marketQuoteWidget}
						config={MARKET_DATA_WIDGET_CONFIG}
						className="custom-chart"
					/>
				</div>
			</section>
		</div>
	);
};

export default Home;
