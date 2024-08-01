import SideBarButton from '../SideBarButton/SideBarButton'
import cl from './SideBar.module.css'
import human from '../../../static/human.jpg'
import map from '../../../static/address.png'
import place from '../../../static/pin.png'
import user from '../../../static/user.png'
import friend from '../../../static/friends.png'
import news from '../../../static/megaphone.png'
import fav from '../../../static/star.png'

const SideBar = () => {
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
				<SideBarButton>
					<img src={map} className={cl['sidebar__buttons__images']} alt='no' />{' '}
					Map
				</SideBarButton>
				<SideBarButton>
					<img
						src={place}
						className={cl['sidebar__buttons__images']}
						alt='no'
					/>{' '}
					Places
				</SideBarButton>
				<SideBarButton>
					<img src={fav} className={cl['sidebar__buttons__images']} alt='no' />
					Favourite
				</SideBarButton>
				<SideBarButton>
					<img src={user} className={cl['sidebar__buttons__images']} alt='no' />
					Account
				</SideBarButton>
				<SideBarButton>
					<img
						src={friend}
						className={cl['sidebar__buttons__images']}
						alt='no'
					/>
					Friends
				</SideBarButton>
				<SideBarButton>
					<img src={news} className={cl['sidebar__buttons__images']} alt='no' />
					News
				</SideBarButton>
			</div>
		</div>
	)
}

export default SideBar
