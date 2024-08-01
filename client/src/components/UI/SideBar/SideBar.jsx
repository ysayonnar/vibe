import SideBarButton from '../SideBarButton/SideBarButton'
import cl from './SideBar.module.css'
import human from '../../../static/human.jpg'
import map from '../../../static/address.png'
import place from '../../../static/pin.png'
import user from '../../../static/user.png'
import friend from '../../../static/friends.png'
import news from '../../../static/megaphone.png'
import fav from '../../../static/star.png'
import { useHref, useNavigate } from 'react-router-dom'

const SideBar = () => {
	const router = useNavigate()
	const currentHref = useHref()

	const sideBarOptions = [
		{
			src: map,
			text: 'Map',
			href: '/map',
		},
		{
			src: place,
			text: 'Places',
			href: '/places',
		},
		{
			src: fav,
			text: 'Favourite',
			href: '/favourite',
		},
		{
			src: user,
			text: 'Account',
			href: '/user',
		},
		{
			src: friend,
			text: 'friends',
			href: '/friends',
		},
		{
			src: news,
			text: 'News',
			href: '/news',
		},
	]

	return (
		<div className={cl['sidebar__container']}>
			<div className={cl.logo}>
				<h1>VIBE</h1>
			</div>
			<div className={cl['sidebar__user']}>
				<img src={human} className={cl['sidebar__user_avatar']} alt='no' />
				<p className={cl['sidebar__user__name']}>Hleb Nahorny</p>
			</div>
			<div className={cl['sidebar__buttons']}>
				{sideBarOptions.map(option => (
					<SideBarButton
						isActive={option.href === currentHref}
						key={option.text}
						onClick={e => {
							e.preventDefault()
							router(option.href)
						}}
					>
						<img
							src={option.src}
							className={cl['sidebar__buttons__images']}
							alt='no'
						/>
						{option.text}
					</SideBarButton>
				))}
			</div>
		</div>
	)
}

export default SideBar
