import React from 'react';
import GoogleMap from './components/googleMaps';
import River from './components/river';
import Rivers from './rivers.json';
import './styles/App.scss';

console.log(Rivers);

function App() {
    return (
        <main className="App">
            <header className="App-header">
                <h1>Texas Rivers</h1>
            </header>
            <ul className="App-rivers">
                {Rivers.map((d, i) => {
                    return <River key={i} title={d.name} description={d.description} />;
                })}
            </ul>
            <GoogleMap />
        </main>
    );
}

export default App;
