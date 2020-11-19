/* what I need to call NPS API:
- authentication: yes, api_key in q param
- API key: nhbz6vHQiA3cxQvvtjnV8egSqABiX9snUwftUNi3
- Base URL: https://developer.nps.gov/api/v1
- CORS: ?
- response data format: JSON
- response status code: yes
- response data structure: [Park {total:string, data: [i{...}], limit:string, start:string]
- any limitations?
- endpoints URL: /parks
- endpoints query needed: api_key, stateCode
- endpoints body needed: no
*/

//API Key
const apiKey = "nhbz6vHQiA3cxQvvtjnV8egSqABiX9snUwftUNi3";
//API Base URL
const apiUrl = 'https://developer.nps.gov/api/v1/parks';

function buildQueryParams(params) {
  //take object, for each key/value pair build a param/value pair
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  //return string with params
  return queryItems.join('&');
}

function displayResults(responseJson) {
  //remove previous results
  $('#results-list').empty();
  console.log(responseJson);
  //loop through responseJson
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append(
      `<li>
        <h3>
          <a target="_blank" href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a>
        </h3>
        <p>${responseJson.data[i].description}</p>
        <div>
          <p>Address: </p>
          <p>${responseJson.data[i].addresses[0].line1}</p>
          <p>${responseJson.data[i].addresses[0].line2}</p>
          <p>${responseJson.data[i].addresses[0].city}, 
            ${responseJson.data[i].addresses[0].stateCode} 
            ${responseJson.data[i].addresses[0].postalCode}</p>
        </div>
      </li>`
    )
  }
  //add to html ul each element with full name of the NP, description, website url, NP address
  //remove hidden class
  $('#results').removeClass('hidden');
}

function getResults(stateCode, resultsLimit) {
  //build header with apiKey
  const options = {
    headers: new Headers({
      'X-Api-Key': apiKey
    })
  };
  //params
  const params = {
    limit: resultsLimit,
  };

  //build and add multiple statecodes to queryString
  const stateCodeList = stateCode.split(",");
  let stateCodeQuery = '';
  for (const property in stateCodeList) {
    stateCodeQuery += `statecode=${stateCodeList[property]}` + '&';
  }
  let stateCodeQueryString = '&' + stateCodeQuery.slice(0, -1);

  //build final api call
  const queryString = buildQueryParams(params);
  const apiCall = apiUrl + '?' + queryString + stateCodeQueryString;

  //call API
  fetch(apiCall, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('.js-error-message').text(`An error occured: ${error.message}`);
    });
}

function submitForm() {
  //watch for submit event
  $('form').submit(event => {
    event.preventDefault();
    //get user entry area = stateCode
    const stateCode = $('#area').val();
    //get user entry limit = resultsLimit
    const resultsLimit = $('#js-max-results').val();
    //get and display results, getResults(stateCode, resultsLimit)
    getResults(stateCode, resultsLimit);
  });
}

$(submitForm);