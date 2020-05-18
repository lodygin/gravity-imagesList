export interface Comment {
  userName: string;
  comment: string;
  commentDate: Date;
  id?: string;
}

export interface Post {
  link: string;
  postDate: Date;
  id?: string;
}

export interface FbCreateResponse {
  name: string;
}
