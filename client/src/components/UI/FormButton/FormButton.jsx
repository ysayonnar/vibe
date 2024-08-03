import cl from './FormButton.module.css'

const FormButton = ({ children, ...props }) => {
	return (
		<button className={cl.button} {...props}>
			{children}
		</button>
	)
}

export default FormButton
