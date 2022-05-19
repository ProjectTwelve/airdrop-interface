import React from 'react';
import { useRouter } from 'next/router';

export default function Developer() {
  const router = useRouter();

  return (
    <main>
      <div className="inline-block cursor-pointer" onClick={() => router.back()}>
        Back
      </div>
      <h2>Developer</h2>
    </main>
  );
}
