import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,

  StudentModel,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt'
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [20, "First name can not be more then 20 characters"],
    validate: {
      validator: function (value: String) {
        const firstNameValue = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameValue === value
      },
      message: '{VALUE} is not capitalize format '
    }
  },
  middleName: {
    type: String,
    trim: true,

  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not validate'
    }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father name is required"],
    trim: true,

  },
  fatherOccaption: {
    type: String,
    required: true,
  },
  fatherContectNo: {
    type: String,
    required: true,
    trim: true,

  },
  motherName: {
    type: String,
    required: [true, "Mother name is required"],
    trim: true,

  },
  motherOccaption: {
    type: String,
    required: true,
    trim: true,

  },
  motherContectNo: {
    type: String,
    required: true,
    trim: true,

  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
    trim: true,

  },
  occupation: {
    type: String,
    required: true,
    trim: true,

  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,

  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'Id is requeired'], unique: true },
  password: { type: String, required: [true, 'Password is requeired'], maxlength: [20, 'password can not be 20 characters'] },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid'
    },
    required: true

  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} in not a valid email type "
    }

  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloogGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddres: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true
  },
  localGuardian: {
    type: localGuradianSchema,
    required: true
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: "active"
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},{
  toJSON : {
    virtuals : true
  }
});


// virtual
studentSchema.virtual('fullName').get(function (){
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

// Pre save middleware |  hook : will work on create() save()

studentSchema.pre('save', async function (next) {
  //console.log(this, ' Pre hook : we  saved our data ');
  const user = this;

  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next()
})

// post save middleware /hook

studentSchema.post('save', function (doc, next) {
  doc.password = ""
  console.log(this, 'Post hook : we saved our data ');
  next();
})

// query middleware

studentSchema.pre('find', function (next) {
this.find({isDeleted : {$ne : true}})
  next();
})
studentSchema.pre('findOne', function (next) {
this.find({isDeleted : {$ne : true}})
  next();
})
studentSchema.pre('aggregate', function (next) {
this.pipeline().unshift({$match : {isDeleted : { $ne : true}}})
  next();
})






// create custom static method 
studentSchema.static.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser
}
// creating a custom instance method
// studentSchema.method.isUserExists = async function (id: string){
//   const existingUser = await Student.findOne({id})
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
