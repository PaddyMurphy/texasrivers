/* eslint-disable no-unused-vars */
/* global google */
import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps';
import PropTypes from 'prop-types';
import { MAPSTYLE_ORION } from './mapstyle-orion';
const indeedMarker = require('./indeed-marker.png');

// TODO:
// use props for params and remove state
// center map on initial load based on location
// fix invalid location error: InvalidValueError: setPosition: not a LatLng or LatLngLiteral: in property lat: not a number
// add styling...
// set markers within the bounds
// refetch on pan or zoom

class GoogleMap extends Component {
    state = {
        mapCenter: null,
        locationMarker: null,
        markers: [], // google objects, track to be deleted
    };

    map = null; // shared reference to Map object

    static defaultProps = {
        libraries: ['geometry'], // ['geometry', 'places']
        placesTypes: ['geocode'], // ['address', 'geocode', 'establishment']
        jobs: {},
        location: null,
    };

    static propTypes = {
        libraries: PropTypes.array,
        placesTypes: PropTypes.array,
        jobs: PropTypes.object,
        location: PropTypes.string,
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
        const { latitude = 30.2672, longitude = -97.7431 } = this.props;
        // save map to root for reference
        // eslint-disable-next-line
        this.map = new google.maps.Map(googleMap, {
            disableDefaultUI: true,
            center: { lat: latitude, lng: longitude },
            mapTypeId: 'terrain', // hybrid, roadmap, satellite, terrain
            scrollwheel: false,
            styles: MAPSTYLE_ORION,
            zoom: 12,
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
