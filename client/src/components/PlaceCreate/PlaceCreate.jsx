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
	}

	async function createPlace(e) {
		e.preventDefault()
		const formData = new FormData()
		formData.append('image', file)
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
				setNameError(e.response.data[0])
				//тут сделать ошибки и их валидацию
			})
	}

	return (
		<div className={cl.main}>
			<div className={cl['form_container']}>
				<form className={cl.form}>
					<h1 style={{ textAlign: 'center', color: 'white' }}>Create Place</h1>
					<FormInput
						error={nameError}
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
					<FormButton onClick={e => createPlace(e)}>Create</FormButton>
				</form>
			</div>
		</div>
	)
}

export default PlaceCreate
