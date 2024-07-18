import { BASE_URL } from "../constants/urls";

export default async function loginGoogleAccountAPI(access_token) {
  return await fetch(BASE_URL + "/users/google/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_token,
    }),
  });
}
