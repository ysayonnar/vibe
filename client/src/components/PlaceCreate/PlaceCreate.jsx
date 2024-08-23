import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cl from './PlaceCreate.module.css'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import FormInput from '../UI/FormInput/FormInput'
import FormButton from '../UI/FormButton/FormButton'
import axios from 'axios'

const PlaceCreate = () => {
	const [coords, setCoords] = useState([])
	const [drag, setDrag] = useState(false)
	const [message, setMessage] = useState({ msg: '', color: '' })
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [file, setFile] = useState()
	const [nameError, setNameError] = useState('')
	const navigate = useNavigate()

	function dragStartHandler(e) {
		e.preventDefault()
		setDrag(true)
	}

	function dragLeaveHandler(e) {
		e.preventDefault()
		setDrag(false)
	}

	async function onDropHandler(e) {
		e.preventDefault()
		let file = [...e.dataTransfer.files]
		if (file.length > 1) {
			setMessage({ msg: 'You can add only one file', color: 'red' })
			return
		} else {
			setFile(file[0])
		}
		setDrag(false)
	}

	async function createPlace(e) {
		e.preventDefault()
		const formData = new FormData()
		formData.append('image', file)
		if (!file) {
			setNameError('You need to add photo')
			return
		}
		formData.append('longtitude', coords[0])
		formData.append('width', coords[1])
		formData.append('name', name)
		formData.append('description', description)
		await axios
			.post('http://localhost:5000/place/create', formData, {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(res => {
				navigate('/map')
			})
			.catch(e => {
				if (e.response.data.message) {
					setNameError(e.response.data.message)
				} else {
					setNameError('Form is incorrect')
				}
			})
	}

	return (
		<div className={cl.main}>
			<div className={cl['form_container']}>
				<form className={cl.form}>
					<h1 style={{ textAlign: 'center', color: 'white' }}>Create Place</h1>
					<FormInput
						text={'Name of the place'}
						placeholder={'Name...'}
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<FormInput
						text={'Description of the place'}
						placeholder={'Description...'}
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
					<div>
						{drag ? (
							<div
								onDragStart={e => dragStartHandler(e)}
								onDragLeave={e => dragLeaveHandler(e)}
								onDragOver={e => dragStartHandler(e)}
								onDrop={e => onDropHandler(e)}
								className={cl.dropArea}
							>
								Release the file to download it
							</div>
						) : (
							<div
								onDragStart={e => dragStartHandler(e)}
								onDragLeave={e => dragLeaveHandler(e)}
								onDragOver={e => dragStartHandler(e)}
								className={cl.def}
							>
								Drag and drop the file to upload it
							</div>
						)}
						<div
							style={{
								textAlign: 'center',
								color: message.color,
								fontSize: '10px',
								marginTop: '10px',
							}}
						>
							<h1>{message.msg}</h1>
						</div>
					</div>
					<h3 style={{ color: 'white' }}>
						Click on the map to choose location
					</h3>
					<YMaps>
						<div className={cl['map__container']}>
							<Map
								onClick={e => setCoords(e._sourceEvent.originalEvent.coords)}
								className={cl.map}
								defaultState={{
									center: [53.901417, 27.548138],
									zoom: 10,
								}}
							>
								<Placemark geometry={coords} options={{ iconColor: 'red' }} />
							</Map>
						</div>
					</YMaps>
					<h1 style={{ color: 'red', fontSize: '18px', textAlign: 'center' }}>
						{nameError}
					</h1>
					<FormButton onClick={e => createPlace(e)}>Create</FormButton>
				</form>
			</div>
		</div>
	)
}

export default PlaceCreate
