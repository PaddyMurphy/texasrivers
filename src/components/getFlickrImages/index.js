import $ from 'jquery'; // only using getJson - fetch-jsonp no worky
import RiversJSON from '../../rivers.json';
const apiKey = '6c6069e831fb567b86c7d9b75c82624f';

// create list of tags to search
let tags = [];
let fetched = false;
RiversJSON.forEach(d => {
    tags.push(`texasrivers${d.id}`);
});

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
