import { YMaps, Map } from '@pbe/react-yandex-maps'

const MainMap = () => {
	return (
		<YMaps>
			<div className='map__container'>
				<Map
					className='map'
					defaultState={{ center: [53.903242, 27.554318], zoom: 12 }}
				/>
			</div>
		</YMaps>
	)
}

export default MainMap
