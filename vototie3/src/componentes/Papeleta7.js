import React, {useState, useEffect} from 'react'
import {Row, Card, Button} from 'react-bootstrap'
import useSound from 'use-sound';
import Modal from "./Modal";

const LOCALSTORAGE_KEY = 'eleccionTIE'

const Papeleta7 = (props) => {
    const datosEleccion = props.datosEleccion;    

    //valores de estado local
    const [estadoLocal, setEstadoLocal] = useState(null);
    const [contador, setContador] = useState(0);
    const [isModalOpen, toggleModal] = useState(false);
    const [isResultadosModalOpen, toggleResultadosModal] = useState(false);

    //colocar los datos en el estado local
    useEffect(() => {
        setEstadoLocal(datosEleccion);
    }, [])


    //hook para uso de sonido
    const soundUrl = 'sonidos/alert_call_tune.mp3';
    const [play] = useSound(soundUrl);

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

    // var t = estadoLocal;
    // setEstadoLocal()
    // debugger;
    return (
        <>
            {/* <pre>{JSON.stringify(datosEleccion)}</pre> */}
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
            <Row>
                {datosEleccion.Candidatos ? datosEleccion.Candidatos.map(c => renderCard(c, c.Id, Votar)) : null}
            </Row>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <h1>GRACIAS POR EJERCER SU DERECHO AL VOTO</h1>
                <img alt="Gracias" style={{margin:40}} src="imagenes/logoTIE.png"></img>
                <p>Entre todos nos cuidamos y protegemos la democracia institucional</p>
                {/* <button onClick={() => toggleModal(false)}>toggle</button><button onClick={() => toggleModal(false)}>toggle</button> */}
            </Modal>
            <Modal isOpen={isResultadosModalOpen} toggle={toggleResultadosModal}>
                <h1>RESULTADOS</h1>

                <p>Entre todos nos cuidamos y protegemos la democracia institucional</p>
                <button onClick={() => toggleResultadosModal(false)}>toggle</button><button onClick={() => toggleModal(false)}>toggle</button>
            </Modal>
        </>
    );
}

export default Papeleta7
