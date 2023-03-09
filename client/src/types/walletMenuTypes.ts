export type WalletMenu = {
	vizibleContexMenu: boolean
	vizibleDropdownMenu: boolean
}

export enum WalletMenuActionTypes {
	HIDE_WALLET_CONTEX_MENU = 'HIDE_WALLET_CONTEX_MENU',
	SHOW_WALLET_CONTEX_MENU = 'SHOW_WALLET_CONTEX_MENU',
	SHOW_WALLET_DROPDOWN_MENU = 'SHOW_WALLET_DROPDOWN_MENU',
	HIDE_WALLET_DROPDOWN_MENU = 'HIDE_WALLET_DROPDOWN_MENU'
}
interface HideContexMenu {
	type: WalletMenuActionTypes.HIDE_WALLET_CONTEX_MENU
}
interface ShowContexMenu {
	type: WalletMenuActionTypes.SHOW_WALLET_CONTEX_MENU
}
interface HideDropdown {
	type: WalletMenuActionTypes.HIDE_WALLET_DROPDOWN_MENU
}
interface ShowDropdown {
	type: WalletMenuActionTypes.SHOW_WALLET_DROPDOWN_MENU
}

export type WalletMenuAction =
	| HideContexMenu
	| ShowContexMenu
	| HideDropdown
	| ShowDropdown
