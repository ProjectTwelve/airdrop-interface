import ReactGA from 'react-ga4';

const GOOGLE_ANALYTICS_ID: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

if (typeof GOOGLE_ANALYTICS_ID === 'string') {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, { gaOptions: { storage: 'none', storeGac: false } });
  ReactGA.set({ anonymizeIp: true });
} else {
  ReactGA.initialize('test', { gtagOptions: { debug_mode: true } });
}
