import React from 'react';
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'
import './Encabezado.css';

const Encabezado = (props) => {
    const usuarioValido = false;    
    const loginUsuario = "";
  const Salir = () => {
  };

    return (
        <div className="encabezado">
            <div className='row encabezadoLinea1'>
                <img src="imagenes/logotec_blanco.png" alt="logo" />
                <div className="nombreAplicacion">Elecciones TEC - TIE</div>
            </div>
            <div className='row encabezadoLinea1'>&nbsp;</div>
            {   //Revisa si muestra o no el menu
            (usuarioValido)
                ?
                    (<div className='row'>
                        <Navbar expand="sm" className="menu">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                </Nav>
                                <Nav>
                                    <Button variant="outline-success btn btn-danger text-white" onClick={Salir}>Salir</Button>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        
                    </div>)
            : null}
        </div>
    )
}

export default Encabezado

