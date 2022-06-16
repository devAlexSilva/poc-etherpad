import axios from "axios"


export function EtherApi() {

  const etherpadApi = axios.create({
    baseURL: "http://localhost:9001/api/1"
  })


  return etherpadApi
}

export class BackApi {
  
  constructor(token) {
    this.backEndApi.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }
  
  backEndApi = axios.create({
    baseURL: "http://localhost:2727"
  })

}