import 'antd/dist/antd.css';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Popover, Button } from 'antd';
import Movie from './Movie';

export default function Home() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  const updateLikedMovies = (movieTitle) => {
    if (likedMovies.find((movie) => movie === movieTitle)) {
      setLikedMovies(likedMovies.filter((el) => el !== movieTitle));
    } else {
      setLikedMovies([...likedMovies, movieTitle]);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '99a959537352a345ae214a14d1a4c48c';
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
        const response = await axios.get(apiUrl);
        const formattedMovies = response.data.results.map((movie) => ({
          title: movie.title,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
          overview: movie.overview.length > 250 ? `${movie.overview.substring(0, 250)}...` : movie.overview,
        }));
        setMovies(formattedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []); 

  const moviesList = movies.map((movie, i) => {
    const isLiked = likedMovies.some((mov) => mov === movie.title);

    return (
      <Movie
        key={i}
        {...movie}
        updateLikedMovies={updateLikedMovies}
        isLiked={isLiked}
      />
    );
  });

  let popoverMovies = likedMovies.map((movie, i) => {
    return (
      <li key={i}>
        {movie}
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => updateLikedMovies(movie)}
          className={styles.crossIcon}
        />
      </li>
    );
  });

  const popoverContent = (
    <div className={styles.popoverContent}>{popoverMovies}</div>
  );


  const moviesData = [
    {
      title: 'Forrest Gump',
      poster: 'forrestgump.jpg',
      voteAverage: 9.2,
      voteCount: 22_705,
      overview:
        'A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case.',
    },
    {
      title: 'The Dark Knight',
      poster: 'thedarkknight.jpg',
      voteAverage: 8.5,
      voteCount: 27_547,
      overview:
        'Batman raises the stakes in his war on crime and sets out to dismantle the remaining criminal organizations that plague the streets.',
    },
    {
      title: 'Your name',
      poster: 'yourname.jpg',
      voteAverage: 8.5,
      voteCount: 8_691,
      overview:
        'High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places.',
    },
    {
      title: 'Iron Man',
      poster: 'ironman.jpg',
      voteAverage: 7.6,
      voteCount: 22_7726,
      overview:
        'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
    },
    {
      title: 'Inception',
      poster: 'inception.jpg',
      voteAverage: 8.4,
      voteCount: 31_546,
      overview:
        'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.',
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocontainer}>
          <img src="logo.png" alt="Logo" />
          <img className={styles.logo} src="logoletter.png" alt="Letter logo" />
        </div>
        <Popover
          title="Liked movies"
          content={popoverContent}
          className={styles.popover}
          trigger="click"
        >
          <Button>♥ {likedMovies.length} movie(s)</Button>
        </Popover>
      </div>
      <div className={styles.title}>LAST RELEASES</div>
      <div className={styles.moviesContainer}>{moviesList}</div>
    </div>
  );
}
