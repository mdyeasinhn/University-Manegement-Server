import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

// year semesterCode 4 degit number
export const generatedStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  let currentId =  (0).toString(); // 0000 by default

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6) //01 ;
  const lastStudentYear = lastStudentId?.substring(0,4);  // 
  const currentSemesterCode =  payload.code;
  const currentYear =  payload.year;
  if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear){
    currentId = lastStudentId.substring(6) // 00001;
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
