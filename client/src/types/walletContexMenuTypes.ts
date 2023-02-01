export type WalletContexMenu = {
    vizible: boolean
}

export enum ContexWalletMenuActionTypes {
    HIDE_WALLET_CONTEX_MENU = 'HIDE_WALLET_CONTEX_MENU',
    SHOW_WALLET_CONTEX_MENU = 'SHOW_WALLET_CONTEX_MENU'
}
interface HideContexWalletMenu {
    type: ContexWalletMenuActionTypes.HIDE_WALLET_CONTEX_MENU
}
interface ShowContexWalletMenu {
    type: ContexWalletMenuActionTypes.SHOW_WALLET_CONTEX_MENU
}


export type ContexWalletMenuAction =  HideContexWalletMenu | ShowContexWalletMenu