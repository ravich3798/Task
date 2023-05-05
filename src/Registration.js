import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

  const schema=yup.object().shape({
    firstName: yup.string().required("Only String allowed"),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null])
})
function Registration(){
    const {register, handleSubmit, formState: {errors}}=useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit=(data)=>{
        console.log(data);
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="First Name" {...register("firstName")} />
       <p>{errors.firstName?.message}</p>
        <input type="text" name="lastName" placeholder="Last Name" {...register("lastName")}/>
        <input type="text" name="email" placeholder="Email" {...register("email")}/>
        <input type="number" name="age" placeholder="Age" {...register("age")}/>
        <input type="password" name="password" placeholder="Password" {...register("password")}/>
        <input type="text" name="confirmPassword" placeholder="Confirm Password" {...register("confirmPassword")}/>
        <input type="submit"/>
        </form>
    )
}

export default Registration;