import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from 'src/user/user.model'

export interface PlaceCreate {
	longtitude: number
	width: number
	name: string
	description: string
	userId: number
}

@Table({ tableName: 'places' })
export class Place extends Model<Place, PlaceCreate> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@Column({ type: DataType.FLOAT, allowNull: false })
	longtitude: number

	@Column({ type: DataType.FLOAT, allowNull: false })
	width: number

	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	name: string

	@Column({ type: DataType.STRING(1000), unique: false, allowNull: true })
	description: string

	// @Column({ type: DataType.NUMBER })
	// photos: boolean

	@Column({ type: DataType.FLOAT, defaultValue: 0 })
	calculatedRating: number

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number

	@BelongsTo(() => User, 'userId')
	user: User
}
