/* eslint-disable no-unused-vars */
/* global google */
import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps';
import PropTypes from 'prop-types';
import { MAPSTYLE_ORION } from './mapstyle-orion';
//import RiversJSON from './rivers.json';
const indeedMarker = require('./indeed-marker.png');

class GoogleMap extends Component {
    state = {
        mapCenter: null,
        locationMarker: null,
        markers: [], // google objects, track to be deleted
    };

    map = null; // shared reference to Map object

    static defaultProps = {
        jobs: {},
        libraries: ['geometry'], // ['geometry', 'places']
        location: null,
        placesTypes: ['geocode'], // ['address', 'geocode', 'establishment']
    };

    static propTypes = {
        jobs: PropTypes.object,
        libraries: PropTypes.array,
        location: PropTypes.string,
        placesTypes: PropTypes.array,
        start: PropTypes.array.isRequired,
    };

    componentDidMount() {
        //make sure google maps API is loaded then proceed
        if (typeof google !== 'undefined') {
            this.initializeGoogle();
        } else {
            this.loadGoogleMapsAPI(() => {
                this.initializeGoogle();
            });
        }
    }

    // google maps places api
    // NOTE: using patrick's personal key with limits set so I don't get charged
    // admin https://console.cloud.google.com/apis
    loadGoogleMapsAPI(callback) {
        // load google maps
        GoogleMapsLoader.VERSION = '3.36';
        GoogleMapsLoader.KEY = 'AIzaSyDf-t-gqXzgp18H4Zulo_q2tDWUjvkEjtU';
        GoogleMapsLoader.LIBRARIES = this.props.libraries;
        GoogleMapsLoader.load(google => {});
        GoogleMapsLoader.onLoad(google => {
            if (callback) callback();
        });
    }

    initializeGoogle = () => {
        const { googleMap } = this; // use googleMap ref to locate map
        // defaults lat/lng to Austin
        const { start } = this.props;
        // save map to root for reference
        // eslint-disable-next-line
        this.map = new google.maps.Map(googleMap, {
            //disableDefaultUI: true,
            center: { lat: start[0], lng: start[1] },
            mapTypeId: 'terrain', // hybrid, roadmap, satellite, terrain
            //scrollwheel: false,
            styles: MAPSTYLE_ORION,
            zoom: 14,
        });
    };

    clearMarkers = () => {
        const { markers } = this.state;
        if (!markers.length) return null;

        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        // remove old markers
        this.setState({
            markers: [],
        });

        return false;
    };

    render() {
        const mapStyle = {
            flex: 1,
            position: 'fixed',
            left: '0',
            top: '0',
            width: '100vw',
            height: '100%',
            zIndex: '-1',
        };
        return (
            <>
                <div
                    ref={c => {
                        this.googleMap = c;
                    }}
                    style={mapStyle}
                    id="google-map"
                />
            </>
        );
    }
}

export default GoogleMap;
