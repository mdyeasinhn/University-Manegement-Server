

export type TUser ={
    id : string;
    password : string;
    needsPasswordChange : string;
    role : 'admin' | 'student' | 'faculty';
    status : 'in-progress' | 'block';
    isDeleted : boolean;
}