// Este es el componente del encabezado (header) de la pagina.
import React from "react";
import '../estilos/Formulario.css';

function Header(){
    return(
        <header className="py-5 text-center">
            <h1 className="font-weight-bold text-light ">Registro de Firmas</h1>
            <img className="usuario" src={require('../img/man.png')} alt={"man"} />
        </header>
    )
}

export default Header;