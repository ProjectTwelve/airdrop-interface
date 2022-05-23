import React, { useState } from 'react';
import Image from 'next/image';
import Tag from '../tag';

function DeveloperStatus() {
  const [games] = useState(4);

  return (
    <div className="flex overflow-hidden">
      <div className="flex items-center justify-center gap-3 border-r border-p12-line px-3 text-xl">
        <Tag type="error" value="Not Eligible" />
      </div>
      <div className="flex items-center justify-center gap-2 border-r border-p12-line px-3 font-['D-DIN'] text-xl">
        <span className="text-p12-success">{games}</span>Games
      </div>
      <div className="flex items-center justify-center gap-3 border-r border-p12-line px-3 text-xl">
        <p className="font-['D-DIN'] font-bold">?,???</p>
        <Image width={30} height={30} src="/img/p12.png" alt="p12" />
      </div>
    </div>
  );
}

export default React.memo(DeveloperStatus);
