import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './InputData.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const InputData = () => {
    const [description, setDescripcion] = useState([]);
    const [serverResponse, setServerResponse] = useState(null);
    const [totalSobras, setTotalSobras] = useState(0); // Estado para el total de sobras

    const handleAgregar = (values, resetForm) => {
        if (values.cantidad.length > 0 && values.tamanio.length > 0) {
            const nuevaDescripcion = {
                tamanio: parseFloat(values.tamanio),
                cantidad: parseInt(values.cantidad, 10)
            };
            setDescripcion([...description, nuevaDescripcion]);
            resetForm();
        }
    };

    const handleEliminar = (index) => {
        const nuevaDescripcion = description.filter((_, i) => i !== index);
        setDescripcion(nuevaDescripcion);
    };

    const convertToServerData = (descripciones) => {
        const serverData = [];
        
        for (const { tamanio, cantidad } of descripciones) {
            for (let i = 0; i < cantidad; i++) {
                serverData.push(tamanio);
            }
        }
        
        return serverData;
    };

    const handleEnviarMayor = async () => {
        const dataToSend = convertToServerData(description);
        console.log(dataToSend);
        try {
            const response = await fetch('http://localhost:8080/factory/cutmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            
            if (!response.ok) {
                throw new Error('Error en el envío');
            }
                
            const result = await response.json();
            console.log('Respuesta del servidor:', result);
            
            const total = result.reduce((acc, corte) => acc + corte.longitud, 0);
            setTotalSobras(total);
            
            setServerResponse(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEnviarFifo = async () => {
        const dataToSend = convertToServerData(description);
        console.log(dataToSend);
        try {
            const response = await fetch('http://localhost:8080/factory/cutfifo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            
            if (!response.ok) {
                throw new Error('Error en el envío');
            }
                
            const result = await response.json();
            console.log('Respuesta del servidor:', result);
            
            const total = result.reduce((acc, corte) => acc + corte.longitud, 0);
            setTotalSobras(total);
            
            setServerResponse(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEnviarPermutacion = async () => {
        const dataToSend = convertToServerData(description);
        console.log(dataToSend);
        try {
            const response = await fetch('http://localhost:8080/factory/cutpermutacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            
            if (!response.ok) {
                throw new Error('Error en el envío');
            }
                
            const result = await response.json();
            console.log('Respuesta del servidor:', result);
            
            const total = result.reduce((acc, corte) => acc + corte.longitud, 0);
            setTotalSobras(total);
            
            setServerResponse(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Formik
                initialValues={{
                    cantidad: '',
                    tamanio: '',
                }}
                validate={(valores) => {
                    let errores = {};

                    if (!valores.cantidad) {
                        errores.cantidad = 'El campo cantidad es requerido obligatoriamente';
                    }

                    if (!valores.tamanio) {
                        errores.tamanio = 'El campo tamaño es requerido obligatoriamente';
                    }else if(valores.tamanio >= 6){
                        errores.tamanio = 'El campo tamaño debe ser menor o igual a 6';
                    }
                    return errores;
                }}
            >
                {({ values, errors, touched, handleSubmit, handleChange, handleBlur, resetForm }) => (
                    <Form onSubmit={handleSubmit} className="stylesForm">
                        <section className="stylesContentForm">
                            <div className="stylesContentInput">
                                <label htmlFor='tamanio'>Tamaño</label>
                                <Field
                                    className='stylesInput'
                                    type='text'
                                    id='tamanio'
                                    name='tamanio'
                                    placeholder='Escribe el tamaño aquí'
                                    value={values.tamanio}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.tamanio && errors.tamanio && <div className='styleErrores'>{errors.tamanio}</div>}
                            </div>

                            <div className="stylesContentInput">
                                <label htmlFor='cantidad'>Cantidad</label>
                                <Field
                                    className='stylesInput'
                                    type='text'
                                    id='cantidad'
                                    name='cantidad'
                                    placeholder='Escribe la cantidad aquí'
                                    value={values.cantidad}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.cantidad && errors.cantidad && <div className='styleErrores'>{errors.cantidad}</div>}
                            </div>

                            <div className=''>
                                <button className='' type='button' onClick={() => handleAgregar(values, resetForm)}>
                                    Agregar
                                </button>
                            </div>
                        </section>
                        <section>
                            <div className='stylesDescription'>
                                <h2>Descripción</h2>
                                <ul>
                                    {description.length > 0 ? (
                                        description.map((desc, index) => (
                                            <li key={index}>
                                                Tamaño: {desc.tamanio}, Cantidad: {desc.cantidad}
                                                <FontAwesomeIcon 
                                                    icon={faTrashAlt} 
                                                    className="deleteIcon"
                                                    onClick={() => handleEliminar(index)} // Llamar a la función de eliminar
                                                />
                                            </li>
                                        ))
                                    ) : (
                                        <li>No se han agregado datos.</li>
                                    )}
                                </ul>
                            </div>
                            <div className='containerButton'>
                                <button className='' type='button' onClick={handleEnviarFifo}>
                                    Calcular metodo FiFO
                                </button>
                                <button className='' type='button' onClick={handleEnviarMayor}>
                                    Calcular metodo mayor a menor
                                </button>
                                <button className='' type='button' onClick={handleEnviarPermutacion}>
                                    Calcular metodo Permutacion
                                </button>
                            </div>
                            {serverResponse && (
                                <div className='stylesDescription'>
                                <h2>Descripción de los cortes</h2>
                                {serverResponse.map((corte, index) => {
                                  const cortes = corte.fierros.map(fierro => fierro.longitud).join(', ');
                                  const sobraRedondeada = Math.round(corte.longitud * 100) / 100;
                                  
                                  return (
                                    <div key={index} className='corte'>
                                      <p>
                                        Fierro {index + 1} [{cortes}], Sobra: {sobraRedondeada} metros
                                      </p>
                                    </div>
                                  );
                                })}
                                <h3>Total de sobras: {totalSobras} metros</h3>
                              </div>
                            )}
                        </section>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
