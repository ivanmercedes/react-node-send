import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { USUARIO_AUTENTICADO } from '../../types/'
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
                usuarioAutenticado

            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;