import React from 'react';
import GoogleMap from './components/googleMaps';
import './styles/App.scss';

function App() {
    return (
        <main className="App">
            <header className="App-header">
                <h1>Texas Rivers</h1>
            </header>
            <section className="App-rivers">list of rivers...</section>
            <GoogleMap />
        </main>
    );
}

export default App;
