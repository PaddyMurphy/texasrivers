import React, { useEffect, useState } from 'react';
import GoogleMap from './components/googleMaps';
import River from './components/river';
import $ from 'jquery'; // only using getJson - fetch-jsonp no worky
import RiversJSON from './rivers.json';
import './styles/App.scss';

const apiKey = '6c6069e831fb567b86c7d9b75c82624f';
let ticking = false;
let fetched = false;
let tags = [];
RiversJSON.forEach(d => {
    tags.push(`texasrivers${d.id}`);
});

function App() {
    let [currentRiver, setCurrentRiver] = useState(undefined);
    let [activeSection, setActiveSection] = useState(0);
    let [images, setImages] = useState(undefined);

    const getFlickrImages = tag => {
        // only fetch once
        if (fetched) return null;
        fetched = true;
        // create document fragment to add all at once
        var baseURL = 'https://api.flickr.com/services/rest/?&method=flickr.photos.search';
        // use list of tags to determine which album
        $.getJSON(
            `${baseURL}&api_key=${apiKey}&tags=${tags}&per_page=10&tag_mode=any&sort=interestingness-asc&extras=tags&format=json&jsoncallback=?`,
            function(data) {
                console.log('success', data.photos);
                setImages(data.photos);
            }
        ).fail(function(error) {
            console.log(error);
            return null;
        });
    };

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

    const checkActiveSection = () => {
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
    };

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
        getFlickrImages();

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
                        return <River key={d.id} {...d} images={images} goToRiver={goToRiver} />;
                    })}
                </ul>
            </main>
            {currentRiver.latlong && <GoogleMap start={currentRiver.latlong} />}
        </>
    );
}

export default App;
