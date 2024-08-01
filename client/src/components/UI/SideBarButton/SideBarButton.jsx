import cl from './SideBarButton.module.css'

const SideBarButton = ({ children, isActive, ...props }) => {
	return (
		<button {...props} className={isActive ? cl['active__button'] : cl.button}>
			{children}
		</button>
	)
}

export default SideBarButton
