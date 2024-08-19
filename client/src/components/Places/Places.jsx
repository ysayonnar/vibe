import { useNavigate } from 'react-router-dom'
import cl from './Places.module.css'
import PlaceCard from '../UI/PlaceCard/PlaceCard'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Places = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState({})

	async function getUserInfo() {
		await axios
			.get('http://localhost:5000/auth/info', {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(res => {
				console.log(res.data)
				setUser(res.data)
			})
			.catch(e => {
				console.log(e.response.data)
			})
	}

	useEffect(() => {
		getUserInfo()
	}, [])

	return (
		<div className={cl.main}>
			<div className={cl.header}>
				<h1 className={cl['page__title']}>
					{user['created_places'] ? 'Your places' : 'No places((('}
				</h1>
				<button
					className={cl.createbtn}
					onClick={() => navigate('/placeCreate')}
				>
					Create place
				</button>
			</div>
			{user['created_places'] && (
				<div className={cl['grid__container']}>
					{user['created_places'].map(place => (
						<PlaceCard place={place} key={place.id} />
					))}
				</div>
			)}
		</div>
	)
}

export default Places
