import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const books = [
    {
      title: "Whispers of the Wind",
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
    {
      title: "The Light Within",
      img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
    },
    {
      title: "Infinite Realms",
      img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    },
    {
      title: "Beyond the Horizon",
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    {
      title: "Ocean of Dreams",
      img: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d",
    },
    {
      title: "Echoes of Time",
      img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    },
  ];

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section fade-in">
        <div className="hero-text slide-up">
          <h1>Welcome to BookStore 📚</h1>
          <p>
            Discover your next favorite read. Dive into stories that inspire,
            entertain, and stay with you forever.
          </p>
          <button className="browse-btn" onClick={() => navigate("/categories")}>
            Explore Categories
          </button>
        </div>

        <div className="hero-img slide-right">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            alt="Library"
          />
        </div>
      </section>

      {/* Book Gallery Section */}
      <section className="book-gallery fade-in">
        <h2>New Arrivals</h2>
        <div className="gallery-container">
          {books.map((book, index) => (
            <div className="gallery-item" key={index}>
              <img src={book.img} alt={book.title} />
              <h3>{book.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section fade-in">
        <p>
          “A room without books is like a body without a soul.” — Marcus Tullius Cicero
        </p>
      </section>
    </div>
  );
}

export default Home;
