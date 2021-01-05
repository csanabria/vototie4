import React, {useState, useEffect} from 'react'
import {Row, Card, Button} from 'react-bootstrap'
import useSound from 'use-sound';
import Modal from "./Modal";
// import foto1 from './imagenes/Candidato1.png'
// import foto2 from './imagenes/Candidato2.png'
// import foto3 from './imagenes/Candidato3.jpg'
//6. sin sonido y tiempo de espera de 2 segundos, para pruebas
//leer json con fetch

const LOCALSTORAGE_KEY = 'eleccionTIE'
var datosEleccion = {};

const Papeleta6 = (props) => {
    //debugger;
    console.log("render"); //debugger;
    const datosEleccion = props.datosEleccion;

    //valores de estado local
    const [estadoLocal, setEstadoLocal] = useState(datosEleccion);
    
    //const estadoActual = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || datosEleccion;

    const [contador, setContador] = useState(0);
    const [isModalOpen, toggleModal] = useState(false);

    //hook para uso de sonido
    const soundUrl = 'sonidos/alert_call_tune.mp3';
    const [play] = useSound(soundUrl);

    //funcion que aumenta la cantidad de votos del id indicado en 1
    const Votar = id => {
        //copiar estado a una variable temporal
        var cambioEstado = estadoLocal;
        //debugger;
        //buscar el candidato
        cambioEstado.Candidatos.map(c => {
            if (c.Id === id) {
                console.log('votando por ', id);
                //debugger;
                c.CantidadVotos++;
                c.Seleccionada = true;
            }
            return c.CantidadVotos;
        })

        setContador(contador+1);
        //play();       //sin sonido por ahora
        //escribir a localStorage en caso de algún fallo
        
        window.localStorage.setItem(
            LOCALSTORAGE_KEY,
            JSON.stringify(datosEleccion)
          )

        toggleModal(true);
        setTimeout(() => toggleModal(false), 2000)  //solo tarda 2 segundos, pues con 20 es lento para pruebas, pero 20 me pareció un buen tiempo de espera
    }

    const seleccionar = async (card, idCandidato) => {
        Votar(idCandidato);
    }

    const renderCard = (candidato, id, seleccionada) => {
        return (
            <Card style={{ width: '18rem', color: 'black' }} onClick={c=>seleccionar(c, id)} key={id}>
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
    debugger;
    if (estadoLocal)    
        return (
            <>
                <Row>
                    <div>
                        {estadoLocal.NombreEleccion}
                    </div>
                </Row>
                <Row>
                    <div>
                        &nbsp;
                    </div>
                </Row>
                <Row>
                    {estadoLocal.Candidatos ? estadoLocal.Candidatos.map(c => renderCard(c, c.Id, Votar)) : null}
                </Row>
                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    <h1>GRACIAS POR EJERCER SU DERECHO AL VOTO</h1>
                    <img alt="Gracias" style={{margin:40}} src="imagenes/logoTIE.png"></img>
                    <p>Entre todos nos cuidamos y protegemos la democracia institucional</p>
                    {/* <button onClick={() => toggleModal(false)}>toggle</button><button onClick={() => toggleModal(false)}>toggle</button> */}
                </Modal>
            </>
        )
    else
        return (
            <h2>No hay estado local para renderizar</h2>
        )
}

export default Papeleta6
