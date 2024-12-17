export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'block';
  isDeleted: boolean;
};

export type NewUser = {
  password: string;
  role: string;
  id: string;
};
