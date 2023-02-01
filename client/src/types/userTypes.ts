export type WashListType = string[]
export type WalletElementType = {
    count: number
    price: number
}
export type WalletType = {
    [coin: string] : WalletElementType
}
export type logpassType = {login: string, password: string}
export type UserDataType = {
    id: number, 
    username: string, 
    password: string, 
    washlist_id: number, 
    washlist: WashListType,
    wallet_id: number, 
    wallet: WalletType,
    wallet_keys: string[]
}
export type UserType = {
    loading: boolean, 
    error: string, 
    data: UserDataType
}
export enum UserActionTypes {
    FETCH_CHECKUSER = "FETCH_CHECKUSER",
    FETCH_CHECKUSER_SUCCESS = "FETCH_CHECKUSER_SUCCESS",
    FETCH_CHECKUSER_ERROR = "FETCH_CHECKUSER_ERROR",
    UPDATE_WASHLIST = "UPDATE_WASHLIST",
    UPDATE_WALLET = "UPDATE_WALLET"
}
interface CheckUserAction {
    type: UserActionTypes.FETCH_CHECKUSER,
}
interface CheckUserSuccessAction {
    type: UserActionTypes.FETCH_CHECKUSER_SUCCESS,
    payload: UserDataType
}
interface CheckUserErrorAction {
    type: UserActionTypes.FETCH_CHECKUSER_ERROR,
    payload: string
}
interface ChangeWashlist {
    type: UserActionTypes.UPDATE_WASHLIST,
    payload: WashListType
}
interface ChangeWallet {
    type: UserActionTypes.UPDATE_WALLET,
    payload: WalletType
}

export type UserAction =  CheckUserAction | CheckUserSuccessAction | CheckUserErrorAction | ChangeWashlist | ChangeWallet