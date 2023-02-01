import { ContexWalletMenuAction, ContexWalletMenuActionTypes } from "../../types/walletContexMenuTypes"

export const hideContexWalletMenu = (): ContexWalletMenuAction => {
    return {type: ContexWalletMenuActionTypes.HIDE_WALLET_CONTEX_MENU}
}
export const showContexWalletMenu = (): ContexWalletMenuAction => {
    return {type: ContexWalletMenuActionTypes.SHOW_WALLET_CONTEX_MENU}
}