import cl from './PlaceCard.module.css'

const PlaceCard = ({ place }) => {
	return <div className={cl.card}>{place.name}</div>
}

export default PlaceCard
