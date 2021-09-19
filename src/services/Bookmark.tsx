import moment from "moment";
import { PROVIDER_TYPE } from "../enums/providerType";

const getNewBookmark = (responseData: any): IBookmark | undefined => {

  if (responseData.provider_name === PROVIDER_TYPE.VIMEO) {
    const data: VimeoMetadataDto = responseData
    return {
      id: data.video_id,
      title: data.title,
      author: data.author_name,
      createdDate: moment().format(),
      height: data.height,
      width: data.width,
      duration: data.duration,
      tags: []
    } as IVimeoBookmark
  }
  if (responseData.provider_name === PROVIDER_TYPE.FLICRK) {
    const data: FlickrMetadataDto = responseData

    // In case of Flickr metadata, retrieve id from web_page url
    const flirckId = (data.web_page.slice(data.author_url.length)).slice(0, -1)
    return {
      id: parseInt(flirckId),
      title: data.title,
      author: data.author_name,
      createdDate: moment().format(),
      height: data.height,
      width: data.width,
      tags: []
    } as IFlickrBookmark
  }
}

export const BookmarkService = {
  getNewBookmark
}