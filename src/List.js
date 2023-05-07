import { useEffect, useState } from "react";
import Datatable from "react-data-table-component";

function List(){
    const [data,setData]=useState();
    const column=[
    {
        name: "Name",
        selector: (row) => row.firstName
    },
    {
        name: "Age/Sex",
        selector: row=>row.firstName
    },
    {
        name: "Mobile",
        selector: row=>row.firstName
    },
    {
        name: "Address",
        selector: row=>row.firstName
    },
    {
        name: "Govt ID",
        selector: row=>row.firstName
    },
    {
        name: "Guardian Details",
        selector: row=>row.firstName
    },
    {
        name: "Nationality",
        selector: row=>row.firstName
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
    for(const key in data){
        tempArr.push({
            firstname: data[key].firstName,
            age: data[key].age,
            mobile: data[key].contact,
            address: data[key].address,
            id: data[key].id,
            guardian: data[key].guardian,
            nationality: data[key].nationality,
        })
    }
    //setData(tempArr)
    console.log(tempArr)
    return <Datatable columns={column} data={tempArr}/>
    
}
export default List