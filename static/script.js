"use strict";

const BASE_URL = "http://localhost:5000/api";

const $createCupcakeForm = $("#create-cupcake");
const $updateCupcakeList = $("#cupcakes-list");

/**
 * NEED to async function
 * 1. Get
 * 2. POST add to the data
 *
 * 3. Need a function to create html based on cupcakes
 * 4. delete a cupcake
 */

/** Function that gets the Cupcake API and returns the data */ //CODE REVIEW: Need to say exactly what it returns
async function getCupcakes() {
  const response = await axios({
    url: `${BASE_URL}/cupcakes`,
    method: "GET",
  });

  return response.data.cupcakes;
}


/** Function that generates HTML for cupcake and appends to cupcakes list*/
function generateAndAppendCupcakeHtml(cupcake) {
  let html = `
        <li>
            Flavor:${cupcake.flavor}, 
            Rating: ${cupcake.rating}, 
            Size: ${cupcake.size}
        </li>
        <img src=${cupcake.image}><img>
        `;
    $updateCupcakeList.append(html);
}


/** Function that updates the current API */ //CODE REVIEW: Include what function takes, what it returns
async function addNewCupcake(newCupcake) {
  const response = await axios({
    url: `${BASE_URL}/cupcakes`,
    method: "POST",
    data: newCupcake
  })

  return response.data.cupcake;
}


  /** Function handles form submission. Generates POST request to API to create
   * new cupcake. Generates HTML for new cupcake and appends to cupcakes list.
   */
async function handleCupcakeForm(evt) { 
  evt.preventDefault();

  //CODE REVIEW: These variables don't nede the dollar sign because it's just the values and not jquery data
  let $flavor = $("#cupcake-flavor").val();
  let $rating = $("#cupcake-rating").val();
  let $size = $("#cupcake-size").val();
  let $image = $("#cupcake-image").val();

  const newCupcake = {
    flavor: $flavor,
    rating: $rating,
    size: $size,
    image: $image
  };

  console.log("this ran");
  console.log("newCupcake=",newCupcake);
  await addNewCupcake(newCupcake);

  generateAndAppendCupcakeHtml(newCupcake);
}


/** Event listener to create new Cupcake */
$createCupcakeForm.on("submit", handleCupcakeForm);


/** Calls the API for the most recent list of cupcakes and creates HTML
 * to populate cupcakes list
*/
async function getAndDisplayCupcakes() {

  let cupcakes = await getCupcakes();

  for (let cupcake of cupcakes) {
    generateAndAppendCupcakeHtml(cupcake);
  }
}

getAndDisplayCupcakes();
