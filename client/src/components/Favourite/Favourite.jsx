import { useEffect, useState } from 'react'
import cl from './Favourite.module.css'
import axios from 'axios'
import ratingStar from '../../static/ratingStar.png'
import { useNavigate } from 'react-router-dom'

const Favourite = () => {
	const [user, setUser] = useState({ favourite_places: [] })
	const [change, setChange] = useState(false)
	const navigate = useNavigate()

	async function getUserInfo() {
		await axios
			.get('http://localhost:5000/auth/info', {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(res => {
				setUser(res.data)
				console.log(res.data)
			})
	}

	async function deleteFromFav(e, id) {
		e.preventDefault()
		await axios
			.delete(`http://localhost:5000/place/favourite/delete/${id}`, {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(res => {
				setChange(!change)
			})
	}

	useEffect(() => {
		getUserInfo()
	}, [change])

	return (
		<div className={cl.main}>
			<h1 className={cl.page__title}>Favourite places</h1>
			<div className={cl.favourite__container}>
				{user.favourite_places.map(place => (
					<div className={cl.card}>
						<div className={cl.container}>
							<div className={cl.image}>
								<img src={`http://localhost:5000/${place.image}`} alt='' />
							</div>
							<div className={cl['btns__container']}>
								<button
									className={cl.btn}
									onClick={e => deleteFromFav(e, place.id)}
								>
									Delete form favourite
								</button>
							</div>
						</div>
						<div
							className={cl.info}
							onClick={() => navigate(`/place/${place.id}`)}
						>
							<h1 className={cl.title}>{place.name}</h1>
							<h4 className={cl.description}>
								{place.description.slice(0, 100) + '...'}
							</h4>

							<div className={cl['rating__container']}>
								<img src={ratingStar} alt='' />
								<h3>
									{place.calculatedRating === 0
										? 0
										: Math.round(place.calculatedRating * 10) / 10}
								</h3>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Favourite
