import React, {useState} from 'react'
import {Row, Card, Button} from 'react-bootstrap'
import foto1 from './imagenes/JonG.png'
import foto2 from './imagenes/scottH.png'

const estadoInicial = {
    NombreEleccion : "Eleccion X para el periodo del X de X de X al Y de Y de Y",
    Candidatos : [
        {
            Id : 1,
            Nombre : "Jon",
            Imagen : foto1,
            Seleccionada : false,
            CantidadVotos : 0
        },
        {
            Id : 2,
            Nombre : "Scott1",
            Imagen : foto2,
            Seleccionada : false,
            CantidadVotos : 0
        }
    ]
}

//#region reducer
const reducer = (state, action) => {
    debugger;
    console.log("Dentro del reducer");
    console.log("action.type = " + action.type);
    switch (action.type) {
        case 'setCargando':
            console.log('paso 1');
            return {
                ...state,
                cargando: action.payload
            }
        case 'votar':
            console.log('votando por ', action.payload);
            debugger;
            //copiar estado a una variable temporal
            var cambioEstado = state;
            //buscar el candidato
            cambioEstado.Candidatos.map(c => {
                if (c.Id === action.payload) {
                    //cuando lo encuentre, incrementar la cantidad de votos para el candidato
                    c.Seleccionada = true;
                    c.CantidadVotos++;
                }
                else
                {
                    c.Seleccionada = false;
                }
            })
            //obtener la cantidad de votos actuales
            return cambioEstado;
        default:
            console.log('default del switch, action.type=' + action.type)
            return state
    }
}

const Papeleta2 = (props) => {
    //valores de estado local
    const [estadoLocal, setEstadoLocal] = useState(estadoInicial);
    const [contador, setContador] = useState(0);

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
        })
        setEstadoLocal(cambioEstado);
        setContador(contador+1);
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
    debugger;
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
                {estadoLocal.Candidatos.map(c => renderCard(c, c.Id, Votar))}
            </Row>
            <pre>{JSON.stringify(estadoLocal, null, 2)}</pre>
        </>
    )
}

export default Papeleta2
