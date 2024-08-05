import cl from './CustomButton.module.css'

const CustomButton = ({ children, ...props }) => {
	return (
		<button className={cl.button} {...props}>
			{children}
		</button>
	)
}

export default CustomButton
