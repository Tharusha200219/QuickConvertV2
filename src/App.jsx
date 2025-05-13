import { useEffect } from "react";
import ImageConverter from "./components/ImageConverter";
import "./App.css";
import { Analytics } from "@vercel/analytics/next";
function App() {
  // Load AdSense script on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.onload = () => {
        // Initialize ads after script loads
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense initialization error:", e);
        }
      };
      document.head.appendChild(script);

      // Cleanup to avoid duplicate scripts
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="App">
      {/* Header with Banner Ad */}
      <header className="bg-primary text-white text-center py-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="ad-banner text-center">
                {/* AdSense Banner Ad */}
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="pub-3905224620109224" // Replace with your publisher ID
                  data-ad-slot="1234567890" // Replace with your ad slot ID
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            </div>
            <div className="col-12">
              <h1 className="display-4">Image Converter</h1>
              <p className="lead">
                Convert your images to PNG, JPEG, WEBP, BMP, or GIF formats with
                ease.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar Ad */}
      <main className="container">
        <div className="row">
          {/* Converter Section */}
          <div className="col-lg-8 mb-4">
            <ImageConverter />
          </div>
          {/* Sidebar Ad */}
          <div className="col-lg-4 mb-4">
            <div className="ad-sidebar sticky-top">
              {/* AdSense Skyscraper Ad */}
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="pub-3905224620109224" // Replace with your publisher ID
                data-ad-slot="0987654321" // Replace with your ad slot ID
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with Banner Ad */}
      <footer className="bg-light text-center py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="ad-banner text-center">
                {/* AdSense Banner Ad */}
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="pub-3905224620109224" // Replace with your publisher ID
                  data-ad-slot="1122334455" // Replace with your ad slot ID
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            </div>
            <div className="col-12">
              <p className="mb-0">
                © 2025 Image Converter. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
