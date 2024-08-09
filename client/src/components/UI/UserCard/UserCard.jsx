import cl from './UserCard.module.css'
import defUser from '../../../static/defUser.jpg'
import axios from 'axios'
import { useState } from 'react'

const UserCard = ({ user }) => {
	const [disabled, setDisabled] = useState(false)
	const [btnSettings, setBtnSettings] = useState({
		color: 'rgb(115, 0, 255)',
		text: 'Send friend request',
	})

	async function sendRequest(e) {
		e.preventDefault()
		setDisabled(true)
		await axios
			.post(
				'http://localhost:5000/friend/send',
				{ recipientId: user.id },
				{ headers: { authorization: `Bearer ${localStorage.getItem('auth')}` } }
			)
			.then(res => setBtnSettings({ color: '#00de00', text: 'Sended' }))
			.catch(e => console.log(e.response.data))
	}

	return (
		<div className={cl.container}>
			<img
				src={user.avatar ? `http://localhost:5000/${user.avatar}` : defUser}
				alt='no'
				className={cl.avatar}
			/>
			<div className={cl.info}>
				<h1 className={cl.username}>{user.username}</h1>
				<p className={cl.bio}>
					<b>Bio:</b> {user.bio.slice(0, 200)}
				</p>
				<b>Telegram: </b>
				{user.telegram_username ? (
					<a href={`https://t.me/${user.telegram_username.substring(1)}`}>
						{user.telegram_username}
					</a>
				) : (
					'none'
				)}
			</div>
			<div className={cl.btns}>
				<button
					style={{ backgroundColor: btnSettings.color }}
					disabled={disabled}
					onClick={e => sendRequest(e)}
					className={cl.send}
				>
					{btnSettings.text}
				</button>
			</div>
		</div>
	)
}

export default UserCard
