export default interface IPost {
  id: string;
  user_id: string;
  description: string;
  postImages: IPostImage[];
}

interface IPostImage {
  image_url: string;
}
