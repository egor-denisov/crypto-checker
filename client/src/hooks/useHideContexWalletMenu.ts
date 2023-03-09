import { useActions } from './useActions'

export const useHideContexWalletMenu = () => {
	const { hideContexWalletMenu } = useActions()
	hideContexWalletMenu()
}
