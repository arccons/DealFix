import React from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse
} from 'mdb-react-ui-kit';

export default function Header() {

    return (
        <>
            <MDBNavbar expand='lg' light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand>DealFix</MDBNavbarBrand>
                    <MDBCollapse navbar>
                        <MDBNavbarNav>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/'>Deals</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='search'>Search</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <br></br>
        </>
    );
}
