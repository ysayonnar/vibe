import { useEffect, useState } from 'react'
import cl from './MapSearch.module.css'
import axios from 'axios'
import FormInput from '../FormInput/FormInput'

const MapSearch = ({ setPlaces }) => {
	const [searchField, setSearchField] = useState('')
	const [searchCounter, setSearchCounter] = useState(0)

	async function getPlaces() {
		await axios
			.get('http://localhost:5000/place')
			.then(res => {
				setPlaces(res.data)
				setSearchCounter(res.data.length)
			})
			.catch(e => console.log(e))
	}

	async function search(e) {
		setSearchField(e.target.value)
		if (e.target.value === '') {
			getPlaces()
			return
		} else {
			await axios
				.get(`http://localhost:5000/place/find/${e.target.value}`)
				.then(res => {
					if (res.data.msg) {
						setPlaces([])
						setSearchCounter(0)
					} else {
						setPlaces(res.data)
						setSearchCounter(res.data.length)
					}
				})
				.catch(e => {
					setPlaces([])
				})
		}
	}

	useEffect(() => {
		getPlaces()
	}, [])
	return (
		<div className={cl.main}>
			<h1 className={cl.title}>Search</h1>
			<FormInput
				text={`Founded ${searchCounter} places`}
				style={{ width: '270px', margin: '10px 0px' }}
				placeholder='Name of the place...'
				value={searchField}
				onChange={e => search(e)}
			/>
		</div>
	)
}

export default MapSearch
