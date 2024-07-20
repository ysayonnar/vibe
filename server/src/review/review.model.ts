import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Place } from 'src/place/place.model'
import { User } from 'src/user/user.model'

interface ReviewCreation {
	title: string
	description: string
	grade: number
	userId: number
	placeId: number
}

@Table({ tableName: 'reviews' })
export class Review extends Model<Review> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@Column({ type: DataType.STRING, allowNull: true })
	title: string

	@Column({ type: DataType.STRING(1000), allowNull: true })
	description: string

	@Column({ type: DataType.INTEGER, allowNull: false })
	grade: number

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number

	@ForeignKey(() => Place)
	@Column({ type: DataType.INTEGER })
	placeId: number

	@BelongsTo(() => User, 'userId')
	user: User

	@BelongsTo(() => Place, 'placeId')
	place: Place
}
