import React, {useState, useEffect} from 'react';
import './App.css';
import Papeleta7 from './componentes/Papeleta7'
import Encabezado from './componentes/Encabezado'


function App3() {
  //lee datos del json para pasarlos al componente papeleta
  var datos2;
  const [datos,setDatos]=useState([]);
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
        <Papeleta7 datosEleccion = {datos} />
        {/* <pre>{JSON.stringify(datos)}</pre> */}
      </header>
      
    </div>
  );
}

export default App3;
