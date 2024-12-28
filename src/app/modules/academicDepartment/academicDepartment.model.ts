import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';




const academicDeparmentSchema = new Schema<TAcademicDepartment>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        academicFaculty: {
            type : Schema.Types.ObjectId,
            ref : "Academic Faculty"
        },
    },
    {
        timestamps: true
    }
);


export const AcademicDepartment = model<TAcademicDepartment>('AcademicDeparment', academicDeparmentSchema);
