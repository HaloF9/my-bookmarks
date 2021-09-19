import moment from "moment";
import { PROVIDER_TYPE } from "../enums/providerType";

const getNewBookmark = (action: any): IBookmark | undefined => {
  const responseData = action.responseData

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
      tags: action.tags
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
      tags: action.tags
    } as IFlickrBookmark
  }
}

export const BookmarkService = {
  getNewBookmark
}