import React, {useState} from 'react'
import {Row, Card} from 'react-bootstrap'
import useSound from 'use-sound';
import Modal from "./Modal";
import foto1 from './imagenes/Candidato1.png'
import foto2 from './imagenes/Candidato2.png'
import foto3 from './imagenes/Candidato3.jpg'
//4. con sonido

const estadoInicial = {
}

const Papeleta5 = (props) => {
    //props
    debugger;
    const datosEleccion = props.DatosEleccion;

    //valores de estado local
    const [estadoLocal, setEstadoLocal] = useState(datosEleccion);
    const [contador, setContador] = useState(0);
    const [isModalOpen, toggleModal] = useState(false);

    //hook para uso de sonido
    const soundUrl = 'sonidos/alert_call_tune.mp3';
    const [play] = useSound(soundUrl);

    //funcion que aumenta la cantidad de votos del id indicado en 1
    const Votar = id => {
        //copiar estado a una variable temporal
        var cambioEstado = estadoLocal;
        //buscar el candidato
        cambioEstado.Candidatos.map(c => {
            if (c.Id === id) {
                console.log('votando por ', id);
                debugger;
                c.CantidadVotos++;
                c.Seleccionada = true;
            }
            return c.CantidadVotos;
        })
        setEstadoLocal(datosEleccion);
        setContador(contador+1);
        //play();       //sin sonido por ahora
        toggleModal(true);
        setTimeout(() => toggleModal(false), 2000)  //solo tarda 2 segundos, pues con 20 es lento para pruebas, pero 20 me pareció un buen tiempo de espera
    }

    const seleccionar = async (card, idCandidato) => {
        //await setSeleccionada(idCandidato)
        Votar(idCandidato);
        console.log("Seleccionado id: ", idCandidato)
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
    //debugger;
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
}

export default Papeleta5
