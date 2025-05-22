import React from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '../../icon-search.svg';


function SearchBar({ onSearch, searchValue }) {
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