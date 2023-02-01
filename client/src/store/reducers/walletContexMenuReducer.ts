import { ContexWalletMenuAction, ContexWalletMenuActionTypes, WalletContexMenu } from "../../types/walletContexMenuTypes"

const initialContexWalletMenu: WalletContexMenu = {
    vizible: false
}
export const ContexWalletMenuReducer = (state = initialContexWalletMenu, action: ContexWalletMenuAction) => {
    switch (action.type){
        case ContexWalletMenuActionTypes.HIDE_WALLET_CONTEX_MENU:
            return {...state, vizible: false}
        case ContexWalletMenuActionTypes.SHOW_WALLET_CONTEX_MENU:
            return {...state, vizible: true}
        default:
            return state
    }
}