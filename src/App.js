import React, { useCallback, useEffect, useState } from 'react';
import GoogleMap from './components/googleMaps';
import River from './components/river';
import RiversJSON from './rivers.json';
import './styles/App.scss';

let ticking = false;
let tags = [];
RiversJSON.forEach(d => {
    tags.push(`texasrivers${d.id}`);
});

function App() {
    let [currentRiver, setCurrentRiver] = useState(undefined);
    let [activeSection, setActiveSection] = useState(0);

    const goToRiver = river => {
        const newRiver = RiversJSON.find(r => {
            return r.id === river;
        });
        const newRiverEl = document.getElementById(`river-${river}`);
        // set the map postion and scroll to the title
        setCurrentRiver(newRiver);
        //newRiverEl.classList.add('active');
        newRiverEl.scrollIntoView();
    };

    const checkActiveSection = useCallback(() => {
        let rivers = Array.from(document.querySelectorAll('.river'));
        const navLinks = document.querySelectorAll('.btn-river');
        //let activeLink = null;
        // create array to filter
        rivers = rivers.map(d => {
            return { top: d.getBoundingClientRect().top, id: d.id };
        });
        // active is the first item > 0.
        let active = rivers.filter(d => d.top >= 0)[0];
        // if undefined then it's the last section
        active = active || rivers[rivers.length - 1];
        // only update if changed
        if (active.id === activeSection) return;
        // unstyle links and add the active
        navLinks.forEach(d => d.classList.remove('active'));
        //activeLink = document.querySelector(`[data-value='${active.id}']`);
        //activeLink.classList.add('active');
        // set active to compare
        setActiveSection(active.id);
        goToRiver(active.id.replace('river-', ''));
        //console.log(activeSection);
    }, [activeSection]);

    const handleScroll = () => {
        // throttle scrolling
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkActiveSection();
                ticking = false;
            });

            ticking = true;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            // cleanup
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <>
            <main className="App">
                <header className="App-header">
                    <h1>Texas Rivers</h1>
                </header>
                <ul className="App-rivers">
                    {RiversJSON.map((d, i) => {
                        // default to the guad
                        if (!currentRiver && d.id === 'guadalupe') {
                            currentRiver = d;
                        }
                        return <River key={d.id} {...d} goToRiver={goToRiver} />;
                    })}
                </ul>
                <div className="todo">
                    <h3>TODO:</h3>
                    <ul>
                        <li>Add map markers with put in/ take out info</li>
                        <li>Add map markers for campsites and POI</li>
                        <li>toggle showing the entire map</li>
                        <li>have selectable river sections for days and overnight trips</li>
                    </ul>
                </div>
            </main>
            {currentRiver.latlong && <GoogleMap start={currentRiver.latlong} />}
        </>
    );
}

export default App;
