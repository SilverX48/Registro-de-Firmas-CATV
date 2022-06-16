import React from "react";
import ScannerForm from "../componentes/ScannerForm";
import Header from "../componentes/header";
import Footer from "../componentes/footer";

function ScannerPage(){
    return(
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <ScannerForm />
        <Footer />
      </div>
    )
}

export default ScannerPage;