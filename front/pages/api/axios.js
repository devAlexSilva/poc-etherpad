import axios from "axios"


export class EtherApi {

  etherpadApi = axios.create({
    baseURL: "http://localhost:9001/api/1"
  })

  tokenApi = axios.create({
    baseURL: "http://localhost:9001"
  })

}

export class BackApi {

  constructor(token) {
    this.backEndApi.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }

  backEndApi = axios.create({
    baseURL: "http://localhost:2727"
  })

}