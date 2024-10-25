export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  createdAt: Date;
  subscription?: {
    status: 'active' | 'inactive';
    endDate: Date;
  };
}

export interface Session {
  userId: string;
  email: string;
  expiresAt: Date;
}