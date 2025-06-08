import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '../../icon-search.svg';

function SearchBar({ onResults }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return; // Don't clear results if search is empty
    
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Please log in with Spotify first!');
      return;
    }
    const params = new URLSearchParams({
      q: searchValue,
      type: 'track',
      limit: 20,
    });
    const response = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    onResults(data.tracks ? data.tracks.items : []);
  };

  return (
    <form id="search-form" onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="Search for a song or artist..."
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        <img src={searchIcon} alt="search" className={styles.searchIcon} />
      </button>
    </form>
  );
}

export default SearchBar;