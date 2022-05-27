import React from 'react';

/**
 * Empty
 * @constructor
 */
export default function Empty() {
  return (
    <div className="my-8 text-center">
      <img className="mx-auto mb-2" src="/svg/empty.svg" alt="empty" />
      <p className="mt-4 text-sm text-p12-bg">No Data</p>
    </div>
  );
}
