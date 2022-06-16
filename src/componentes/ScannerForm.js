import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'

import Scanner from './Scanner';
import '../estilos/Formulario.css';

function ScannerForm() {
  const navigation = useNavigate();

  const [result, setResult] = useState([]);
  const [show, setShow] = useState(false);

  const _onDetected = (data) => {
    setResult({ results: data})
    async function getData(){
      try{
          const response = await axios.get(
              `http://agr.tresvalles.hn:8091/api/SelCompraDes?cod=${result.results.codeResult.code}`
            );
          setShow(false);
          navigation('/firmar', {state: response.data});
          console.clear();
      }catch(err){
          setShow(true);
          console.error(err);
      }
  }

  getData();
  }

  const handleOpen = () => setShow(true);

  const handleClose = () => setShow(false);

    return(
      <div className="d-flex flex-column p-5">
          <div className="form-group p-2 m-2">
            <div className="d-flex flex-column align-items-center">
            <button className='btn w-50' onClick={handleOpen}>Presione aqui para escanear</button>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Escaneando...</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Scanner onDetected={_onDetected} />
              </Modal.Body>
              <Modal.Footer>
                <Button className='btn' onClick={handleClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
      </div>    
    )
}

export default ScannerForm;

