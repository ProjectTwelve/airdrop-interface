import ReactGA from 'react-ga4';

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

if (GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID);
} else {
  ReactGA.initialize('test', { testMode: true });
}
