import cl from './FriendsCard.module.css'
import defUser from '../../../static/defUser.jpg'
import { useState } from 'react'
import axios from 'axios'

const FriendsCard = ({ user }) => {
	const [disabled, setDisabled] = useState(false)
	const [error, setError] = useState('')

	async function remove(e) {
		e.preventDefault()
		setDisabled(true)
		await axios
			.get(`http://localhost:5000/friend/delete/${user.id}`, {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.catch(e => setError(e.response.data))
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
				<button disabled={disabled} className={cl.btn} onClick={e => remove(e)}>
					Delete
				</button>
			</div>
		</div>
	)
}

export default FriendsCard
