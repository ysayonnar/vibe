import { useState } from 'react'
import axios from 'axios'
import cl from './Find.module.css'
import UserCard from '../../components/UI/UserCard/UserCard'
import searchImage from '../../static/search.png'

const Find = () => {
	const [foundedUsers, setFoundedUsers] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [error, setError] = useState('')

	function handleKeyDown(e) {
		if (e.key === 'Enter') {
			search()
		}
	}

	async function search() {
		if (searchQuery.length === 0) {
			setFoundedUsers([])
			setError('Search field cant be empty.')
			return
		}
		await axios
			.get(`http://localhost:5000/user/search/${searchQuery}`, {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(res => {
				setError('')
				setFoundedUsers(res.data)
			})
			.catch(e => {
				setError(e.response.data.message)
				setFoundedUsers([])
				console.log(e.response.data)
			})
	}

	return (
		<div className={cl['main__container']}>
			<div className={cl.search} onKeyDown={e => handleKeyDown(e)}>
				<input
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					type='text'
					placeholder='Search'
				/>
				<img
					alt='search'
					src={searchImage}
					style={{ margin: '0' }}
					onClick={search}
				/>
			</div>
			<h1 className={cl.error}>{error}</h1>
			<div className={cl.users}>
				{foundedUsers.length !== 0 &&
					foundedUsers.map(founded => (
						<UserCard key={founded.id} user={founded} />
					))}
			</div>
		</div>
	)
}

export default Find
