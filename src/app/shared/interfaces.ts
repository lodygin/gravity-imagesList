export interface Comment {
  userName: string;
  comment: string;
  commentDate: Date;
}

export interface Post {
  link: string;
  postDate: Date;
  comments?: Comment[];
  id?: string;
}

export interface FbCreateResponse {
  name: string;
}
