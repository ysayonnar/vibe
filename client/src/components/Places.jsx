import { useNavigate } from 'react-router-dom'

const Places = () => {
	const navigate = useNavigate()
	return (
		<div>
			<button
				style={{ width: '200px', height: '100px' }}
				onClick={() => navigate('/placeCreate')}
			>
				Create Place
			</button>
		</div>
	)
}

export default Places
