import { useEffect, useState } from 'react'
import defUser from '../static/defUser.jpg'
import axios from 'axios'

const UserSettings = () => {
	const [user, setUser] = useState({})
	useEffect(() => {
		fetchUserData()
	}, [])

	async function fetchUserData() {
		await axios
			.get('http://localhost:5000/auth/info', {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(response => setUser(response.data))
	}

	return (
		<div className='user__settings__container'>
			<h1 className='user__settings__title'>Account Settings</h1>
			<img
				src={user.avatar ? `http://localhost:5000/${user.avatar}` : defUser}
				alt='no'
			/>
		</div>
	)
}

export default UserSettings
