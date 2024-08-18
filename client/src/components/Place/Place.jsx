import cl from './Place.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ratingStar from '../../static/ratingStar.png'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import Modal from '../UI/Modal/Modal'

const Place = ({ id }) => {
	const [place, setPlace] = useState({})
	const [error, setError] = useState('')
	const [isModal, setIsModal] = useState(false)

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

	useEffect(() => {
		getPlaceById()
	}, [])

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

			<div className={cl.reviewsInfo}>
				<h1 style={{ fontSize: '20px' }}>
					Place created by <b>{place.user && place.user.username}</b>
				</h1>
			</div>

			{/* пока оставлю, потом нужно будет сделать отображение категорий и в принципе всей остальной информации */}

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
