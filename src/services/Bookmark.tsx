import { AxiosResponse } from "axios";
import moment from "moment";
import { PROVIDER_TYPE } from "../enums/providerType";

const getNewBookmark = (response: AxiosResponse, tags: string[]): IBookmark | undefined => {
  const responseData = response.data

  if (responseData.provider_name === PROVIDER_TYPE.VIMEO) {
    const data: VimeoMetadataDto = responseData
    return {
      id: Math.random(),
      title: data.title,
      url: data.url,
      author: data.author_name,
      createdDate: moment().format('LLL'),
      height: data.height,
      width: data.width,
      duration: data.duration,
      tags: tags
    } as IVimeoBookmark
  }
  if (responseData.provider_name === PROVIDER_TYPE.FLICRK) {
    const data: FlickrMetadataDto = responseData

    return {
      id: Math.random(),
      title: data.title,
      url: data.url,
      author: data.author_name,
      createdDate: moment().format('LLL'),
      height: data.height,
      width: data.width,
      tags: tags
    } as IFlickrBookmark
  }

  // TODO Error, bad url, bad provider, ... Management

}


export const BookmarkService = {
  getNewBookmark
}