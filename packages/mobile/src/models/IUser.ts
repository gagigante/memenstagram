export default interface User {
  id: string;
  name: string;
  nickname: string;
  email: string;
  phone_number: string;
  bio: string;
  avatar_url: string;
  confirmation_status: boolean;
  is_reseted: boolean;
}
