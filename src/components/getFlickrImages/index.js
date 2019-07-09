import RiversJSON from '../../rivers.json';
const apiKey = '6c6069e831fb567b86c7d9b75c82624f';

// create list of tags to search
let tags = [];
RiversJSON.forEach(d => {
    tags.push(`texasrivers${d.id}`);
});

const getFlickrImages = tag => {
    // create document fragment to add all at once
    var baseURL = 'https://api.flickr.com/services/rest/?&method=flickr.photos.search';
    var docFrag = document.createDocumentFragment();
    // todo: use group_id to limit?

    // todo: just fetch all tags at once...
    // use list of tags to determine which album
    // create cdl of tags

    fetch(
        `${baseURL}&api_key=${apiKey}&tags=${tags}&per_page=10&tag_mode=any&sort=interestingness-asc&extras=tags&format=json&jsoncallback=?`
    )
        .then(function(data) {
            console.log('success!!!', data);
            return data.photos;
            //loop through the results with the following function
            // $.each(data.photos.photo, function(i, item) {
            //     var photoURL =
            //         'http://farm' +
            //         item.farm +
            //         '.static.flickr.com/' +
            //         item.server +
            //         '/' +
            //         item.id +
            //         '_' +
            //         item.secret;
            //     var square = photoURL + '_q.jpg'; // q = 150sq
            //     var photoMedium = photoURL + '_m.jpg'; // m = 240long
            //     var photoLarge = photoURL + '_b.jpg'; // b = 1024 on longest side,
            //     // set the photo href for larger views
            //     var photoHref = '//www.flickr.com/photos/' + item.owner + '/' + item.id;
            //     var photo = '<img src="' + square + '" />';
            //     // add photo to the docFrag
            //     $('<a/>')
            //         .attr('href', photoLarge)
            //         .attr('rel', 'prefetch')
            //         .attr('data-photohref', photoHref)
            //         .attr('data-largeurl', photoLarge)
            //         .attr('data-lightbox', 'kayaking')
            //         .appendTo(docFrag)
            //         .append(photo);
            // }); // END $.each
            // append once
            // TODO: why does this insert [object DocumentFragment]
            //flowApp.config.images.innerHTML = docFrag;
            //$(flowApp.config.images).html(docFrag);
        })
        .catch(function(error) {
            console.log(error);
            return null;
        });
};

export default getFlickrImages;
