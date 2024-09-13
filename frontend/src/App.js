import logo from './logo.svg';
import './App.css';

//components
import SectionAgregarProducto from './components/Section_Producto/SectionProducto';

// en entorno de development: estoy usando un .env para esta variable
// en entorno production: cargo esta variable en el hosting
export const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 

function App() {
  return (
    <>
        <SectionAgregarProducto />
    </>
  );
}

export default App;
