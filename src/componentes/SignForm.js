import React, { useCallback, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'
import { ArrowBackRounded } from '@material-ui/icons';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';

import '../estilos/Formulario.css';

function SignForm() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [contraseña, setContraseña] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [show, setShow] = useState(false);
  const [usuarioErrors, setUsuarioErrors] = useState(true);
  const [contraseñaErrors, setContraseñaErrors] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);


  const handleClose = () => setShow(false);

  const handleButtonClick = useCallback (() => {
    
    async function getData(){
        setIsLoading(true);
        try{
            const response = await axios.get(
                `http://agr.tresvalles.hn:8091/api/GuardaFirma?cod=${location.state.BOLETA}&&user=${usuario}&&pass=${contraseña}&&disp=Android`
              );
            setIsLoading(false)
            setData(response.data);
            setShow(true);
        }catch(err){
            setIsLoading(true)
            console.error(err);
        }
    }

    getData();
      
  },[usuario,contraseña]);

  const handleChange1 = event => {
    event.preventDefault()
    setUsuario(event.target.value)
  }
  const handleChange2 = event => {
    event.preventDefault()
    setContraseña(event.target.value)
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleVerify(input){
    if(input === "usuario"){
        if(!usuario) setUsuarioErrors(true);
        else setUsuarioErrors(false);
    }else if(input === "contraseña"){
        if(!contraseña) setContraseñaErrors(true);
        else setContraseñaErrors(false);
    }else if(input === "firmar"){
        if(usuario && contraseña && !usuarioErrors && !contraseñaErrors){
            handleButtonClick();
        }else{
          setUsuarioErrors(true);
          setContraseñaErrors(true);
        }
    }
}

    return(
      <div className="d-flex flex-column p-5">
        <ArrowBackRounded onClick={() => navigate('/')}  className='success'/>
        <h2 className="text-center m-2 ">Ingreso de Usuario</h2>
        {location.state.map(datas =>(
          <div key={1} className='table-responsive'> 
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Zafra</th>
                  <th scope="col">Boleta</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Fecha Entrada</th>
                  <th scope="col">Fecha Salida</th>
                  <th scope="col">Cargado</th>
                  <th scope="col">Descargado</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> {datas.ZAFRA} </td>
                  <td> {datas.BOLETA} </td>
                  <td> {datas.NOMBC} </td>
                  <td> {datas.FECHAE} </td>
                  <td> {datas.FECHAS} </td>
                  <td> {datas.CARGADO} </td>
                  <td> {datas.DESCARGADO} </td>
                  <td> {datas.CANTIDAD} </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
          <div className="form-group p-2 m-2">
            <label className="h3">Usuario</label>
            <TextField
              id="outlined-required"
              label="Ingrese su usuario"
              type='text'
              className="form-control"
              required
              onChange={handleChange1}
              onBlur={() => handleVerify("usuario")}
            />
          </div>

          {usuarioErrors && (<p className='text-danger'>Campo sin datos...</p>)}

          <div className="form-group p-2 m-2">
            <label className="h3">Contraseña</label>
            <TextField
              id="outlined-required"
              label="Ingrese su contraseña"
              type={passwordShown ? "text" : "password"}
              className="form-control"
              required
              onChange={handleChange2}
              onBlur={() => handleVerify("contraseña")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={togglePassword}
                      onMouseDown={handleMouseDownPassword}>
                      <Visibility />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {contraseñaErrors && (<p className='text-danger'>Campo sin datos...</p>)}

          <div className="form-group text-center m-2">
            <button type="submit" className="btn" onClick={() => handleVerify("firmar")}>Firmar</button>
          </div>

          {isLoading && <p>Loading...</p>}

          {data.map(datas =>(
            <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>CATV</Modal.Title>
              </Modal.Header>
              <Modal.Body key={2}>{datas.EXP_MENSAJE}</Modal.Body>
              <Modal.Footer>
                <Button className='btn' onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            </>
          ))}

      </div>
    )
}

export default SignForm;