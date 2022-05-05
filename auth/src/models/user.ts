import mongoose from "mongoose";

//3> an interface that describes the property that are required to create a new user
interface UserAttrs {
  email: string,
  password: string
}

// 6>an interface that describes the property that a user model has, basically to make ts understand that there is a build method
// updated any to Userdoc after building the interface for it i.e. step7>
interface UserModel extends mongoose.Model<UserDoc>{
  build(attrs: UserAttrs): UserDoc;
}

// 7>to solve issue no. two i.e. an interface that describes the property that a user document has
interface UserDoc extends mongoose.Document{
  email: string,
  password:string
}

//1>we use capital S for String inside schema beacuse we are directly calling the string constructor
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// 5>here we attach build method to the userSchema with the help of statics property but ts doesn't understands this, so we will add an interface
//to make it understand
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User (attrs);
}

//2><any, UserModel> added after step 6>
const User = mongoose.model<any, UserModel>('User', userSchema);

const user = User.build({
  email:'sqwesa',
  password:'asdasdasd'
});

//4> to bind our mongoose object to take only the required parameters & nothing else
// problem with this is, we need to create a seperate function, now we will try to bind this function with the schema itself in next step
// const buildUser = (attrs: UserAttrs) => {
//   return new User (attrs);
// }
// export { User, buildUser };
export { User };
// need to learn more about the angular brackets