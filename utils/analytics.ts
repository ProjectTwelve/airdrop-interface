import ReactGA from 'react-ga4';
import { isBrowser } from './index';
import { getLocalStorage } from './storage';

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const debug_mode = isBrowser ? getLocalStorage('ga_debug') : false;

if (GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, { gtagOptions: { debug_mode } });
} else {
  ReactGA.initialize('test', { testMode: true, gtagOptions: { debug_mode } });
}
