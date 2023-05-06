import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import './App.css'

  const schema=yup.object().shape({
    firstName: yup.string().required("Only String allowed"),
    age: yup.number().positive().integer().required("Enter Valid DOB or Age"),
    sex: yup.string().required("Select Gender"),
    contact: yup.string().min(10).max(10).required("Enter Valid Contact Number"),
    emergencyContact: yup.string().min(10).max(10).required("Enter Valid Contact Number"),
    idtype: yup.string().required(),
    aadhaar: yup.string().when("idtype",{
        is: (idtype)=>idtype===true,
        then: yup.string().min(12).max(12).required()
    }),
    pan: yup.string().when("idtype",{
        is: "pan",
        then: yup.string().min(10).max(10).required()
    })
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
        <div className="formStyle">
        <div><b><u>Personal Details</u></b></div>
        <br/>
        <div className="gridStyle">
        <div>Name<span className="mandatoryField">*</span><input type="text" placeholder="First Name" {...register("firstName")} />
        <p>{errors.firstName?.message}</p></div>
        <div>Date of Birth or Age<span className="mandatoryField">*</span><input type="text" placeholder="DD/MM/YYYY or Age in Years" {...register("age")}/></div>
        <p>{errors.age?.message}</p>
        <div>Sex<span className="mandatoryField">*</span><select defaultValue="Enter Sex" {...register("sex")}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
        </select>
        <p>{errors.sex?.message}</p></div>
        <div>Mobile<span className="mandatoryField">*</span><input type="number" minLength="10" placeholder="Enter Mobile" {...register("contact")}/>
        <p>{errors.contact?.message}</p>
        </div>
        <div>Govt Issued ID<select {...register("idtype")}>
                <option value="aadhaar">Aadhaar</option>
                <option value="pan">PAN</option>
            </select></div><div><input type="text" placeholder="Enter Govt ID" {...register("id")}/>
            <p>{errors.idtype?.message}</p>
            <p>{errors.aadhaar?.message}</p>
            <p>{errors.pan?.message}</p>
        </div>
        </div>
        <br/>
        <div><b><u>Contact Details</u></b></div>
        <br/>
        <div className="gridStyle">
            <div>
                Guardian Details<select>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                </select>
                <input type="text" placeholder="Enter Guardian Name" {...register("guardian")}/>
            </div>
            <div>
                Email <input type="text" placeholder="Enter Email" {...register("email")}/>
            </div>
            <div>
                Emergency Contact Number <input type="number" placeholder="Enter Emegency No" {...register("emergencyContact")}/>
                <p>{errors.emergencyContact?.message}</p>
            </div>
        </div>
        <br/>
        <div><b><u>Address Details</u></b></div>
        <br/>
        <div className="gridStyle">
            <div>
                Address
                <input type="text" placeholder="Enter Address" {...register("address")}/>
            </div>
            <div>
                State <select>
                    <option value="Karnataka">Karnataka</option>
                    <option value="TamilNadu">TamilNadu</option>
                    <option value="Kerala">Kerala</option>
                </select>
            </div>
            <div>
                City<select>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mysore">Mysore</option>
                    <option value="Mandya">Mandya</option>
                </select>
            </div>
            <div>
                Country
                <input type="text" value="India" {...register("country")}/>
            </div>
            <div>
                Pincode
                <input type="text" placeholder="Enter Pincode" {...register("pincode")}/>
            </div>
        </div>
        <br/>
        <div><b><u>Other Details</u></b></div>
        <br/>
        <div className="otherDetails">
            <div>
                Occupation
                    <input type="text" placeholder="Enter Occupation" {...register("occupation")}/>
            </div>
            <div>
                Religion
                <select>
                    <option value="Hindu">Hindu</option>
                    <option value="Christian">Christian</option>
                    <option value="Muslim">Muslim</option>
                </select>
            </div>
            <div>
                Marital Status
                <select>
                    <option value="Married">Married</option>
                    <option value="Unmarried">Unmarried</option>
                </select>
            </div>
            <div>
                Blood Group
                <select>
                    <option value="O+">O+</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                </select>
            </div>
            <div>
                Nationality<input type="text" value="Indian"/>
            </div>
        </div>
        <input type="reset"/>
        <input type="submit"/>
        </div>
        </form>
    )
}

export default Registration;