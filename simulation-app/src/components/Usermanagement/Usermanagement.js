import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

export default function MaterialTableDemo() {
    var [token, emptyToken] = useState(false)
    const [state, setState] = useState({
        columns: [
        { title: 'Email', field: 'email' },
        { title: 'Username', field: 'uname' },
        { title: 'FirstName', field: 'fname' },
        { title: 'LastName', field: 'lname' },
        { title: 'Active', field: 'active' },
        ],
    });
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
                        email:x.email, 
                        uname:x.username, 
                        fname:x.firstName, 
                        lname:x.lastName, 
                        active:
                            (x.active)?
                            (<div title="Active"><CheckCircleIcon></CheckCircleIcon></div>)
                            :(<div title="Inactive"><CancelIcon></CancelIcon></div>)
                    })
            })
            setState({...state, data:rdata})
            }
        ) 
    },[])
    const logout = () =>{
        localStorage.clear();
        emptyToken(true);
    }
    if(token){
        return(<Redirect to="/"/>)
    }
    if(!localStorage.getItem('token')){
        return(<Redirect to="/"/>)
    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                <Grid item>
                    <button onClick={logout}>
                        Logout
                    </button>
                </Grid>
            </Typography>
            <MaterialTable
                // components={{
                //     Action: props => (
                //       <Button
                //         onClick={logout}
                //         color="primary"
                //         variant="contained"
                //         style={{textTransform: 'none'}}
                //         size="small"
                //       >
                //         Logout
                //       </Button>
                //     ),
                // }}
                style={{width: '70%', margin: '100px auto'}}
                title="Welcome User!"
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
                    // isDeletable: rowData => rowData.name === this.index,
                    // isEditable: rowData => rowData.name ===
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
                    }),
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
                    }),
                }}
            />
        </React.Fragment>
    );
}