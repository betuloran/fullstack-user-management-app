export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  isLocal?: boolean;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}
export interface Post {
  id: string;      
  userId: string;   
  title: string;
  body?: string;
  createdAt?: string;
  updatedAt?: string;
  isLocal?: boolean;
}
export interface FormData {
  user?: Partial<User>;
  post?: Partial<Post>;
}