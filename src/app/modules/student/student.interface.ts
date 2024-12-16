import { Schema, model, connect, Model, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccaption: string;
  fatherContectNo: string;
  motherName: string;
  motherOccaption: string;
  motherContectNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: string;
  user : Types.ObjectId; 
  password: string;
  name: TUserName;
  email: string;
  avatar?: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddres: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isDeleted: boolean;
};

// for creating static
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for creating instance

// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// }

// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>
