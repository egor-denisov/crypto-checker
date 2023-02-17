import { UserAction, UserActionTypes, UserType } from "../../types/userTypes"

const initialUser: UserType = {
    loading: false,
    error: '',
    data: {
        id: -1,
        username: '', 
        email: '',
        password: '', 
        washlist_id: -1,
        washlist: [],
        wallet_id: -1,
        wallet: {},
        wallet_keys: []
    }
}
export const UserReducer = (state = initialUser, action: UserAction) => {
    switch (action.type){
        case UserActionTypes.FETCH_CHECKUSER:
            return {...state, loading: true}
        case UserActionTypes.FETCH_CHECKUSER_SUCCESS:
            return {...state, loading: false, error: "", data: action.payload}
        case UserActionTypes.FETCH_CHECKUSER_ERROR:
            return {...state, loading: false, error: action.payload}
        case UserActionTypes.UPDATE_WASHLIST:
            return {...state, data: {...state.data, washlist: action.payload}}
        case UserActionTypes.UPDATE_WALLET:
            return {...state, data: {...state.data, wallet: action.payload, wallet_keys: Object.keys(action.payload)}}
        case UserActionTypes.LOGOUT_USER:
            return initialUser
        default:
            return state
    }
}