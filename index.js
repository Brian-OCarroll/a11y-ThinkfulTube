const youtube_search_url = 
'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
    const query = {
        part:'snippet',
        key:'AIzaSyD_wDVgxVvy12tK2DDDhCsFXhHiMhv6ihM',
        q:`${searchTerm}`,
        maxResults: '5',
    }
    $.getJSON(youtube_search_url, query, callback);
}

function renderResult(result) {
    // let videoID = `https://www.youtube.com/watch?v=${result.id.videoId}`
    //why won't clicking thumbnail work if href link is just a reference to the variable videoID
    return `
        <div><a class="js-result-title" target='_blank' href="https://www.youtube.com/watch?v=${result.id.videoId}">
        ${result.snippet.title}
        </a>
        </div>
        <div><a class="js-result-thumbnail" target='_blank' href='https://www.youtube.com/watch?v=${result.id.videoId}'>
        <img src="${result.snippet.thumbnails.medium.url}" alt="youtube-thumbnail">
        </a>
        </div>
    `;
}

function displayYoutubeSearchData(data) {
    const results = data.items.map((item, index) => renderResult(item));
    $('.js-results').html(results);
}

//function for submitting
function watchSubmit() {
$('.js-search-form').submit(function() {
    event.preventDefault;
    const queryTarget = $(this).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    // setting query as argument says searchTerm will be
    // set to whatever value the user inputs
    getDataFromApi(query, displayYoutubeSearchData);
});
}
$(watchSubmit);