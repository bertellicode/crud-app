import { combineReducers } from 'redux'
import todoReducer from '../todo/todoReducer'
import authReducer from '../core/auth/authReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoReducer
})

export default rootReducer