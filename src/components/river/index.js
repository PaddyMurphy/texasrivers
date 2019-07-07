import React from 'react';

function River({ description, id, name, goToRiver }) {
    return (
        <li className="River">
            <h2 className="River-title">
                <button onClick={d => goToRiver(id)} className="btn-river">
                    {name}
                </button>
            </h2>
            <p className="River-description">{description}</p>
        </li>
    );
}

export default React.memo(River);
