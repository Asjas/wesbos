import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

const url = `https://syntax.fm/api/shows/latest`;

const PodStyles = styled.div`
  time {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .logo {
    width: 100%;
  }
`;

function useLatestPodcast() {
  const [podcast, setPodcast] = useState();
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPodcast(data);
      });
  }, []);
  return { podcast };
}

export default function Instagram() {
  const { podcast } = useLatestPodcast();
  if (!podcast)
    return (
      <PodStyles>
        <h3>
          <span className="highlight">Syntax Podcast</span>
        </h3>
        <p>Hold on — I'm grabbin' the last one.</p>
        <a href="https://syntax.fm/">Listen Now → </a>
        <StaticImage alt="Syntax Podcast" src="../assets/images/syntax-logo.jpg" />
      </PodStyles>
    );
  return (
    <PodStyles>
      <h3>
        <span className="highlight">Syntax Podcast: #{podcast.number}</span>
      </h3>
      <StaticImage width="500" alt="Syntax Podcast" src="../assets/images/syntax-logo.jpg" />
      <time>{podcast.displayDate}</time>
      <p>{podcast.title}</p>
      <a href={`https://syntax.fm/show/${podcast.number}/${podcast.slug}`}>Listen Now → </a>
    </PodStyles>
  );
}
