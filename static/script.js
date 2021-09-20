"use stric";

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

/** Function that gets the Cupcake API returns the data */
async function getCupcakeAPI() {
  const response = await axios({
    url: `${BASE_URL}/cupcakes`,
    method: "GET",
  });

  return response.data.cupcakes;
}

/** Function that renders the html */
function displayCupcakeHtml(cupcakes) {
  for (let cupcake of cupcakes) {
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
}

/** Function that updates the current API */
async function updateCupcakeAPI() {
  const response = await axios({});
}

/** Function that renders the input of the form handler */
function handleCupcakeForm() {
  let $flavor = $("#cupcake-flavor").val();
  let $rating = $("#cupcake-rating").val();
  let $size = $("#cupcake-size").val();
  let $image = $("#cupcake-image").val();
}

/** Event listener to create new Cupcake */
$createCupcakeForm.on("submit", handleCupcakeForm);
