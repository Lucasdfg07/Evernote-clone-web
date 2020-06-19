import React, { Fragment } from 'react';
import HeaderLogged from "../../../components/header_logged";
import { Column, Section, Title, Container, Card} from "rbx";
import LogoImage from '../../../assets/images/logo.png';
import "../../../styles/auth.scss";
import UpdateForm from "../../../components/auth/update_form";

const UserEdit = () => {
  return (
    <Fragment>
      <HeaderLogged/>
      
      <Section size="medium" className="auth">
        <Container>
          <Column.Group centered>
            <Column size={3}>
              <Card>
                <Card.Content>
                  
                  <Section>
                    <Column.Group centered>
                      <Column size={12}>
                        <img src={LogoImage} alt="Logo" />
                      </Column>
                    </Column.Group>

                    <Column.Group>
                      <Column size={12}>
                        <Title size={6} className="has-text-grey has-text-centered">
                          Your notes on the cloud
                        </Title>
                      </Column>
                    </Column.Group>
                  </Section>
                  
                  <UpdateForm/>

                </Card.Content>
              </Card>
            </Column>
          </Column.Group>
        </Container>
      </Section>
    </Fragment>
  )
};

export default UserEdit;