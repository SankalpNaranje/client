import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Navbars = () => {
  return (
    <div>
      <Navbar fixed="top" className="bg-body-tertiary" style={{"margin":0,"padding":"10px","borderBottom":"1px solid #e5e5e5"}}>
        <Container style={{"display":"flex","justifyContent":"center"}}>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://media.licdn.com/dms/image/C4E0BAQFc98fGOYEfDQ/company-logo_200_200/0/1630649278705/weshinetech_logo?e=2147483647&v=beta&t=F96JPu-Wb081OQ3ivQJlZ15FjqzqegKiaN6itwWcqVA"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <span style={{"color":"#FC8C25"}}>WeShine</span> <span style={{"color":"#1272E8"}}>Tech</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbars
