import { useState } from 'react'
import FriendsContent from '../friendsContent/FriendsContent/FriendsContent'
import Requests from '../friendsContent/Requests/Requests'
import Find from '../friendsContent/Find/Find'

const Friends = () => {
	const [selected, setSelected] = useState('friends')
	return (
		<div className='friends__container'>
			<div className='friends__nav'>
				<button
					className={
						selected === 'friends'
							? 'friends__nav__btn__selected'
							: 'friends__nav__btn'
					}
					onClick={() => setSelected('friends')}
				>
					Friends
				</button>
				<button
					className={
						selected === 'requests'
							? 'friends__nav__btn__selected'
							: 'friends__nav__btn'
					}
					onClick={() => setSelected('requests')}
				>
					Requests
				</button>
				<button
					className={
						selected === 'find'
							? 'friends__nav__btn__selected'
							: 'friends__nav__btn'
					}
					onClick={() => setSelected('find')}
				>
					Find friends
				</button>
			</div>
			{selected === 'friends' && <FriendsContent />}
			{selected === 'requests' && <Requests />}
			{selected === 'find' && <Find />}
		</div>
	)
}
export default Friends
