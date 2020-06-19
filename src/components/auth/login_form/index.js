import React, { Fragment, useState } from "react";
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";
import { Redirect } from "react-router-dom";
import UsersService from '../../../services/users';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [RedirectToRegister, setRedirectToRegister] = useState(false);
    const [RedirectToNotes, setRedirectToNotes] = useState(false);
    const [error, setError] = useState(false);

    if(RedirectToRegister == true)
        return <Redirect to={{pathname: "/register"}}/>
    else if(RedirectToNotes == true)
        return <Redirect to={{pathname: "/notes"}}/>

    const HandleSubmit = async(e) => {
        e.preventDefault();

        try {
            const users = await UsersService.login({email: email, password: password});
            setRedirectToNotes(true);
        } catch(error) {
            setError(true);
        }
    }

  return (
    <Fragment>
        <Column.Group centered>
          <form onSubmit={HandleSubmit}>
            <Column size={12}>

                <Field>
                    <Label size="small">Email:</Label>
                    <Control>
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
                    <Label size="small">Password:</Label>
                    <Control>
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
                        <Column.Group>
                            <Column>
                                <a onClick={e => setRedirectToRegister(true)} 
                                className="button is-white has-text-custom-purple">Register or</a>
                            </Column>
                            
                            <Column>
                                <Button color="custom-purple" outlined>Login</Button>
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

export default LoginForm;