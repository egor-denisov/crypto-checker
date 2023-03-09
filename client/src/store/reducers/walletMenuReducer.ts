import {
	WalletMenuAction,
	WalletMenuActionTypes,
	WalletMenu
} from '../../types/walletMenuTypes'

const initialContexWalletMenu: WalletMenu = {
	vizibleContexMenu: false,
	vizibleDropdownMenu: false
}
export const WalletMenuReducer = (
	state = initialContexWalletMenu,
	action: WalletMenuAction
) => {
	switch (action.type) {
		case WalletMenuActionTypes.HIDE_WALLET_CONTEX_MENU:
			return { ...state, vizibleContexMenu: false }
		case WalletMenuActionTypes.SHOW_WALLET_CONTEX_MENU:
			return { ...state, vizibleContexMenu: true }
		case WalletMenuActionTypes.HIDE_WALLET_DROPDOWN_MENU:
			return { ...state, vizibleDropdownMenu: false }
		case WalletMenuActionTypes.SHOW_WALLET_DROPDOWN_MENU:
			return { ...state, vizibleDropdownMenu: true }
		default:
			return state
	}
}
