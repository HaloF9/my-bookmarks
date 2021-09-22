import { AxiosResponse } from "axios"
import NoembedDataProvider from "../http-commons"

const getMetadata = (url: string): Promise<AxiosResponse> => {
  return NoembedDataProvider.get(`embed/?url=${url}`)
}

export const DataService = {
  getMetadata
}