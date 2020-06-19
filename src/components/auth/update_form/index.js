import React, { Fragment, useState, useEffect } from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";
import { Redirect } from "react-router-dom";
import UsersService from '../../../services/users';

function UpdateForm() {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [redirectToNotes, setRedirectToNotes] = useState(false);
    const [status, setStatus] = useState("");

    const UpdateUser = async(e) => {
        e.preventDefault();

        if(password == password_confirmation) {
            try {
                await UsersService.update(id, {name: name, email: email, password: password});
                setStatus("success");
            } catch(error) {
                setStatus("error");
            }
        } else {
            setStatus("error_confirmation_password")
        }
    }

    const getUser = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        setName(user['name']);
        setEmail(user['email']);
        setId(user['_id']);
    }

    useEffect(() => {
        getUser()
    }, [])

    if(redirectToNotes)
        return <Redirect to={{pathname: "/notes"}} />

    return (
        <Fragment>
            <Column.Group centered>
                <form onSubmit={UpdateUser}>
                    <Column size={12}>
                        <Field>
                            <Control>
                                <Label>Name:</Label>
                                <Input 
                                    type="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                    name="name"
                                />
                            </Control>
                        </Field>

                        <Field>
                            <Control>
                                <Label>Email:</Label>
                                <Input 
                                    type="email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    name="email"
                                />
                            </Control>
                        </Field>
                        
                        <Field>
                            <Control>
                                <Label>Password:</Label>
                                <Input 
                                    type="password" 
                                    onChange={e => setPassword(e.target.value)}
                                    name="password"
                                />
                            </Control>
                        </Field>

                        <Field>
                            <Control>
                                <Label>Password Confirmation</Label>
                                <Input
                                    type="password"
                                    value={password_confirmation}
                                    onChange={e => setPasswordConfirmation(e.target.value)}
                                    required
                                    name="password_confirmation"
                                />
                            </Control>
                        </Field>
                        
                        <Field>
                            <Control>
                                <Column.Group breakpoint="mobile">
                                    <Column>
                                        <Button color="custom-purple" outlined>Update</Button>
                                    </Column>
                                </Column.Group>
                            </Control>
                        </Field>
                    </Column>
                    
                    {status == "error" &&
                        <Help color="danger">Problem in update</Help>
                    }

                    {status == "success" &&
                        <Help color="primary">Updated with success</Help>
                    }

                    {status == "error_confirmation_password" &&
                        <Help color="danger">Password don't match</Help>
                    }
                </form>
            </Column.Group>
        </Fragment>
    )
}

export default UpdateForm;