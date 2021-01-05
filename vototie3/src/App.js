import './App.css';
import Papeleta4 from './componentes/Papeleta4'
import Encabezado from './componentes/Encabezado'

function App() {
  return (
    <div className="App">
      <Encabezado></Encabezado>
      <header className="App-header">
        <div className="contenido">
          <Papeleta4 />
        </div>
      </header>
    </div>
  );
}

export default App;
