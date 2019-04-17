'use strict';

function getDogImage(dogCount) {
 fetch(`https://dog.ceo/api/breeds/image/random/${dogCount}`)
    .then(response => response.json())
    .then(responseJson => 
        logResults(responseJson))
     // displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function logResults(responseJson) {
  responseJson.message.forEach(item => {
    console.log(item);
  });
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  $('.results-img').replaceWith(
    `<img src="${responseJson.message}" class="results-img">`
  )
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let dogCount = $("#userDogsRequested").val();
    $("#userDogsRequested").val("3");

    getDogImage(dogCount);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});


/* app that lets users choose to display between 1 - 50 random dog images
    - prints the results to the console
    - App should feature form with ** required ** input
        - user must indicate number of images to retrieve
            - input default is 3
    
    - Use the Endpoint described in 
        "DISPLAY MULTIPLE RANDOM IMAGES FROM ALL DOGS COLLECTION" section

        https://dog.ceo/api/breeds/image/random/3
        max number is 50
*/