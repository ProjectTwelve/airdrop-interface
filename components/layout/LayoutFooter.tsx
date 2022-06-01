import React from 'react';

function LayoutFooter() {
  return (
    <div className="flex items-center justify-center py-4">
      <a className="text-sm" href="https://p12.network/" target="_blank">
        To P12 Landingsite -&gt;
      </a>
    </div>
  );
}

export default React.memo(LayoutFooter);
