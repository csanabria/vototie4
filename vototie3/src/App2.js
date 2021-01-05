import React from 'react';
import './App.css';
import { DatosEleccion } from './DatosEleccion';
import Papeleta5 from './componentes/Papeleta5'
import Encabezado from './componentes/Encabezado'

function App2() {
  //console.log(DatosEleccion);
  return (
    <div className="App">
      <Encabezado></Encabezado>
      <header className="App-header">
        <Papeleta5 DatosEleccion = {DatosEleccion} />
      </header>
    </div>
  );
}

export default App2;
