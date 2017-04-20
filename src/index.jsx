import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

/** redux-promise => midleware responsável por tratar a espera pelas requisições assincronas 
 * para depois parssar o retorno para os reducers */
import promise from 'redux-promise'
/** redux-multi => permite ao action create do react devolva várias actions que seram executadas em paralelo */
import multi from 'redux-multi'
/** redux-thunk => faz com que o action create não retorne mais um ou várias ações, 
 * mas sim o dispatch, que é o responsável por disparar as ações 
 * dispatch =>  é o cara que entrega o retorno do action create para o reducer */
import thunk from 'redux-thunk'

import App from './main/app'
import reducers from './main/reducers'

/* Connecta a aplicação ao plugin do chrome que monitora o controle de estado do redux */ 
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__()

/** Essa chamada define tbm parte do ciclo de vida  */
const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers, devTools)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('app'))