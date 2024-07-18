import {BASE_URL} from "../constants/urls";

export async function campusAmbassodorAPI(token, data){
    return await fetch(
              BASE_URL + "/api/ca/",
              {
                  method: "POST",
                  headers: {"Content-Type": "application/json", "Authorization": `token ${token}`},
                  body: JSON.stringify({
                      details :data
                  })
              }
          );
}