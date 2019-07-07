import React from 'react';
import GoogleMap from './components/googleMaps';
import River from './components/river';
import RiversJSON from './rivers.json';
import './styles/App.scss';

console.log(RiversJSON);
let start = undefined;

const goToRiver = river => {
    console.log(river);
};

function App() {
    return (
        <>
            <main className="App">
                <header className="App-header">
                    <h1>Texas Rivers</h1>
                </header>
                <ul className="App-rivers">
                    {RiversJSON.map((d, i) => {
                        if (!start && d.id === 'guadalupe') {
                            start = d.latlong;
                        }
                        return (
                            <River
                                key={i}
                                title={d.name}
                                description={d.description}
                                goToRiver={goToRiver}
                            />
                        );
                    })}
                </ul>
            </main>
            <GoogleMap start={start} />
        </>
    );
}

export default App;
