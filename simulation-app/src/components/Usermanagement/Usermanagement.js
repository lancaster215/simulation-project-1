import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default function UserManage() {
    var [token, emptyToken] = useState(false)
    const [state, setState] = useState({
        columns: [
        { title: 'Email', field: 'email', filtering: false },
        { title: 'Username', field: 'uname' },
        { title: 'FirstName', field: 'fname', filtering: false },
        { title: 'LastName', field: 'lname', filtering: false },
        { title: 'Active', field: 'active', lookup: { true: '🔵', false: '🔴'},
            // render: x => {
            //     // if(x.active === true){
            //     //     return(<div className="active" title="Active"></div>)
            //     // }else if(x.active === false){
            //     //     return(<div className="inactive" title="Inactive"></div>)
            //     // }
            //     return((x.active)? 
            //     <div className="inactive" title="Inactive"></div>
            //     :<div className="active" title="Active"></div>)
            // },
            cellStyle:{
                width: '1%'
            }
        },
        ],
    });
    const [name, setName] = useState({uname: ''});

    useEffect(() => {
        axios
        .get('http://localhost:3000/users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res=>
            {
                let rdata = []
                res.data.map((x) =>{
                    rdata.push({
                        id:x.id,
                        email:x.email, 
                        uname:x.username, 
                        fname:x.firstName, 
                        lname:x.lastName, 
                        active:x.active,
                        pass:x.password,
                        plainpass:x.plainPassword
                    })
                    return rdata;
            })
            setState(e => { return {...e, data:rdata} })
        })
        axios
        .get(`http://localhost:3000/users?email=${localStorage.getItem('useremail')}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res=>{setName(e =>{ return {...e, uname:res.data[0].username} })})
    },[])
    var onUpdate = (e) =>{
        var tralse;
        if(e.active === "true"){
            tralse = true;
        }else if(e.active === "false"){
            tralse = false;
        }
        axios
        .put(`http://localhost:3000/users/${e.id}`,{
            "email": e.email,
            "password": e.pass,
            "plainPassword": e.plainpass,
            "username": e.uname,
            "firstName": e.fname,
            "lastName": e.lname,
            "active": tralse,
        },{ headers: 
            {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res=>{
            console.log(res)
        })
    }
    var onDelete = (e) => {
        axios
        .delete(`http://localhost:3000/users/${e.id}`,{
            headers: 
            {Authorization: `Bearer ${localStorage.getItem('token')}`}
        }).then(res=>{
            console.log(res)
        })
    }
    const logout = () =>{
        localStorage.clear();
        emptyToken(true);
    }
    if(token){
        return(<Redirect to="/login"/>)
    }
    if(!localStorage.getItem('token')){
        return(<Redirect to="/login"/>)
    }
    return (
        <React.Fragment>
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar>
                    <Button title="Logout User" size="small" variant="outlined" color="primary" onClick={logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <MaterialTable
                style={{width: '95%', margin: '50px auto'}}
                options={{filtering: true}}
                title={`Welcome ${name.uname}!`}
                columns={state.columns}
                data={state.data}
                editable={{
                    // onRowAdd: newData =>
                    // new Promise((resolve, reject) => {
                    //     setTimeout(() => {
                    //     resolve();
                    //     setState(prevState => {
                    //         const data = [...prevState.data];
                    //         data.push(newData);
                    //         return { ...prevState, data };
                    //     });
                    //     }, 600);
                    // }),
                    onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                        resolve();
                        if (oldData) {
                            setState(prevState => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                            });
                        }
                        }, 600);
                    }).then(onUpdate(newData)),
                    onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                        resolve();
                        setState(prevState => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                        });
                        }, 600);
                    }).then(onDelete(oldData)),
                }}
            />
        </React.Fragment>
    );
}