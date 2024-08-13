import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import axios from 'axios'
import { useEffect, useState } from 'react'
import defUser from '../static/defUser.jpg'
import { useNavigate } from 'react-router-dom'

const MainMap = ({ lon = 53.903242, width = 27.554318 }) => {
	const [places, setPlaces] = useState([])
	const navigate = useNavigate()

	async function getPlaces() {
		await axios
			.get('http://localhost:5000/place')
			.then(res => {
				setPlaces(res.data)
			})
			.catch(e => console.log(e))
	}

	useEffect(() => {
		getPlaces()
	}, [])

	return (
		<YMaps>
			<div className='map__container'>
				<Map className='map' defaultState={{ center: [lon, width], zoom: 12 }}>
					{places.map(place => (
						<Placemark
							key={place.id}
							geometry={[place.longtitude, place.width]}
							onClick={() => navigate(`/place/${place.id}`)}
							options={{ iconColor: 'red' }}
						/>
					))}
				</Map>
			</div>
		</YMaps>
	)
}

export default MainMap
