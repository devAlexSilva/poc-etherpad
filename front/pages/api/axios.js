import axios from "axios"


export function EtherApi() {

  const etherpadApi = axios.create({
    baseURL: "http://localhost:9001"
  })


  return etherpadApi
}

export class BackApi {
  backEndApi = axios.create({
    baseURL: "http://localhost:2727"
  })

}