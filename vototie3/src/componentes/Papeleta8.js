import React, {useState, useEffect} from 'react'
import {Row, Card, Button} from 'react-bootstrap'
import useSound from 'use-sound';
import Modal from "./Modal";
import useKeyPress from '../hooks/useKeyPress';

const LOCALSTORAGE_KEY = 'eleccionTIE'

const Papeleta8 = (props) => {
    //props
    const datosEleccion = props.datosEleccion;    
    const setDatosEleccion = props.setDatosEleccion
    
    //valores de estado local
    const [estadoLocal, setEstadoLocal] = useState(null);
    const [contador, setContador] = useState(0);
    const [isModalOpen, toggleModal] = useState(false);
    const [isConfirmarModalOpen, toggleConfirmarModal] = useState(false);
    const [candidatoSeleccionado, setCandidatoSeleccionado] = useState(null);

    //colocar los datos en el estado local
    useEffect(() => {
        setEstadoLocal(datosEleccion);
    }, [])


    //hook para uso de sonido
    const soundUrl = 'sonidos/alert_call_tune.mp3';
    const [play] = useSound(soundUrl);

    //funcion para confirmar al candidato seleccionado del id indicado en 1
    //funcion que aumenta la cantidad de votos del id indicado en 1
    const Confirmar = id => {
        //copiar estado a una variable temporal
        var cambioEstado = datosEleccion;
        //debugger;
        //buscar el candidato
        cambioEstado.Candidatos.map(c => {
            if (c.Id === id) {
                console.log('votando por ', id);
                //debugger;
                c.CantidadVotos++;
                c.Seleccionada = true;
                debugger;
                setCandidatoSeleccionado(c);
            }
            return c.CantidadVotos;
        })

        setContador(contador+1);

        toggleConfirmarModal(true);
        //setTimeout(() => toggleModal(false), 500)  //solo tarda 2 segundos, pues con 20 es lento para pruebas, pero 20 me pareció un buen tiempo de espera
    }

    //funcion que aumenta la cantidad de votos del id indicado en 1
    const Votar = id => {
        //copiar estado a una variable temporal
        var cambioEstado = datosEleccion;
        //debugger;
        //buscar el candidato
        cambioEstado.Candidatos.map(c => {
            if (c.Id === id) {
                console.log('votando por ', id);
                //debugger;
                c.CantidadVotos++;
                c.Seleccionada = true;
                setCandidatoSeleccionado(c);
            }
            return c.CantidadVotos;
        })

        setContador(contador+1);
        play();       //sin sonido por ahora

        //escribir a localStorage en caso de algún fallo
        window.localStorage.setItem(
            LOCALSTORAGE_KEY,
            JSON.stringify(datosEleccion)
          )
        //usar la función que viene desde App para setear el estado
        setDatosEleccion(datosEleccion);
        toggleConfirmarModal(true);
    }

    const seleccionar = async (card, candidato) => {
        setCandidatoSeleccionado(candidato);
        toggleConfirmarModal(true);
    }

    const votoIncorrecto = () => {
        //no haced ningún cambio al estado
        //ocultar el modal de confirmación
        toggleConfirmarModal(false); 
        //muestra el modal de agradecimiento
    }

    const confirmarVoto = (idCandidato) => {
        //sumar el contador y el estado
        //actualizar el estado global con el nuevo valor
        //ocultar el modal de confirmación
        toggleConfirmarModal(false);

        //registrar el voto
        Votar(idCandidato);

        //ocultar el modal de confirmación
        toggleConfirmarModal(false);

        toggleModal(true);
        
        //mostrar el modal de agradecimiento
        setTimeout(() => toggleModal(false), 10000)  //solo tarda 2 segundos, pues con 20 es lento para pruebas, pero 20 me pareció un buen tiempo de espera
    }

    const renderCard = (candidato, id, seleccionada) => {
        return (
            <Card style={{ width: '18rem', color: 'black' }} key={id} onClick={c=>seleccionar(c, candidato)} key={id}>
                <Card.Img variant="top" src={candidato.Imagen} />
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                        {candidato.Id}- {candidato.Nombre}<br/>
                        {candidato.CantidadVotos}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    return (
        <>
            <div className="contenido">
                <Row>
                    <div>
                        {datosEleccion ? datosEleccion.NombreEleccion : null}
                    </div>
                </Row>
                <Row>
                    <div>
                        &nbsp;
                    </div>
                </Row>
                <Row className="justify-content-md-center">
                    {datosEleccion.Candidatos ? datosEleccion.Candidatos.map(c => renderCard(c, c.Id, Votar)) : null}
                </Row>
                <Modal className="contenido" isOpen={isModalOpen} toggle={toggleModal}>
                    <br/>
                    <br/>
                    <h1>GRACIAS POR EJERCER SU DERECHO AL VOTO</h1>
                    <img alt="Gracias" style={{margin:40}} src="imagenes/logoTIE.png"></img>
                    <p>Entre todos nos cuidamos y protegemos la democracia institucional</p>
                </Modal>
                <Modal className="col-sm-8" isOpen={isConfirmarModalOpen} toggle={toggleConfirmarModal}>
                    <h1>POR FAVOR CONFIRME SU VOTO</h1>
                    <Card style={{ width: '18rem', color: 'black' }} >
                        <Card.Img variant="top" src={candidatoSeleccionado && candidatoSeleccionado.Imagen} />
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Text>
                                {candidatoSeleccionado && candidatoSeleccionado.Nombre}<br/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <p>¿La opción seleccionada es correcta?</p>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>
                                    <button className="col-sm-6 btn-primary" onClick={() => confirmarVoto(candidatoSeleccionado.Id)}>SI</button>
                                </td>
                                <td>
                                    <button className="col-sm-6 btn-warning" onClick={() => votoIncorrecto()}>NO</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Modal>
            </div>
        </>
    );
}

export default Papeleta8
