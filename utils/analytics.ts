import ReactGA from 'react-ga4';
import { isBrowser } from './index';
import { getLocalStorage } from './storage';

const GOOGLE_ANALYTICS_ID: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const debug_mode = isBrowser ? getLocalStorage('ga_debug') : false;

if (typeof GOOGLE_ANALYTICS_ID === 'string') {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, { gtagOptions: { debug_mode } });
} else {
  ReactGA.initialize('test', { gtagOptions: { debug_mode } });
}
