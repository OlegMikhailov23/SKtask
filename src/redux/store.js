import { configureStore } from '@reduxjs/toolkit';
import formReducer from './form-reducer';

export default configureStore({
    reducer: {
        editForm: formReducer
    }
})
