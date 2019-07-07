import React from 'react';

console.log('River yo');

function River({ description, title }) {
    return (
        <li className="River">
            <h2 className="River-title">{title}</h2>
            <p className="River-description">{description}</p>
        </li>
    );
}

export default React.memo(River);
