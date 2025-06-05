import React from 'react';

function Button({ text, onClick, className }) {
    return (
        <button className={className} onClick={onClick} type="submit">
            {text}
        </button>
    );
}

export default Button;