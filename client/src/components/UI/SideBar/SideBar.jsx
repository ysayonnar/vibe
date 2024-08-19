import SideBarButton from '../SideBarButton/SideBarButton'
import cl from './SideBar.module.css'
import defUser from '../../../static/defUser.jpg'
import map from '../../../static/address.png'
import place from '../../../static/pin.png'
import userImg from '../../../static/user.png'
import friend from '../../../static/friends.png'
import news from '../../../static/megaphone.png'
import fav from '../../../static/star.png'
import logoutImg from '../../../static/logout.png'
import { useHref, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const SideBar = () => {
	const router = useNavigate()
	const currentHref = useHref()
	const [user, setUser] = useState({})
	const sideBarOptions = [
		{
			src: map,
			text: 'Map',
			href: '/map',
		},
		{
			src: place,
			text: 'Your places',
			href: '/places',
		},
		{
			src: fav,
			text: 'Favourite',
			href: '/favourite',
		},
		{
			src: userImg,
			text: 'Account',
			href: '/user',
		},
		{
			src: friend,
			text: 'Friends',
			href: '/friends',
		},
		{
			src: news,
			text: 'News',
			href: '/news',
		},
	]

	useEffect(() => {
		fetchUserData()
	}, [])

	async function fetchUserData() {
		await axios
			.get('http://localhost:5000/auth/info', {
				headers: { authorization: `Bearer ${localStorage.getItem('auth')}` },
			})
			.then(response => setUser(response.data))
	}

	function logout() {
		localStorage.removeItem('auth')
		router('/')
	}

	return (
		<div className={cl['sidebar__container']}>
			<div onClick={() => router('/')} className={cl.logo}>
				<h1>VIBE</h1>
			</div>
			<div className={cl['sidebar__user']}>
				<img
					src={user.avatar ? `http://localhost:5000/${user.avatar}` : defUser}
					className={cl['sidebar__user_avatar']}
					alt='no'
				/>
				<p className={cl['sidebar__user__name']}>{user.username}</p>
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
			<div className={cl.logout} onClick={() => logout()}>
				<h1>Log out</h1>
				<img src={logoutImg} alt='no' />
			</div>
		</div>
	)
}

export default SideBar
