import cl from './PlaceCard.module.css'
import ratingStar from '../../../static/ratingStar.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Modal from '../../UI/Modal/Modal'
import axios from 'axios'

const PlaceCard = ({ place, change, setChange }) => {
	const navigate = useNavigate()
	const [isCatsModal, setIsCatsModal] = useState(false)
	const [isEditModal, setIsEditModal] = useState(false)
	const [isDeleteModal, setIsDeleteModal] = useState(false)
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [editError, setEditError] = useState('')

	async function deletePlace(e) {
		e.preventDefault()
		await axios
			.delete(`http://localhost:5000/place/delete/${place.id}`, {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(res => {
				console.log(res)
			})
			.catch(e => console.log(e))
		setIsDeleteModal(false)
		setChange(!change)
	}

	async function changePlace(e) {
		e.preventDefault()
		await axios
			.put(
				`http://localhost:5000/place/update/${place.id}`,
				{
					name,
					description,
				},
				{ headers: { authorization: `Bearer ${localStorage.getItem('auth')}` } }
			)
			.then(res => {
				setIsEditModal(false)
				setName('')
				setDescription('')
				setEditError('')
			})
			.catch(e => {
				setEditError('Invalid input')
			})
		setChange(!change)
	}

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
				<div className={cl.delete}>
					<h3>Are you sure you want to delete this place?</h3>
					<button
						onClick={e => deletePlace(e)}
						className={cl['delete__button']}
					>
						Yes
					</button>
				</div>
			</Modal>
			<Modal isModal={isEditModal} setIsModal={setIsEditModal}>
				<h1 className={cl.editTitle}>Edit</h1>
				<form className={cl.editForm}>
					<input
						type='text'
						className={cl.customInput}
						placeholder='Name...'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<input
						type='text'
						className={cl.customInput}
						placeholder='Description...'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
					<h1 className={cl.editError}>{editError}</h1>
					<button className={cl.sendBtn} onClick={e => changePlace(e)}>
						Change
					</button>
				</form>
			</Modal>
		</div>
	)
}

export default PlaceCard
