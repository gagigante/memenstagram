export default interface ICreatePostDTO {
  user_id: string;
  description: string;
  postImages: {
    image_url: string;
  }[];
}
