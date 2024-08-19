import { useNavigate } from 'react-router-dom'
import cl from './Places.module.css'
import PlaceCard from '../UI/PlaceCard/PlaceCard'

const Places = () => {
	const navigate = useNavigate()
	return (
		<div className={cl.main}>
			{/* <button
				style={{ width: '200px', height: '100px' }}
				onClick={() => navigate('/placeCreate')}
			>
				
			</button> */}
			<h1 className={cl['page__title']}>Your places</h1>
			<div className={cl['grid__container']}>
				<PlaceCard />
				<PlaceCard />
				<PlaceCard />
				<PlaceCard />
				<PlaceCard />
				<PlaceCard />
				<PlaceCard />
				<PlaceCard />
				<PlaceCard />
			</div>
		</div>
	)
}

export default Places
