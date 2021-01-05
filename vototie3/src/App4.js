import React, {useState, useEffect} from 'react';
import Modal from "./componentes/Modal";
import './App.css';
import Papeleta8 from './componentes/Papeleta8';
import Encabezado from './componentes/Encabezado';
import useKeyPress from './hooks/useKeyPress';

//4. con useKeyPress y tablaresultados 

function App4() {

  useKeyPress('R', () => {
    //alert('mostrar resultados!')
    toggleResModal(true);
  });

  useKeyPress('r', () => {
    //alert('mostrar resultados!')
    toggleResModal(true);
  });


  //lee datos del json para pasarlos al componente papeleta
  var datos2;
  const [datos,setDatos]=useState([]);
  const [isModalResOpen, toggleResModal] = useState(false);

  const rutaDatos = "datos/DatosEleccion.json"
  const LeerDatos= async ()=>{
    //debugger;
    await fetch(rutaDatos
    ,{
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        //console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        return myJson;
      });
  }
  const LeerDatos2 = async () => {

    fetch(rutaDatos)
    .then(res => res.json().then(datos => setDatos(datos)));
    return;
  }
  
  //debugger;
  useEffect(()=>{
    LeerDatos2();
  }, [])
  
  return (
    <div className="App">
      <Encabezado></Encabezado>
      <header className="App-header">
        <Papeleta8 datosEleccion = {datos} setDatosEleccion = { setDatos } />
      </header>
      <div className="contenido">
        <h2>*** VERSION PARA DEMOSTRACION ***</h2>
        <h4>Uso general</h4>
        <p>Tecla R: ver tabla de resultados.<br/>
        Al confirmar el voto la aplicación muestra una confirmación durante 10 segundos y emite un sonido.</p>
        <img alt="TIE" className="logoTIEpeq" src="imagenes/logoTIE.png"/>
      </div>
      <Modal className="contenido" isOpen={isModalResOpen} toggle={toggleResModal}>
                <h1>RESULTADOS</h1>
                {/* {datos ? <p>{JSON.stringify(datos)}</p> : null} */}

                {datos ? 
                  <table className="tablaresultados">
                    <thead>
                      <tr>
                        <td>Candidato</td>
                        <td>Votos</td>
                      </tr>
                    </thead>
                    <tbody>
                      {datos.Candidatos
                        ? [
                          datos.Candidatos.map((c) => {
                            return <tr key={c.Id}><td>{c.Nombre}</td><td>{c.CantidadVotos}</td></tr>
                          })
                        ]
                        : null
                      }
                    </tbody>
                  </table>
                 : null}

                <p>Entre todos nos cuidamos y protegemos la democracia institucional</p>
                <button className="btn-primary col-sm-2" onClick={() => toggleResModal(false)}>OK</button>
            </Modal>
    </div>
  );
}

export default App4;
