import { useParams } from 'react-router-dom'
import SideBar from '../UI/SideBar/SideBar'
import Place from '../Place/Place'

const PlacePage = () => {
	const { id } = useParams()
	return (
		<div className='container'>
			<SideBar />
			<Place id={id} />
		</div>
	)
}

export default PlacePage
