import cl from './Requests.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import FriendRequestCard from '../../components/UI/FriendRequestCard/FriendRequestCard'

const Requests = () => {
	const [users, setUsers] = useState([])
	const [userId, setUserId] = useState(0)
	const [error, setError] = useState('')

	useEffect(() => {
		fetchRequests()
	}, [])

	async function fetchRequests() {
		await axios
			.get('http://localhost:5000/friend/received', {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(res => {
				setUserId(res.data[0].recipientId)
				let ids = []
				res.data.map(req => ids.push(req.senderId))
				axios
					.post('http://localhost:5000/user/ids', { ids })
					.then(res => {
						setUsers(res.data)
					})
					.catch(e => {
						setError(e.response.data.message)
					})
			})
			.catch(e => {
				console.log(e)
				setError(e.response.data.message)
			})
	}

	return (
		<div className={cl['main__container']}>
			{users.length === 0 ? (
				<h1 style={{ textAlign: 'center', color: 'white' }}>
					No friend requests
				</h1>
			) : (
				users.map(user => (
					<FriendRequestCard currentId={userId} key={user.id} user={user} />
				))
			)}
		</div>
	)
}

export default Requests
