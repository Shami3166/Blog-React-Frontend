export interface Profile {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
}

export interface ProfileResponse {
  user: Profile;
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
}
