import { useState } from 'react'
import FormButton from './UI/FormButton/FormButton'
import FormInput from './UI/FormInput/FormInput'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginForm = () => {
	const navigate = useNavigate()
	const [loginPayload, setLoginPayload] = useState({ email: '', password: '' })
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')

	async function login(e) {
		e.preventDefault()
		const response = await axios
			.post('http://localhost:5000/auth/login', loginPayload)
			.then(response => {
				setEmailError('')
				setPasswordError('')
				const token = response.data.token
				localStorage.setItem('auth', token)
				navigate('/map')
				setLoginPayload({ email: '', password: '' })
			})
			.catch(e => {
				setEmailError('')
				setPasswordError('')
				parseErrors(e.response.data.message, e.response.status)
			})
	}

	function parseErrors(errArr, status) {
		if (status === 403) {
			setEmailError('')
			setPasswordError(errArr)
			return
		}
		if (status === 404) {
			setEmailError(errArr)
			setPasswordError('')
			return
		}
		for (let i = 0; i < errArr.length; i++) {
			const error = errArr[i]
			if (error.includes('email')) {
				setEmailError(error)
			}
			if (error.includes('password')) {
				setPasswordError(error)
			}
		}
	}

	return (
		<div className='form__container'>
			<div className='form__inner__container__login'>
				<h1 className='form__h1'>Login</h1>
				<form className='form'>
					<FormInput
						error={emailError}
						placeholder='Email'
						text='Email'
						value={loginPayload.email}
						onChange={e =>
							setLoginPayload({ ...loginPayload, email: e.target.value })
						}
					/>
					<FormInput
						error={passwordError}
						placeholder='Password'
						text='Password'
						value={loginPayload.password}
						onChange={e =>
							setLoginPayload({ ...loginPayload, password: e.target.value })
						}
					/>
					<FormButton onClick={e => login(e)}>Sign In</FormButton>
				</form>
				<div className='form__redirect'>
					Don't have an account?{' '}
					<div onClick={() => navigate('/registration')}>Sign Up</div>
				</div>
			</div>
		</div>
	)
}

export default LoginForm
