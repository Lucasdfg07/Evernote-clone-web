import React, { useState, useEffect } from 'react';
import { Button } from "rbx";
import UserService from '../../services/users';
import { Redirect } from "react-router-dom";

function UsersDelete() {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [id, setId] = useState("");

  const deleteUser = async () => {
    if (window.confirm('Are you sure you wish to delete this account?')){
      await UserService.delete(id)
      setRedirectToHome(true)
    }
  }

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    setId(user['_id']);
}

useEffect(() => {
    getUser()
}, [])

  if(redirectToHome == true)
    return <Redirect to={{pathname: "/"}}/>

  return(
    <Button color="danger" onClick={() => deleteUser()}>
      Delete Account
    </Button>
  )
}

export default UsersDelete;