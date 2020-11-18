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
const apiUrl = 'https://developer.nps.gov/api/v1';

function buildQueryParams(params) {
  //take object, for each key/value pair build a param/value pair
  //return string with params
}

function displayResults(responseJson) {
  //remove previous results
  //loop through responseJson
  //add to html ul each element with full name of the NP, description, website url, NP address
  //remove hidden class
}

function getResults(query, resultsLimit) {
  console.log("Yay, getResults run!")
  //const params = object with params needed
  //call buildQueryParams(params) to get queryString
  //build apiCall = apiUrl + queryString
  //call API
  //display list to html, displayResults(responseJSon)
  //handle errors
}

function submitForm() {
  //watch for submit event
  $('form').submit(event => {
    event.preventDefault();
    //get user entry area = stateCode param
    const stateCode = $('#area').val();
    //get user entry limit = resultsLimit
    const resultsLimit = $('#js-max-results').val();
    console.log(stateCode);
    console.log(resultsLimit);
    //get and display results, getResults(stateCode, resultsLimit)
    getResults(stateCode, resultsLimit);
  });
}

$(submitForm);