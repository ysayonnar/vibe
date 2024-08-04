import { Children, useState } from 'react'
import FormButton from './UI/FormButton/FormButton'
import FormInput from './UI/FormInput/FormInput'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegistrationForm = () => {
	const navigate = useNavigate()
	const [emailError, setEmailError] = useState('')
	const [usernameError, setUsernameError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [userPayload, setUserPayload] = useState({
		email: '',
		username: '',
		password_hash: '',
	})

	async function register(e) {
		e.preventDefault()
		const response = await axios
			.post('http://localhost:5000/auth/registration', userPayload)
			.then(response => {
				setEmailError('')
				setPasswordError('')
				setUsernameError('')
				const token = response.data.token
				localStorage.setItem('auth', token)
				navigate('/map')
			})
			.catch(e => {
				setEmailError('')
				setPasswordError('')
				setUsernameError('')
				parseErrors(e.response.data.message, e.response.status)
			})
		setUserPayload({ email: '', username: '', password_hash: '' })
	}

	function parseErrors(errArr, status) {
		if (status === 502) {
			setEmailError(errArr)
			setUsernameError(errArr)
			setPasswordError('')
			return
		}
		for (let i = 0; i < errArr.length; i++) {
			const error = errArr[i]
			if (error.includes('email')) {
				setEmailError(error)
			}
			if (error.includes('username')) {
				setUsernameError(error)
			}
			if (error.includes('password')) {
				setPasswordError(error)
			}
		}
	}

	return (
		<div className='form__container'>
			<div className='form__inner__container'>
				<h1 className='form__h1'>Registration</h1>
				<form className='form'>
					<FormInput
						error={emailError}
						placeholder='Email'
						text='Email'
						value={userPayload.email}
						onChange={e =>
							setUserPayload({ ...userPayload, email: e.target.value })
						}
					/>
					<FormInput
						error={usernameError}
						placeholder='Username'
						text='Username'
						value={userPayload.username}
						onChange={e =>
							setUserPayload({ ...userPayload, username: e.target.value })
						}
					/>
					<FormInput
						error={passwordError}
						placeholder='Password'
						text='Password'
						value={userPayload.password_hash}
						onChange={e =>
							setUserPayload({ ...userPayload, password_hash: e.target.value })
						}
					/>
					<FormButton onClick={e => register(e)}>Create Account</FormButton>
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
