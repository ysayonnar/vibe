import { useState } from 'react'
import cl from './Drag.module.css'
import axios from 'axios'

const Drag = () => {
	const [drag, setDrag] = useState(false)
	const [message, setMessage] = useState({ msg: '', color: '' })

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
			setMessage({ msg: 'Avatar successfully changed', color: 'green' })
		}
		const formData = new FormData()
		formData.append('image', file[0])
		await axios
			.put('http://localhost:5000/user/avatar', formData, {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(response => {
				if (response.ok) {
					setDrag()
				}
			})
			.catch(e => {
				console.log(e)
				setMessage({
					msg: 'Something went wrong. Try again later',
					color: 'red',
				})
			})
	}

	return (
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
	)
}

export default Drag
