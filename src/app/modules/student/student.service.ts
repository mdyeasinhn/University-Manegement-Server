import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if( await Student.isUserExists(studentData.id)){
    throw new Error("user allready exists")
   }
   const result = await Student.create(studentData); // built in static method





  // const student = new Student(studentData);
  // if(await student.isUserExists(studentData.id)){
  //   throw new Error("user allready exists")
  // }
 
 // const result = await student.save()   // built in instance method
  return result;
};



const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{$match : {id : id}}])
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, {isDeleted : true });
  return result;
};

export const studentService = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};



