import NoembedDataProvider from "../http-commons"

const getMetadata = (url: string): Promise<any> => {
  return NoembedDataProvider.get(`embed/?url=${url}`)
}

export const DataService = {
  getMetadata
}