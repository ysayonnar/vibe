import cl from './Requests.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Requests = () => {
	const [requests, setRequests] = useState([])
	const [users, setUsers] = useState([])
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
				setRequests(res.data)
				let ids = []
				res.data.map(req => ids.push(req.senderId))
				return ids
			})
			.then(ids => {
				axios
					.post('http://localhost:5000/user/ids', { ids })
					.then(res => {
						setUsers(res.data)
					})
					.catch(e => setError(e.response.data.message))
			})
			.catch(e => {
				setError(e.response.data.message)
			})
	}

	return <div className={cl['main__container']}></div>
}

export default Requests
