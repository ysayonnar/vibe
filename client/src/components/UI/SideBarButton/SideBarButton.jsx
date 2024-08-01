import cl from './SideBarButton.module.css'

const SideBarButton = ({ children, ...props }) => {
	return (
		<button {...props} className={cl.button}>
			{children}
		</button>
	)
}

export default SideBarButton
