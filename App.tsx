
import React, { useState, useCallback, useEffect } from 'react';
import { generateCuteMessage } from './services/geminiService';
import { MESSAGE_INTERVAL_MS, NOTIFICATION_ICON_URL } from './constants';
import HeartIcon from './components/HeartIcon'; // For UI, not notification icon directly
import LoadingSpinner from './components/LoadingSpinner';

// Helper to create a simple notification icon (optional, can be a URL to an image)
// For this example, we'll use a placeholder and refer to NOTIFICATION_ICON_URL
// if you add an actual image to your project later.

const App: React.FC = () => {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(Notification.permission);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastError, setLastError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      setLastError("This browser does not support desktop notification.");
      setNotificationPermission('denied'); // Treat as denied if not supported
      return;
    }
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        new Notification("Dev's Little Messenger Activated! 💌", {
          body: "Naano, I'll send you sweet messages from Dev here!",
          icon: NOTIFICATION_ICON_URL, 
        });
      }
    } else {
        setNotificationPermission(Notification.permission);
    }
  }, []);

  const showBrowserNotification = useCallback((title: string, body: string, isError: boolean = false) => {
    if (notificationPermission === 'granted') {
      const notificationOptions: NotificationOptions = {
        body: body,
        icon: NOTIFICATION_ICON_URL, 
        tag: 'dev-naano-message' // Allows replacing old notification if a new one comes with same tag
      };
      try {
        new Notification(title, notificationOptions);
      } catch (e) {
        console.error("Error showing notification:", e);
        // This can happen if the icon URL is invalid or other minor issues.
        // Fallback to simpler notification if icon fails.
        try {
          new Notification(title, { body: body, tag: 'dev-naano-message' });
        } catch (fallbackError) {
          console.error("Error showing fallback notification:", fallbackError);
        }
      }
    } else {
      console.warn("Notification permission not granted. Message for Naano:", body);
      // Optionally, could update UI state here if permission was denied after initial grant
    }
  }, [notificationPermission]);

  const fetchAndNotify = useCallback(async () => {
    if (notificationPermission !== 'granted' && Notification.permission !== 'granted') {
      // If permission isn't granted yet, don't fetch.
      // The main UI will guide user. If it was denied, it won't proceed.
      console.log("Notification permission not granted. Skipping message fetch.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLastError(null);
    try {
      const cuteMsg = await generateCuteMessage();
      showBrowserNotification("A little message from Dev for Naano ❤️", cuteMsg);
    } catch (err) {
      let errorMessage = "An unknown error occurred. Dev will fix me! 🛠️";
      if (err instanceof Error) {
        errorMessage = err.message; // Use the specific error from geminiService
      }
      setLastError(errorMessage); // Update UI state with the error
      showBrowserNotification("Oh no, a little hiccup! 🥺", errorMessage, true);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  }, [notificationPermission, showBrowserNotification]);

  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  useEffect(() => {
    // Only set up interval if permission is granted.
    if (notificationPermission === 'granted') {
      // Fetch the first message immediately if permission granted
      if(isInitialLoad) { // Check if it's the very first load sequence
         fetchAndNotify();
      }
      
      const intervalId = setInterval(fetchAndNotify, MESSAGE_INTERVAL_MS);
      return () => clearInterval(intervalId);
    } else if (notificationPermission === 'denied') {
        setIsLoading(false); // Stop loading if permission is denied
        setIsInitialLoad(false);
    }
    // If 'default', we wait for user interaction via requestNotificationPermission.
    // If 'denied', the interval won't start.
  }, [notificationPermission, fetchAndNotify, isInitialLoad]);


  const renderPermissionStatus = () => {
    switch (notificationPermission) {
      case 'granted':
        return (
          <p className="text-green-700 bg-green-100 p-3 rounded-md text-sm">
            Notification permission granted! You'll receive lovely messages from Dev.
          </p>
        );
      case 'denied':
        return (
          <p className="text-red-700 bg-red-100 p-3 rounded-md text-sm">
            Notification permission denied. 😟 Naano, please enable notifications for this site in your browser settings if you want messages from Dev.
          </p>
        );
      case 'default':
        return (
          <button
            onClick={requestNotificationPermission}
            className="mt-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-150 ease-in-out flex items-center justify-center"
          >
            <HeartIcon className="w-5 h-5 mr-2" /> Enable Notifications from Dev
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-rose-300 to-fuchsia-300 flex flex-col items-center justify-center p-4 text-center">
      <main className="bg-white/80 backdrop-blur-lg p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full">
        <div className="text-6xl mb-6 animate-pulse" role="img" aria-label="Sparkling Heart">
          💖✨
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-rose-600 mb-4">
          Sweet Notes for Naano
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          Hi Naano! Dev set this special messenger up just for you.
          Cute messages from him will appear as notifications on your device.
        </p>

        {renderPermissionStatus()}

        {(isLoading && (notificationPermission === 'granted' || notificationPermission === 'default')) && (
          <div className="flex justify-center items-center mt-6">
            <LoadingSpinner size="w-8 h-8" color="text-rose-500" />
            <p className="ml-3 text-rose-500">
              {isInitialLoad ? "Preparing the first message..." : "Thinking of a new sweet message for you, Naano..."}
            </p>
          </div>
        )}

        {lastError && (
            <p className="mt-4 text-sm text-red-600 bg-red-100 p-2 rounded-md">
                <strong>Dev's Messenger says:</strong> {lastError}
            </p>
        )}
        
        {!process.env.API_KEY && (
          <p className="mt-6 text-xs text-red-600 bg-red-100 p-2 rounded-md">
            <strong>Dev's Note:</strong> The AI service needs an API key. If Naano isn't getting messages, check the <code>API_KEY</code>.
          </p>
        )}
      </main>

      <footer className="mt-12 text-sm text-white/80">
        <p>With All My Love, from Your Dev to My Naano ❤️</p>
        <p>&copy; {new Date().getFullYear()} Always & Forever Inc.</p>
      </footer>
    </div>
  );
};

export default App;
