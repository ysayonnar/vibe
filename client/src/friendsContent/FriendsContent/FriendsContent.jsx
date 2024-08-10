import cl from './FriendsContent.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import FriendsCard from '../../components/UI/FriendCard/FriendsCard'

const FriendsContent = () => {
	const [friends, setFriends] = useState([])
	const [error, setError] = useState('')

	async function getFriends() {
		await axios
			.get('http://localhost:5000/friend/list', {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(res => setFriends(res.data))
			.catch(e => setError(e.response.data.message))
	}

	useEffect(() => {
		getFriends()
	}, [])

	return (
		<div className={cl['main__container']}>
			{friends.length !== 0 && (
				<h1
					style={{
						textAlign: 'left',
						color: 'white',
						fontSize: '26px',
						marginBottom: '20px',
					}}
				>
					Total: {friends.length}
				</h1>
			)}
			{friends.length === 0 ? (
				<h1 style={{ textAlign: 'center', color: 'white' }}>No friends</h1>
			) : (
				friends.map(friend => <FriendsCard user={friend} key={friend.id} />)
			)}
		</div>
	)
}

export default FriendsContent
