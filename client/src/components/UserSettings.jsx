import { useEffect, useState } from 'react'
import defUser from '../static/defUser.jpg'
import axios from 'axios'
import CustomButton from './UI/CustomButton/CustomButton'
import Modal from './UI/Modal/Modal'
import Drag from './UI/Drag/Drag'

const UserSettings = () => {
	const [isAvatarChangeModal, setIsAvatarChangeModal] = useState(false)
	const [isAvatarDeleteModal, setIsAvatarDeleteModal] = useState(false)
	const [deleteAvatarMessage, setDeleteAvatarMessage] = useState({
		msg: '',
		color: '',
	})
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

	async function deleteAvatar() {
		await axios
			.delete('http://localhost:5000/user/avatar', {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(response => {
				setDeleteAvatarMessage({ msg: 'Successfully deleted', color: 'green' })
			})
			.catch(e => {
				setDeleteAvatarMessage({ msg: e.response.data.message, color: 'red' })
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
				<CustomButton onClick={() => setIsAvatarChangeModal(true)}>
					Change
				</CustomButton>
				<CustomButton
					style={{ backgroundColor: 'red' }}
					onClick={() => setIsAvatarDeleteModal(true)}
				>
					Delete
				</CustomButton>
			</div>
			{isAvatarChangeModal && (
				<Modal
					isModal={isAvatarChangeModal}
					setIsModal={setIsAvatarChangeModal}
				>
					<Drag />
				</Modal>
			)}
			{isAvatarDeleteModal && (
				<Modal
					isModal={isAvatarDeleteModal}
					setIsModal={setIsAvatarDeleteModal}
				>
					<div className='user__settings__delete__avatar'>
						<h1>Are you sure you want to delete your avatar?</h1>
						<div className='user__settings__delete__buttons'>
							<button id='no' onClick={() => setIsAvatarDeleteModal(false)}>
								No
							</button>
							<button id='yes' onClick={() => deleteAvatar()}>
								Yes
							</button>
						</div>
						<h1
							style={{
								textAlign: 'center',
								color: deleteAvatarMessage.color,
								fontSize: '16px',
							}}
						>
							{deleteAvatarMessage.msg}
						</h1>
					</div>
				</Modal>
			)}
		</div>
	)
}

export default UserSettings
