import { firebaseDb } from '../core/firebase/firebaseConfig';


export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    /* o redux-thunk além de retornar o dispatch também retorna o estado atual dentro do metodo getState. */ 
    return (dispatch, getState) => {

        /* Pego do state atual a description que está na tela. */ 
        const description = getState().todo.description;

        const request = firebaseDb.ref('todo');

        if(description){
            request.orderByChild('description').startAt(description);
        }else{
            request.orderByChild('createdAt');
        }

        request.on('value', (snapshot) => { 
            let list = [];
            list = snapshot.val();
            var arr = Object.keys(list).map(function (key) { 
                return { 
                            _id: key, 
                            createdAt: list[key].createdAt,
                            description: list[key].description,
                            done: list[key].done  
                        }; 
            });
            dispatch({type: 'TODO_SEARCHED', payload: arr});
        });
    }
}


export const add = (description) => {
    return dispatch => {
        var date = Date.now;
        firebaseDb.ref('todo').push({ description: description, done: false, createdAt: firebase.database.ServerValue.TIMESTAMP }).once('value')
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()));
    }
}

export const markAsDone = (todo) => {
    return dispatch => {
        let url = 'todo/'+ todo._id;
        firebaseDb.ref(url).update({ ...todo, done: true })
            .then(resp => dispatch(search()))
    }
}

export const markAsPending = (todo) => {
    return dispatch => {
        let url = 'todo/'+ todo._id;
        firebaseDb.ref(url).update({ ...todo, done: false })
            .then(resp => dispatch(search()))
    }
}

export const remove = (todo) => {
    return dispatch => {      
        let url = 'todo/'+ todo._id;
        firebaseDb.ref(url).remove()
            .then(resp => dispatch(search()))
    }
}

export const clear = () => {
    return [{ type: 'TODO_CLEAR' }, search()]
}