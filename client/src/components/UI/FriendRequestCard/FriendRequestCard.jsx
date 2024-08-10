import cl from './FriendRequestCard.module.css'
import defUser from '../../../static/defUser.jpg'
import axios from 'axios'

const FriendRequestCard = ({ user, currentId }) => {
	async function accept(e) {
		e.preventDefault()
		const id = user.sended_friend_requests.filter(
			req => req.recipientId === currentId
		)[0].id
		console.log(id)

		await axios
			.get(`http://localhost:5000/friend/accept/${id}`, {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(res => console.log(res.data))
			.catch(e => console.log(e.response.data))
	}

	async function decline(e) {
		e.preventDefault()
		const id = user.sended_friend_requests.filter(
			req => req.recipientId === currentId
		)[0].id

		await axios
			.get(`http://localhost:5000/friend/decline/${id}`, {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(res => console.log(res.data))
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
					style={{ backgroundColor: 'green' }}
					className={cl.btn}
					onClick={e => accept(e)}
				>
					Accept
				</button>
				<button
					style={{ backgroundColor: 'red' }}
					className={cl.btn}
					onClick={e => decline(e)}
				>
					Decline
				</button>
			</div>
		</div>
	)
}

export default FriendRequestCard
