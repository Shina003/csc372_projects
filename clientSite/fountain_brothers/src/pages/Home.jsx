import React from 'react';
import ImageGallery from '../components/ImageGallery';
import Section from '../components/Section';
import './Home.css';

const Home = () => {
  const missionContent = "At Fountain Brothers of Nigeria, we empower individuals and communities to drive sustainable transformation, and positive change. We achieve this by providing education, promoting self-awareness, and fostering economic opportunities that lift our people out of poverty.";

  const visionContent = "Our vision is to liberate our community from the shackles of poverty, unlocking a brighter future through education, self-awareness, and economic empowerment. We strive to build a society where every individual has equal access to opportunities, resources, and support, enabling them to reach their full potential.";

  return (
    <div className="home-container">
      <div className="intro-text">
        <h1>Fountain Brothers</h1>
        <p>
          The Fountain Brothers Club was founded in 2007 in Egbeda, Lagos State, Nigeria.
          Our journey began with informal evening gatherings at the White House, owned by
          an Ekiti indigene. As we shared stories and laughter, we discovered a common bond –
          our Ekiti heritage and the shared values of "Omoluabi," which embodies good character.

          Our club's foundation is built on the principles of boldness, transparency, and a strong
          sense of community. Despite our members relocating to different parts of the country in
          pursuit of new opportunities, our bond has only grown stronger.

          We began with 11 members and have since maintained a strong core of 10, while remaining
          open to welcoming new members who share our values. Our diverse professional backgrounds
          have created a rich tapestry of expertise, allowing us to support and uplift each other.

          Our daily evening convergences became a cherished ritual, fostering a sense of belonging
          and camaraderie. This shared experience inspired us to formalize our gatherings, leading
          to the establishment of the Fountain Brothers Club.

          We owe a debt of gratitude to Benson Adewumi, who played a pivotal role in introducing
          many of our members to one another. Today, we celebrate our unique bond, shared values,
          and unstoppable sense of humor.
        </p>
      </div>
      <ImageGallery />
      <Section title="Our Mission" content={missionContent} alignment="start" />
      <Section title="Our Vision" content={visionContent} alignment="end" />
    </div>
  );
};

export default Home;
