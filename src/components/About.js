import React from 'react';
import './About.css'; 
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="about-section">
      <div className="container">
        <h2>Discover Qlean Stocks</h2>
        <p className="intro">
          Dive into the world of investing with Qlean Stocks, where clarity meets opportunity. We're not just a stock market platform; we're your partner in navigating the financial markets with ease and confidence.
        </p>
        <div className="mission-statement">
          <h3>Our Mission</h3>
          <p>
            To empower investors with crystal clear insights and cutting-edge tools, demystifying the stock market for all. From the fresh-faced novice to the seasoned trader, our platform is your beacon in the complex world of finance.
          </p>
        </div>
        <div className="testimonials">
          <h3>Hear from Our Users</h3>
          <ul>
            <li>"Qlean Stocks transformed the way I approach investing. It's intuitive, informative, and, most importantly, effective." - Alex J.</li>
            <li>"Thanks to Qlean Stocks, I finally feel in control of my investment decisions. It's been a game changer for my portfolio." - Samira K.</li>
          </ul>
        </div>
        <div className="call-to-action">
          <p>
            Ready to take your investing to the next level? Join Qlean Stocks today and start your journey towards financial success with clarity and confidence.
          </p>
          <Link to={'/stocks'} className='search-btn'>Explore Qlean Stocks</Link>
        </div>
      </div>
    </section>
  );
};

export default About;
