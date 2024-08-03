import FormButton from './UI/FormButton/FormButton'
import FormInput from './UI/FormInput/FormInput'
import { useNavigate } from 'react-router-dom'

const RegistrationForm = () => {
	const navigate = useNavigate()

	return (
		<div className='form__container'>
			<div className='form__inner__container'>
				<h1 className='form__h1'>Registration</h1>
				<form className='form'>
					<FormInput placeholder='Email' text='Email' />
					<FormInput placeholder='Username' text='Username' />
					<FormInput placeholder='Password' text='Password' />
					<FormButton>Create Account</FormButton>
				</form>

				<div className='form__redirect'>
					Already have an account?{' '}
					<div onClick={() => navigate('/login')}>Log in</div>
				</div>
			</div>
		</div>
	)
}

export default RegistrationForm
