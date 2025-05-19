import { useEffect, useState } from 'react';

const HeygenVideo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading && retryCount < 2) {
        setRetryCount(prev => prev + 1);
        // Force reload if taking too long
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.src = iframe.src;
        }
      } else if (isLoading) {
        setError('Video chat is taking too long to load. Please try refreshing the page.');
      }
    }, 5000); // Reduced timeout to 5 seconds

    return () => clearTimeout(timer);
  }, [isLoading, retryCount]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setRetryCount(0);
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <iframe
        src="https://labs.heygen.com/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJLYXR5YV9Qcm9mZXNzaW9uYWxMb29rMl9wdWJsaWMiLCJwcmV2aWV3SW1nIjoiaHR0cHM6Ly9maWxlczIuaGV5Z2VuLmFpL2F2YXRhci92My9kNTJmZmExYjQ0N2Q0ZjJmOGViMTY5MTdlN2VjMjIyYV81NTg3MC9wcmV2aWV3X3RhbGtfMS53ZWJwIiwibmVlZFJlbW92ZUJhY2tncm91bmQiOnRydWUsImtub3dsZWRnZUJhc2VJZCI6IjQ1N2ZjM2QxMmMzYjQyOGZiMWUyZTViNDVmYjc1YTlkIiwidXNlcm5hbWUiOiJmYTc4MDQzN2E2MGI0NGY1OTVjYjJjMjZjYzA0MjcxZCJ9&inIFrame=1"
        className="w-full h-full rounded-lg"
        style={{
          border: 'none',
          background: '#1a1a1a',
        }}
        allow="microphone; camera"
        onLoad={() => setIsLoading(false)}
        onError={() => setError('Failed to load video chat')}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="text-white text-center">
            <div className="mb-2">Loading video chat...</div>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="text-red-500 text-center p-4 bg-gray-800 rounded-lg">
            <div className="font-bold mb-2">Error Loading Video Chat</div>
            <div>{error}</div>
            <button 
              onClick={handleRetry}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeygenVideo; 