import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import './App.css';
import { Link } from "react-router-dom";

  const schema=yup.object().shape({
    firstName: yup.string().required("Only String allowed"),
    age: yup.number().positive().integer().required("Enter Valid DOB or Age"),
    sex: yup.string().required("Select Gender"),
    contact: yup.string().min(10).max(10).required("Enter Valid Contact Number"),
    emergencyContact: yup.string().min(10).max(10).required("Enter Valid Contact Number"),
    address: yup.string().min(10).required(),
    guardian: yup.string().required(),
    nationality: yup.string().required(),
    idtype: yup.string().required("Select ID"),
    id: yup.string().when(['idtype'],{
        is: (idtype)=>idtype==='pan',
        then: ()=>yup.string().min(10).max(10).required("Pan must be of length 10"),
        otherwise: ()=>yup.string().min(12).max(12).required("Aadhaar must be of length 12")
    })
})

function Registration(){
    const {register, handleSubmit, formState: {errors}}=useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit=(data)=>{
            const url = "https://task-6808d-default-rtdb.firebaseio.com/testtask.json"; // Replace <YOUR-FIREBASE-APP> with your Firebase app name
            fetch(url, {
                            method: "POST",
                            body: JSON.stringify(data),
                            headers: {
                                            "Content-Type": "application/json",
                                    },
                        })
                        .then((response) => response.json())
                        .then((responseData) => {
                            alert("Data successfully posted");
                            //console.log("Data successfully posted to Firebase", responseData);
                        })
                        .catch((error) => {
                            console.error("Error posting data to Firebase: ", error);
                        });
        //console.log(data);
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
        </select></div>
        <p>{errors.sex?.message}</p>
        <div>Mobile<span className="mandatoryField">*</span><input type="number" minLength="10" placeholder="Enter Mobile" {...register("contact")}/>
        <p>{errors.contact?.message}</p>
        </div>
        <div>Govt Issued ID<select {...register("idtype")}>
                <option value="aadhaar">Aadhaar</option>
                <option value="pan">PAN</option>
            </select><input type="number" placeholder="Enter Govt ID" {...register("id")}/>
            <p>{errors.id?.message}</p>
        </div>
        </div>
        
        <div><b><u>Contact Details</u></b></div>
        <br/>
        <div className="gridStyle">
            <div>
                Guardian Details<select {...register("guardian")}>
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
                <p>{errors.address?.message}</p>
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
                <br/>
                Country
                <input type="text" value="India" {...register("country")}/>
            </div>
            <div>
                <br/>
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
                <br/>
                Nationality<input type="text" value="Indian" {...register("nationality")}/>
            </div>
        </div>
        <Link to="/List">
            <button className="button">List</button>
        </Link>
        <input  className="button" type="submit"/>
        <input  className="button" type="reset" value="Cancel"/>
        <br/>
        </div>
        </form>
    )
}

export default Registration;