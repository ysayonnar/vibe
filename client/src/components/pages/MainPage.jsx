import { useNavigate } from 'react-router-dom'
import placeamark from '../../static/pin.png'
import github from '../../static/github.png'
import tg from '../../static/telegram.png'

const MainPage = () => {
	const navigate = useNavigate()
	return (
		<div className='main__container'>
			<div className='nav'>
				<a href='' onClick={() => navigate('/')}>
					Home
				</a>
				<a href='' onClick={() => navigate('/')}>
					Vibe
				</a>
				<img className='nav__placemark' src={placeamark} alt='no' />
				<a href='' onClick={() => navigate('/')}>
					About us
				</a>
				<a href='' onClick={() => navigate('/')}>
					Contact
				</a>
			</div>

			<div className='center__quote'>
				<h1 className='center__quote__text'>Your life, your vibe</h1>
				<p className='center__quote__minitext'>
					Share vibe places with your friends
				</p>
				<button
					className='center__quote__button'
					onClick={() => navigate('/map')}
				>
					Get started
				</button>
			</div>

			<div className='social'>
				<a href='https://github.com/ysayonnar'>
					<img className='social__img' src={github} alt='' />
				</a>
				<a href=''>
					<img className='social__img' src={tg} alt='' />
				</a>
			</div>
		</div>
	)
}

export default MainPage
