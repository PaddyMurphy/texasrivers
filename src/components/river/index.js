import React from 'react';
import Gallery from 'react-grid-gallery';
import './river.scss';

function River({
    categories,
    currentFlow,
    description,
    flowMax,
    flowMin,
    flowOptimum,
    id,
    length,
    name,
    photos,
    goToRiver,
}) {
    return (
        <li id={`river-${id}`} className="river">
            <button onClick={() => goToRiver(id)} className="btn-river h2">
                {name}
            </button>
            <div className="river-photos">
                {photos && <Gallery images={photos} margin={0} maxRows={1} />}
            </div>
            <div className="river-details">
                <ul>
                    <li>
                        <b>flow optimum:</b> {flowOptimum}
                    </li>
                    <li>
                        <b>flow min:</b> {flowMin}
                    </li>
                    <li>
                        <b>flow max:</b> {flowMax}
                    </li>
                </ul>
                <ul>
                    <li className="river-link">
                        <b>current flow:</b>{' '}
                        <span dangerouslySetInnerHTML={{ __html: currentFlow }}></span>
                    </li>
                    <li>
                        <b>length:</b> {length}
                    </li>
                    <li>
                        <b>activities:</b> {categories.join(', ')}
                    </li>
                </ul>
            </div>
            <p className="river-description">{description}</p>
        </li>
    );
}

export default React.memo(River);
