import { useEffect, useState } from 'react'
import defUser from '../static/defUser.jpg'
import axios from 'axios'
import CustomButton from './UI/CustomButton/CustomButton'
import Modal from './UI/Modal/Modal'
import Drag from './UI/Drag/Drag'
import FormInput from '../components/UI/FormInput/FormInput'
import FormButton from '../components/UI/FormButton/FormButton'

const UserSettings = () => {
	const [isAvatarChangeModal, setIsAvatarChangeModal] = useState(false)
	const [isAvatarDeleteModal, setIsAvatarDeleteModal] = useState(false)
	const [deleteAvatarMessage, setDeleteAvatarMessage] = useState({
		msg: '',
		color: '',
	})
	const [isTgModal, setIsTgModal] = useState(false)
	const [tg, setTg] = useState('')
	const [tgSetting, setTgSettings] = useState({ msg: '', color: '' })
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

	async function editTelegram() {
		await axios
			.post(
				'http://localhost:5000/user/tg',
				{ telegram_username: tg },
				{ headers: { authorization: `Bearer ${localStorage.getItem('auth')}` } }
			)
			.then(res => {
				setUser({ ...user, telegram_username: tg })
				setTg('')
				setTgSettings({
					msg: 'Successfully changed',
					color: 'green',
				})
			})
			.catch(e => {
				console.log(e)
				setTg('')
				setTgSettings({
					msg: e.response.data.message,
					color: 'red',
				})
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
					Upload new
				</CustomButton>
				<CustomButton
					style={{ backgroundColor: 'red' }}
					onClick={() => setIsAvatarDeleteModal(true)}
				>
					Delete
				</CustomButton>
			</div>
			<div className='user__settings__telegram'>
				<div className='user__settings__telegram__container'>
					<h1>Current telegram username: </h1>
					{user.telegram_username ? (
						<a href={`https://t.me/${user.telegram_username.substring(1)}`}>
							{user.telegram_username}
						</a>
					) : (
						'none'
					)}
				</div>
				<CustomButton
					style={{ marginLeft: '20px' }}
					onClick={() => setIsTgModal(true)}
				>
					Change
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
			{isTgModal && (
				<Modal isModal={isTgModal} setIsModal={setIsTgModal}>
					<div className='tg__edit__container'>
						<FormInput
							value={tg}
							onChange={e => setTg(e.target.value)}
							placeholder='New telegram username'
							style={{ backgroundColor: '#d9d9d9', color: 'black' }}
						/>
						<FormButton
							style={{ marginTop: '5px' }}
							onClick={() => editTelegram()}
						>
							Save
						</FormButton>
						<h1 style={{ color: tgSetting.color }}>{tgSetting.msg}</h1>
					</div>
				</Modal>
			)}
		</div>
	)
}

export default UserSettings
