import cl from './FormInput.module.css'

const FormInput = ({ error, text, ...props }) => {
	return (
		<div className={cl.main}>
			<h1 className={cl.text}>{text}</h1>
			<input className={cl.input} {...props} />
			<p className={cl.error}>{error}</p>
		</div>
	)
}

export default FormInput
