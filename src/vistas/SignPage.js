import React from "react";

//Se llama los componentes de la pagina: Header, Formulario y Footer.
import Header from "../componentes/header";
import SignForm from "../componentes/SignForm";
import Footer from "../componentes/footer";

//Por medio de bootstrap se le da display Flex al elemento div con direccion de columna.
function SignPage(){
    return(
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <SignForm />
      <Footer />
    </div>
    )
}

export default SignPage;