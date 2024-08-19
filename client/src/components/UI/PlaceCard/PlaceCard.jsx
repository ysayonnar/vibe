import cl from './PlaceCard.module.css'
import ratingStar from '../../../static/ratingStar.png'
import { useNavigate } from 'react-router-dom'

const PlaceCard = ({ place }) => {
	const navigate = useNavigate()

	return (
		<div className={cl.card}>
			<div className={cl.container}>
				<div className={cl.image}>
					<img src={`http://localhost:5000/${place.image}`} alt='' />
				</div>
				<div className={cl['btns__container']}>
					<button className={cl.btn}>Categories</button>
					<button className={cl.btn}>Edit</button>
					<button className={cl.btn}>Delete</button>
				</div>
			</div>
			<div className={cl.info} onClick={() => navigate(`/place/${place.id}`)}>
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
	)
}

export default PlaceCard
