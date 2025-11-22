import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Our Library</h1>
        <p>
          Welcome to <strong>BookStore Library</strong> — a place where stories
          come alive and knowledge never sleeps. Our mission is to make reading
          more accessible, enjoyable, and inspiring for everyone.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-section">
        <div className="mission-card">
          <h2>📘 Our Mission</h2>
          <p>
            To connect readers with a diverse range of books — from timeless
            classics to modern bestsellers. We believe in the power of books to
            shape ideas, build empathy, and spark creativity.
          </p>
        </div>
        <div className="mission-card">
          <h2>🌍 Our Vision</h2>
          <p>
            To become a digital hub for book lovers — where technology meets
            literature, and every reader finds their perfect book in just a few
            clicks.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-section">
        <h2>Why Choose Us?</h2>
        <div className="why-grid">
          <div className="why-item">
            <h3>🕒 24/7 Access</h3>
            <p>
              Explore our digital library anytime, anywhere. Learning never has
              to stop!
            </p>
          </div>
          <div className="why-item">
            <h3>📖 Huge Collection</h3>
            <p>
              From science and fiction to self-help and biographies — we have it
              all under one roof.
            </p>
          </div>
          <div className="why-item">
            <h3>💳 Easy Borrowing</h3>
            <p>
              Add your favorite books to the cart and access them instantly
              through your account.
            </p>
          </div>
          <div className="why-item">
            <h3>⭐ Reader Friendly</h3>
            <p>
              Designed to give you a smooth, modern, and responsive experience
              on every device.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
