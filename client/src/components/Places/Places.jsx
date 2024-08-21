import { useNavigate } from 'react-router-dom'
import cl from './Places.module.css'
import PlaceCard from '../UI/PlaceCard/PlaceCard'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Places = () => {
	const navigate = useNavigate()
	const [places, setPlaces] = useState([])
	const [change, setChange] = useState(false)

	async function getUserInfo() {
		await axios
			.get('http://localhost:5000/place/current', {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(res => {
				setPlaces(res.data)
			})
			.catch(e => {
				console.log(e.response.data)
			})
	}

	useEffect(() => {
		getUserInfo()
	}, [change])

	return (
		<div className={cl.main}>
			<div className={cl.header}>
				<h1 className={cl['page__title']}>
					{places.length ? 'Your places' : 'No places'}
				</h1>
				<button
					className={cl.createbtn}
					onClick={() => navigate('/placeCreate')}
				>
					Create place
				</button>
			</div>
			{places.length && (
				<div className={cl['grid__container']}>
					{places.map(place => (
						<PlaceCard
							change={change}
							setChange={setChange}
							place={place}
							key={place.id}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default Places
