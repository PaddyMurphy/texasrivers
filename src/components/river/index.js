import React from 'react';

function River({ description, title, goToRiver }) {
    return (
        <li className="River">
            <h2 className="River-title">
                <button onClick={d => goToRiver(d.target)} className="btn-river">
                    {title}
                </button>
            </h2>
            <p className="River-description">{description}</p>
        </li>
    );
}

export default React.memo(River);
