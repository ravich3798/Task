import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

  const schema=yup.object().shape({
    firstName: yup.string().required("Only Strings Allowed!!!!"),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null])
})
function App(){
    const {register, handleSubmit, errors}=useForm({
        resolver: yupResolver(schema),
    })
    const submitForm=(data)=>{
        console.log(data);
    }
  return (
    <form onSubmit={handleSubmit(submitForm)}>
        <input type="text" {...register("firstName")} />
       
        {/* <input type="text" name="lastName" placeholder="First Name" ref={register}/>
        <input type="text" name="email" placeholder="First Name" ref={register}/>
        <input type="text" name="age" placeholder="First Name" ref={register}/>
        <input type="text" name="password" placeholder="First Name" ref={register}/>
        <input type="text" name="confirmPassword" placeholder="First Name" ref={register}/> */}
        
        <input type="submit" name="Upload"/>
        </form>
    )
}

export default App;