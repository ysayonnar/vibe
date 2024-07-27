import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Place } from './place.model'
import { User } from 'src/user/user.model'

@Table({ tableName: 'place_user_favourite' })
export class PlaceUserFavourite extends Model<PlaceUserFavourite> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ForeignKey(() => Place)
	@Column({ type: DataType.INTEGER })
	placeId: number

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number
}
