import cl from './PlaceCard.module.css'
import ratingStar from '../../../static/ratingStar.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Modal from '../../UI/Modal/Modal'

const PlaceCard = ({ place }) => {
	const navigate = useNavigate()
	const [isCatsModal, setIsCatsModal] = useState(false)
	const [isEditModal, setIsEditModal] = useState(false)
	const [isDeleteModal, setIsDeleteModal] = useState(false)

	return (
		<div className={cl.card}>
			<div className={cl.container}>
				<div className={cl.image}>
					<img src={`http://localhost:5000/${place.image}`} alt='' />
				</div>
				<div className={cl['btns__container']}>
					<button className={cl.btn} onClick={() => setIsCatsModal(true)}>
						Categories
					</button>
					<button className={cl.btn} onClick={() => setIsEditModal(true)}>
						Edit
					</button>
					<button className={cl.btn} onClick={() => setIsDeleteModal(true)}>
						Delete
					</button>
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
			<Modal isModal={isCatsModal} setIsModal={setIsCatsModal}>
				Categories {place.id}
			</Modal>
			<Modal isModal={isDeleteModal} setIsModal={setIsDeleteModal}>
				Delete {place.id}
			</Modal>
			<Modal isModal={isEditModal} setIsModal={setIsEditModal}>
				Edit {place.id}
			</Modal>
		</div>
	)
}

export default PlaceCard
