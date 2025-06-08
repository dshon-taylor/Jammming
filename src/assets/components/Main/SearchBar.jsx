import React from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '../../icon-search.svg';


function SearchBar({ onSearch, searchValue }) {

    fetch('https://api.spotify.com/v1/search', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
        },
        params: {
            q: searchValue,
            type: 'track,artist',
            limit: 10
        }
    })
    .then(response => response.json())
    .then(data => {
        // Handle the search results here
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching search results:', error);
    });

    return (
        <form id="search-form" onSubmit={e => e.preventDefault()}>
            <input
                type="search"
                placeholder="Search for a song or artist..."
                value={searchValue}
                onChange={onSearch}
                className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
                
                <img src={searchIcon} alt="search" className={styles.searchIcon} />
            </button>
        </form>
    );
}
export default SearchBar;