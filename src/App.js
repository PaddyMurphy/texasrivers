import React, { useState } from 'react';
import GoogleMap from './components/googleMaps';
import River from './components/river';
import RiversJSON from './rivers.json';
import './styles/App.scss';

console.log(RiversJSON);

function App() {
    let [currentRiver, setCurrentRiver] = useState(undefined);

    const goToRiver = river => {
        console.log(river);
        const newRiver = RiversJSON.find(r => {
            return r.id === river;
        });
        console.log(newRiver.latlong);
        setCurrentRiver(newRiver.latlong);
    };

    return (
        <>
            <main className="App">
                <header className="App-header">
                    <h1>Texas Rivers</h1>
                </header>
                <ul className="App-rivers">
                    {RiversJSON.map((d, i) => {
                        if (!currentRiver && d.id === 'guadalupe') {
                            currentRiver = d.latlong;
                        }
                        return <River {...d} goToRiver={goToRiver} />;
                    })}
                </ul>
            </main>
            <GoogleMap start={currentRiver} />
        </>
    );
}

export default App;
