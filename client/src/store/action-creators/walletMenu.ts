import {
	WalletMenuAction,
	WalletMenuActionTypes
} from '../../types/walletMenuTypes'

export const hideContexWalletMenu = (): WalletMenuAction => {
	return { type: WalletMenuActionTypes.HIDE_WALLET_CONTEX_MENU }
}
export const showContexWalletMenu = (): WalletMenuAction => {
	return { type: WalletMenuActionTypes.SHOW_WALLET_CONTEX_MENU }
}
export const hideDropdownWalletMenu = (): WalletMenuAction => {
	return { type: WalletMenuActionTypes.HIDE_WALLET_DROPDOWN_MENU }
}
export const showDropdownWalletMenu = (): WalletMenuAction => {
	return { type: WalletMenuActionTypes.SHOW_WALLET_DROPDOWN_MENU }
}
