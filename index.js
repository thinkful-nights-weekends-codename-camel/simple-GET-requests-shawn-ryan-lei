'use strict';
function getDogBreeds() {
    // gets list of breeds (not sub-breeds) from Dog API
    fetch(`https://dog.ceo/api/breeds/list/all`)
    .then(response => response.json())
    .then(responseJson => 
        createDropDownList(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function createDropDownList(responseJson) {
    // creates a dropdown of breeds for user to select
    // value and text = a dog breed 
        // needs to be an item from the array of responseJson.message
        // get a list of the keys (breeds)
        // use list of keys to build HTML - > list of options for user select
        // selection dropdown will look similar to displayResults
    let dogBreedsList = Object.keys(responseJson.message);  // array of breeds from object
//    console.log(dogBreedsList);
    dogBreedsList.push('t-rex');    // adds fake breed
    let dogBreedOptions = `<select id="userDogBreed" name="breeds">`; 
                            // use this id to get user's selected breed
    for(let i = 0; i < dogBreedsList.length; i++) {
        dogBreedOptions += `<option value="${dogBreedsList[i]}">${dogBreedsList[i]}</option>`;
    }
    dogBreedOptions += `</select>`;
    $(dogBreedOptions).insertBefore("#dogBreed");  
    // put this selection before submit button
}

function getDogImage(userDogBreed) {
 fetch(`https://dog.ceo/api/breed/${userDogBreed}/images/random`)
    .then(response =>  {
      if (response.ok) {
        return response.json();
      } 
      throw new Error(response.statusText);
    })
    .then(responseJson => 
       displayResults(responseJson))
    .catch(error => {
      $('.results').removeClass('hidden');
      $('h2').text(`Something went wrong: ${error}`);  // error.message is not working?
}

// function logResults(responseJson) {
//   responseJson.message.forEach(item => {
//     console.log(item);
//   });
// }

function displayResults(responseJson) {
    // console.log(responseJson);
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
    let userDogBreed = $("#userDogBreed").val();

    getDogImage(userDogBreed);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
  getDogBreeds();
});


/* 1. app that lets users choose to display between 1 - 50 random dog images
    - prints the results to the console
    - App should feature form with ** required ** input
        - user must indicate number of images to retrieve
            - input default is 3
    
    - Use the Endpoint described in 
        "DISPLAY MULTIPLE RANDOM IMAGES FROM ALL DOGS COLLECTION" section

        https://dog.ceo/api/breeds/image/random/3
        max number is 50

    2. building on previous app, display the pics on the DOM

    3. Create an app that loads a single random image for a specific breed
        - based on the user's input
            - This app should account for the happy case when the breed is found
            - It should also account for the unhappy case when the breed is NOT found
        - Use the endpoint described in "RANDOM IMAGE FROM A BREED COLLECTION"
    
            
            make a call to the API
                - find out the breeds
                - build form for legal breeds

        *****
        - this API will return an HTTP status code of 404 along with a JSON object
          with info about the error if a request is made for a breed that can't be found
        ******

*/