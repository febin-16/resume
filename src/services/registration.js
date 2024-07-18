import { BASE_URL } from '../constants/urls';


/**

 Registers a user for an event using their token, event ID, and referral.
 @async
 @function registerEventAPI
 @param {string} token - The Bearer token of the user.
 @param {string} id - The ID of the event.
 @param {string} referral - The referral code for the event(Obtained through campus ambassador).
 @returns {Promise<Response>} A promise that resolves to the response object of the event registration request.
 */
export async function registerEventAPI(token, formData) {
    return await fetch(

        BASE_URL + "/api/events/register/test/",
        {
            method: "POST",
            headers: {
                "Authorization": `token ${token}`
            },
            body: formData
        }
    );
}

export async function registerComboAPI(token, formData) {
    return await fetch(

        BASE_URL + "/api/offers/register/",
        {
            method: "POST",
            headers: {
                "Authorization": `token ${token}`,
            },
            body:formData
        }
    );
}

export async function registerMerchAPI(token, data) {
    return await fetch(
        BASE_URL + "/api/merchandise/order/",
        {
            method: "POST",
            headers: { "Authorization": `token ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
    );
}

/**
 Retrieves details of a team using the user's token and team ID.
 @async
 @function getTeamDetailsAPI
 @param {string} token - The Bearer token of the user.
 @param {string} team_id - The ID of the team to retrieve details for.
 @returns {Promise<Response>} A promise that resolves to the response object of the team details.
 */
export async function getTeamDetailsAPI(token, team_id) {
    return await fetch(
        BASE_URL + "/api/events/team/" + team_id,
        {
            method: "GET",
            headers: { "Authorization": `token ${token}` },
        }
    );
}
/**

 Creates a team for an event using the user's token, team slug, and email.
 @async
 @function createTeamAPI
 @param {string} token - The token of the user.
 @param {string} slug - The slug of the team.
 @param {string} email - The email address of the user to add to the team.
 @returns {Promise<Response>} A promise that resolves to the response object of the create team request.
 */
export async function createTeamAPI(token, formData) {
    return await fetch(
        BASE_URL + "/api/events/register/test/",
        {
            method: "POST",
            headers: {
                "Authorization": `token ${token}`
            },
            body: formData
        }
    );
}


/**

 Submits a team for an event using the user's token and team slug.
 @async
 @function submitTeamAPI
 @param {string} token - The token of the user.
 @param {string} slug - The slug of the team to submit.
 @returns {Promise<Response>} A promise that resolves to the response object of the team submission request.
 */
export async function submitTeamAPI(token, slug) {
    return await fetch(
        BASE_URL + "/api/v1/event/team/" + slug + "/confirm",
        {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": `token ${token}` },
            body: JSON.stringify({
                value: "true"
            })
        }
    );
}

