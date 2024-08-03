import cl from './FormInput.module.css'

const FormInput = ({ text, ...props }) => {
	return (
		<div className={cl.main}>
			<h1 className={cl.text}>{text}</h1>
			<input className={cl.input} {...props} />
		</div>
	)
}

export default FormInput
