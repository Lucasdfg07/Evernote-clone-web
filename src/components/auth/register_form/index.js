import React, { Fragment, useState } from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";
import { Redirect } from "react-router-dom";
import UsersService from '../../../services/users';

function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [error, setError] = useState(false);

    const HandleSubmit = async(e) => {
        e.preventDefault();

        try {
            const users = await UsersService.register({name: name, email: email, password: password});
            setRedirectToLogin(true);
        } catch(error) {
            setError(true);
        }
    }

    if(redirectToLogin)
        return <Redirect to={{pathname: "/login"}} />

    return (
        <Fragment>
            <Column.Group centered>
                <form onSubmit={HandleSubmit}>
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
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    name="password"
                                />
                            </Control>
                        </Field>
                        
                        <Field>
                            <Control>
                                <Column.Group breakpoint="mobile">
                                    <Column>
                                        <a className="button is-white has-text-custom-purple" 
                                        onClick={e => setRedirectToLogin(true)}>Login or</a>
                                    </Column>

                                    <Column>
                                        <Button color="custom-purple" outlined>Register</Button>
                                    </Column>
                                </Column.Group>
                            </Control>
                        </Field>

                        { error && <Help color="danger">Email or Password invalid</Help> }
                    </Column>
                </form>
            </Column.Group>
        </Fragment>
    )
}

export default RegisterForm;