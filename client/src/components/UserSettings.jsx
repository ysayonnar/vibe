import { useEffect, useState } from 'react'
import defUser from '../static/defUser.jpg'
import axios from 'axios'
import CustomButton from './UI/CustomButton/CustomButton'
import Modal from './UI/Modal/Modal'

const UserSettings = () => {
	const [isModal, setIsModal] = useState(false)
	const [user, setUser] = useState({})
	useEffect(() => {
		fetchUserData()
	}, [])

	async function fetchUserData() {
		await axios
			.get('http://localhost:5000/auth/info', {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(response => {
				setUser(response.data)
			})
	}

	return (
		<div className='user__settings__container'>
			<h1 className='user__settings__title'>Account Settings</h1>
			<div className='user__settings__avatar'>
				<img
					src={user.avatar ? `http://localhost:5000/${user.avatar}` : defUser}
					alt='no'
					className='user__settings__avatar__img'
				/>
				<CustomButton onClick={() => setIsModal(true)}>Change</CustomButton>
				<CustomButton style={{ backgroundColor: 'red' }}>Delete</CustomButton>
			</div>
			{isModal && (
				<Modal isModal={isModal} setIsModal={setIsModal}>
					привет
				</Modal>
			)}
		</div>
	)
}

export default UserSettings
