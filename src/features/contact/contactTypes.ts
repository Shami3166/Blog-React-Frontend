export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
