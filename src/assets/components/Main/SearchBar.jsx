import React from 'react';
import styles from './SearchBar.module.css';


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
        </form>
    );
}
export default SearchBar;