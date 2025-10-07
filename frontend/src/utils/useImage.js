import { useEffect, useState } from 'react';

export default function useImage(url, crossOrigin) {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!url) {
      setImage(null);
      setStatus('loading');
      return;
    }

    const img = new window.Image();

    function onLoad() {
      setImage(img);
      setStatus('loaded');
    }

    function onError() {
      setImage(null);
      setStatus('failed');
    }

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);

    if (crossOrigin) {
      img.crossOrigin = crossOrigin;
    }

    img.src = url;

    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [url, crossOrigin]);

  return [image, status];
}
