import { useEffect, useState } from 'react'
import axios from 'axios'
import cl from './Find.module.css'
import FormButton from '../../components/UI/FormButton/FormButton'
import UserCard from '../../components/UI/UserCard/UserCard'

const Find = () => {
	const [user, setUser] = useState({})
	const [foundedUsers, setFoundedUsers] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		fetchUserData()
	}, [])

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
		<div className={cl['main__container']}>
			<div className={cl.search}>
				<input
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					type='text'
					placeholder='Username'
				/>
				<FormButton style={{ margin: '0' }} onClick={search}>
					Search
				</FormButton>
			</div>
			<h1 className={cl.error}>{error}</h1>
			{foundedUsers.length !== 0 &&
				foundedUsers.map(founded => (
					<UserCard key={founded.id} user={founded} />
				))}
		</div>
	)
}

export default Find
