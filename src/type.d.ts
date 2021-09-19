interface IBookmark {
  id: number;
  title: string;
  author: string;
  createdDate: string;
  height: number;
  width: number;
  tags: string[];
}

interface IVimeoBookmark extends IBookmark {
  duration: number;
}

interface IFlickrBookmark extends IBookmark {}

type BookmarkState = {
  bookmarks: IBookmark[];
};

type BookmarkAction = {
  type: string;
  bookmark?: IBookmark;
  responseData?: string;
};

type DispatchType = (args: BookmarkAction) => BookmarkAction;

interface VimeoMetadataDto {
  author_url: string;
  thumbnail_url: string;
  is_plus: string;
  title: string;
  description: string;
  html: string;
  duration: number;
  width: number;
  provider_name: string;
  version: string;
  video_id: number;
  author_name: string;
  thumbnail_url_with_play_button: string;
  height: number;
  provider_url: string;
  type: string;
  uri: string;
  thumbnail_width: number;
  upload_date: string;
  url: string;
  account_type: string;
  thumbnail_height: number;
}

interface FlickrMetadataDto {
  url: string;
  flickr_type: string;
  thumbnail_height: number;
  license_id: string;
  media_url: string;
  author_name: string;
  provider_url: string;
  height: number;
  type: string;
  thumbnail_width: number;
  license_url: string;
  version: string;
  web_page: string;
  license: string;
  web_page_short_url: string;
  title: string;
  thumbnail_url: string;
  author_url: string;
  cache_age: number;
  html: string;
  provider_name: string;
  width: number;
}
