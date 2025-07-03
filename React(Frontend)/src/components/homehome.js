import React from "react";

const Homehome = () => {
  return (
    <div className="container mt-5">
      <header className="text-center mb-4">
        <h1 className="display-4">Welcome to the File Sharing Platform</h1>
        <p className="lead">Easily share files with friends and colleagues!</p>
      </header>

      <section className="text-center mb-5">
        <h2 className="display-5">Features</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Secure Upload</h5>
                <p className="card-text">
                  Upload your files securely and share them with anyone.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Instant Sharing</h5>
                <p className="card-text">
                  Share your files instantly with just a link.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">User-Friendly Interface</h5>
                <p className="card-text">
                  Our platform is easy to use and navigate for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center">
        <p>&copy; 2024 File Sharing Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Homehome;
