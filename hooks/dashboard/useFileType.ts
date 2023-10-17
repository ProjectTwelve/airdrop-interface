import { useEffect, useState } from 'react';

export function useFileType(uri: string) {
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    const extensionMatch = uri.match(/\.(\w+)$/);
    if (!extensionMatch) {
      setFileType('image');
      return;
    }
    const extension = extensionMatch[1];
    if (['mp4', 'avi', 'mov', 'webm'].includes(extension)) {
      setFileType('video');
    } else {
      setFileType('image');
    }
  }, [uri]);

  return fileType;
}
