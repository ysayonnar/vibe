import cl from './Place.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import Modal from '../UI/Modal/Modal'
import emptyStar from '../../static/emptyStar.png'
import fullStar from '../../static/fullStar.png'

const Place = ({ id }) => {
	const [place, setPlace] = useState({ categories: [], favourite_users: [] })
	const [error, setError] = useState('')
	const [isModal, setIsModal] = useState(false)
	const [user, setUser] = useState({})
	const [changed, setChanged] = useState(false)
	const [stars, setStars] = useState([
		fullStar,
		fullStar,
		fullStar,
		fullStar,
		fullStar,
	])
	const [reviewData, setReviewData] = useState({
		title: '',
		description: '',
		grade: 5,
	})
	const [reviewError, setReviewError] = useState('')

	async function getPlaceById() {
		await axios
			.get(`http://localhost:5000/place/byid/${id}`)
			.then(res => {
				setPlace(res.data)
			})
			.catch(e => {
				setError(e.response.data.message)
			})
	}

	async function getUserInfo() {
		await axios
			.get('http://localhost:5000/auth/info', {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(res => setUser(res.data))
	}

	async function handleFavourite(e) {
		e.preventDefault()
		const isFav =
			place.favourite_users.filter(favUser => favUser.id === user.id).length ===
			1
		if (!isFav) {
			await axios.post(
				`http://localhost:5000/place/favourite/add/${place.id}`,
				{},
				{ headers: { authorization: `Bearer ${localStorage.getItem('auth')}` } }
			)
		} else {
			await axios.delete(
				`http://localhost:5000/place/favourite/delete/${place.id}`,
				{ headers: { authorization: `Bearer ${localStorage.getItem('auth')}` } }
			)
		}
		setChanged(!changed)
	}

	function handleStar(index) {
		let payload = []
		for (let i = 0; i < 5; i++) {
			if (index < i) {
				payload.push(emptyStar)
			} else {
				payload.push(fullStar)
			}
		}
		setStars(payload)
		setReviewData({ ...reviewData, grade: index + 1 })
	}

	async function sendReview(e) {
		e.preventDefault(e)
		if (reviewData.title.length < 4 || reviewData.description.length === 0) {
			setReviewError('Incorrect form')
			return
		}
		await axios
			.post(`http://localhost:5000/review/create/${place.id}`, reviewData, {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(res => setReviewError('Sended!'))
			.catch(e => {
				setReviewError(e.response.data.message)
			})
	}

	useEffect(() => {
		getPlaceById()
		getUserInfo()
	}, [changed])
	return (
		<div className={cl.main}>
			{error && <h1 className={cl.error}>{error}</h1>}
			<div className={cl.mapImage}>
				<img src={place && `http://localhost:5000/${place.image}`} alt='' />
			</div>
			<div className={cl.info}>
				<div>
					<h1 className={cl.name}>{place.name}</h1>
					<p className={cl.description}>{place.description}</p>
				</div>
				<button
					className={cl.mapButton}
					onClick={e => {
						e.preventDefault()
						setIsModal(true)
					}}
				>
					<h1>View on the map</h1>
				</button>
			</div>

			<div className={cl.another__info}>
				<div className={cl.fav__container}>
					<button onClick={e => handleFavourite(e)} className={cl.mapButton}>
						<h1>
							{place.favourite_users.filter(favUser => favUser.id === user.id)
								.length === 1
								? 'Delete from favourite'
								: 'Add to favourite'}
						</h1>
					</button>
					<h2 className={cl.fav}>
						{place.favourite_users && place.favourite_users.length} users added
						to favourite
					</h2>
				</div>
				<h3>Categories:</h3>
				<div className={cl.categories__container}>
					{place.categories &&
						place.categories.map(category => (
							<div className={cl.category}>{category.name}</div>
						))}
				</div>
			</div>

			<div className={cl.reviews__block}>
				<h1 style={{ textAlign: 'center' }}>Send review</h1>
				<form className={cl.review__form}>
					<input
						type='text'
						className={cl.review__input}
						placeholder='Title...'
						value={reviewData.title}
						onChange={e =>
							setReviewData({ ...reviewData, title: e.target.value })
						}
					/>
					<input
						type='text'
						className={cl.review__input}
						placeholder='Description...'
						value={reviewData.description}
						onChange={e =>
							setReviewData({ ...reviewData, description: e.target.value })
						}
					/>
					<div className={cl.starsBar}>
						{stars.map((star, index) => (
							<img
								onClick={() => handleStar(index)}
								className={cl.star}
								src={star}
								alt=''
							/>
						))}
					</div>
					<h5 className={cl.reviewError}>{reviewError}</h5>
					<button onClick={e => sendReview(e)} className={cl.reviewBtn}>
						Send
					</button>
				</form>
				{/* <h1>Rating: {place.calculatedRating}</h1> */}
			</div>

			<Modal isModal={isModal} setIsModal={setIsModal}>
				<YMaps>
					<div className={cl['map__container']}>
						<Map
							className={cl.map}
							defaultState={{
								center: [place.longtitude, place.width],
								zoom: 12,
							}}
						>
							<Placemark
								geometry={[place.longtitude, place.width]}
								options={{ iconColor: 'red' }}
							/>
						</Map>
					</div>
				</YMaps>
			</Modal>
		</div>
	)
}

export default Place
