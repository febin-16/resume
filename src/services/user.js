import {BASE_URL} from "../constants/urls";

/**

 Retrieves details of the current user using their token.
 @async
 @function getUserDetailsAPI
 @param {string} token - The token of the user.
 @returns {Promise<Response>} A promise that resolves to the response object of the user details request.
 */
export async function getUserDetailsAPI(token){
    return await fetch(
          BASE_URL + "/api/users/me",
          {
              method: "GET",
              headers: {"Authorization": `token ${token}`},
          }
      );
}

/**

 Submits user details using their token, URL, and data.
 @async
 @function submitUserDetails
 @param {string} token - The token of the user.
 @param {string} url - The URL to submit the user details to.
 @param {Object} data - The data to submit for the user.
 @returns {Promise<Response>} A promise that resolves to the response object of the user details submission request.
 */
export async function submitUserDetails(token, data, username){
    return await fetch(
        BASE_URL + "/api/users/" + username + "/",
          {
              method: "PUT",
              headers: {"Content-Type": "application/json", "Authorization": `token ${token}`},
              body: JSON.stringify({
                  ...data, is_completed: true
              })
          }
      );
    }
/**
 Retrieves a list of events registered by the user using their token.
 @async
 @function getRegisteredEventsAPI
 @param {string} token - The token of the user.
 @returns {Promise<Response>} A promise that resolves to the response object of the registered events request.
 */
export async function getRegisteredEventsAPI(token){
    return await fetch(
              BASE_URL + "/api/v1/users/event",
              {
                  method: "GET",
                  headers: {"Authorization": `token ${token}`},
              }
          );
    }

/**
 Spins the spin_wheel and get the offers and awards.
 @async
 @function spinTheWheelAPI
 @param {string} token - The token of the user.
 @returns {Promise<Response>} A promise that resolves to the response object of the spin the spin_wheel request.
 */
export async function spinTheWheelAPI(token){
    return await fetch(
        BASE_URL + "/random",
        {
            method: "GET",
            headers: {"Authorization": `token ${token}`},
        }
    );
}


/**
 Retrieves the redirect URL for a payment using the slug.
 @async
 @function getPaymentRedirectionUrl
 @param {string} slug - The slug of the payment.
 @returns {Promise<Response>} A promise that resolves to the response object of the redirect URL request.
 */
export async function getPaymentRedirectionUrl(slug){
    return await fetch(
        BASE_URL + "/api/v1/payment/"+slug,
        {
            method: "GET",
        }
    );
}