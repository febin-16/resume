import React, { useEffect } from 'react';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function TownscriptWidget() {
  useEffect(() => {
    async function loadTownscriptWidget() {
      await loadScript('https://www.townscript.com/static/Bookingflow/js/townscript-widget.nocache.js');
    }

    loadTownscriptWidget();

    return () => {
      // Cleanup function to remove the script from the DOM if the component unmounts
      const scriptElement = document.querySelector('script[src="https://www.townscript.com/static/Bookingflow/js/townscript-widget.nocache.js"]');
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  function popup(eventId) {
    // Call the popup function from the external script
    if (window.popup) {
      window.popup(eventId);
    } else {
      console.error('Popup function not found in the external script.');
    }
  }

  return (
    <div>
      <button onClick={() => popup('iedc-pandora-004311')} className="tsbutton">Register Now</button>
      <noscript id="tsNoJsMsg">Javascript on your browser is not enabled.</noscript>
    </div>
  );
}

export default TownscriptWidget;
