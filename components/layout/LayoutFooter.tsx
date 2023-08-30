import React from 'react';
import ReactGA from 'react-ga4';

function LayoutFooter() {
  return (
    <div className="flex items-center justify-center py-4">
      <a
        className="text-sm"
        href="https://p12.network/"
        target="_blank"
        onClick={() => {
          ReactGA.event({ action: 'to_site', label: '', category: 'bridge' });
        }}
      >
        To P12 Website -&gt;
      </a>
    </div>
  );
}

export default React.memo(LayoutFooter);
