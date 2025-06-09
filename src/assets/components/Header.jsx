import React from 'react';

function Header() {
    return (
        <header>
            { /*For Testing > Click to clear localStorage */}
            <h1 onClick={() => { localStorage.removeItem('access_token'); window.location.reload(); }}>Ja<span className="clr-accent">mmm</span>ing</h1>
            <p>Create a Pla<span className="clr-accent">yyy</span>list</p>
        </header>
    )
}

export default Header;