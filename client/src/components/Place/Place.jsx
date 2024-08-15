import cl from './Place.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ratingStar from '../../static/ratingStar.png'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'

const Place = ({ id }) => {
	const [place, setPlace] = useState({})
	const [error, setError] = useState('')

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

	console.log(place)

	return (
		<div className={cl.main}>
			{error && <h1 className={cl.error}>{error}</h1>}
			<div className={cl.mapImage}>
				<img src={place && `http://localhost:5000/${place.image}`} alt='' />
				{/* <YMaps>
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
				</YMaps> сделать просмотр в модальном окне по нажатию кнопки view on the map */}
			</div>
			<div className={cl.info}>
				<div>
					<h1 className={cl.name}>{place.name}</h1>
					<p className={cl.description}>{place.description}</p>
				</div>
				<button className={cl.mapButton}>
					<h1>View on the map</h1>
				</button>
			</div>
		</div>
	)
}

export default Place
