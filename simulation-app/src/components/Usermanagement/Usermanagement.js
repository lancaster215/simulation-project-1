import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListIcon from '@material-ui/icons/List';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const handleClose = () => {
      onClose(selectedValue);
    };
return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">User Details</DialogTitle>
        <List>
            <ListItem >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={selectedValue} />
            </ListItem>
        </List>
      </Dialog>
    );
}
SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

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
    const [name, setName] = useState({uname: '', fname: '', lname: '', email: ''});
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState({uname: '', fname: '', lname: '', email: ''});

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
        .then(res=>
            {
                setName(e =>{ return {...e, uname:res.data[0].firstName, fname:res.data[0].firstName, lname:res.data[0].lastName, email:res.data[0].email} })
            })
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
    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = value => {
        setOpen(false);
        setSelectedValue(value);
    };
    return (
        <React.Fragment>
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar>
                    <Button title="Logout User" size="small" variant="outlined" color="primary" onClick={logout}>
                        Logout
                    </Button>&nbsp;
                    <ListIcon title="User Details" fontSize="large" onClick={handleClickOpen} style={{cursor: 'pointer'}}/>
                    <SimpleDialog selectedValue={name.email} open={open} onClose={handleClose}/>
                </Toolbar>
            </AppBar>
            <MaterialTable
                style={{width: '95%', margin: '50px auto'}}
                options={{filtering: true, headerStyle: {backgroundColor: '#f5f5f5'}}}
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