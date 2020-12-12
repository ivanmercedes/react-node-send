import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { USUARIO_AUTENTICADO } from '../../types/';
import clienteAxios from '../../config/axios';


const AuthState = ({children}) =>{

    // Definir un state inicial
    const initialState = {
        token: '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    // Definir el reducer
    const [state, disptch] = useReducer(authReducer, initialState);

    // Registrar nuevo usuario
    const registrarUsuario = async datos =>{
        try {
            const respuesta = await clienteAxios.post('/api/usuarios',datos);
            console.log(respuesta);
        } catch (error) {
            console.log(error);
        }
    }


    // Usuario auntenticado
    const usuarioAutenticado = nombre =>{
        disptch({
            type: USUARIO_AUTENTICADO,
            payload: nombre
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                usuarioAutenticado,
                registrarUsuario

            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;