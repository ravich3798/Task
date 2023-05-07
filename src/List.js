import { useEffect, useState } from "react";
import Datatable from "react-data-table-component";
import { Link } from "react-router-dom";

function List(){
    const [data,setData]=useState();
    const column=[
    {
        name: "Name",
        selector: (row) => row.firstname
    },
    {
        name: "Age",
        selector: row=>row.age
    },
    {
        name: "Mobile",
        selector: row=>row.mobile
    },
    {
        name: "Address",
        selector: row=>row.address
    },
    {
        name: "Govt ID",
        selector: row=>row.id
    },
    {
        name: "Guardian Details",
        selector: row=>row.guardian
    },
    {
        name: "Nationality",
        selector: row=>row.nationality
    },
]
    useEffect(() => {
    fetch('https://task-6808d-default-rtdb.firebaseio.com/testtask.json')
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        setData(data)});
    }, []);
    const tempArr=[];
    for(const a in data){
        tempArr.push({
            firstname: data[a].firstName,
            age: data[a].age,
            mobile: data[a].contact,
            address: data[a].address,
            id: data[a].id,
            guardian: data[a].guardian,
            nationality: data[a].nationality,
        })
    }
    return (<div><Datatable title="Records" columns={column} data={tempArr} pagination fixedHeader fixedHeaderScrollHeight="450px"/>
    <Link to="/">
            <button className="button">Back</button>
        </Link>
    </div>
    )
}
export default List