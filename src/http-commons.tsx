import axios from "axios"

const NoembedDataProvider = axios.create({
  baseURL: "https://noembed.com/",
  headers: {
    "Content-type": "application/json"
  }
})

export default NoembedDataProvider