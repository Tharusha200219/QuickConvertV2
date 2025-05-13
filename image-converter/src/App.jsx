import ImageConverter from "./components/ImageConverter";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Header with Banner Ad */}
      <header className="bg-primary text-white text-center py-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="ad-banner text-center">
                <img
                  src="https://via.placeholder.com/728x90?text=Header+Ad"
                  alt="Header advertisement"
                  className="img-fluid rounded"
                  style={{ maxWidth: "100%" }}
                />
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
              <img
                src="https://via.placeholder.com/300x600?text=Sidebar+Ad"
                alt="Sidebar advertisement"
                className="img-fluid rounded"
                style={{ maxWidth: "100%" }}
              />
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
                <img
                  src="https://via.placeholder.com/728x90?text=Footer+Ad"
                  alt="Footer advertisement"
                  className="img-fluid rounded"
                  style={{ maxWidth: "100%" }}
                />
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
