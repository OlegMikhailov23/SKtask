import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'editForm',
    initialState: {
        userName: '',
        phone: '',
        email: '',
        profile: '',
        city: '',
        organization: '',
        recipient: '',
        from: ''
    },
    reducers: {
        setName: (state, action) => {
            return{
                ...state,
                userName: action.payload
            }
        },
        setPhone: (state, action) => {
            return{
                ...state,
                phone: action.payload
            }
        },
        setEmail: (state, action) => {
            return{
                ...state,
                email: action.payload
            }
        },
        setProfile: (state, action) => {
            return {
                ...state,
                profile: action.payload
            }
        },
        setCity: (state, action) => {
            return {
                ...state,
                city: action.payload
            }
        },
        setOrganization: (state, action) => {
            return {
                ...state,
                organization: action.payload
            }
        },
        setRecipient: (state, action) => {
            return {
                ...state,
                recipient: action.payload
            }
        },
        setFrom: (state, action) => {
            return {
                ...state,
                from: action.payload
            }
        },
        clearState: (state, action) => {
            return {
                ...state,
                userName: action.payload,
                phone: action.payload,
                email: action.payload,
                profile: action.payload,
                city: action.payload,
                organization: action.payload,
                recipient: action.payload,
                from: action.payload,
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { setName, setPhone, setEmail,  setProfile, setCity, setOrganization, setRecipient, setFrom, clearState} = counterSlice.actions

export default counterSlice.reducer
