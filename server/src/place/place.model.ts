import {
	BelongsTo,
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { PlaceCategory } from 'src/category/category-place.model'
import { Category } from 'src/category/category.model'
import { Review } from 'src/review/review.model'
import { User } from 'src/user/user.model'
import { PlaceUserFavourite } from './place-user-favourite'

export interface PlaceCreate {
	longtitude: number
	width: number
	name: string
	description: string
	userId: number
	image: string
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

	@Column({ type: DataType.STRING(1000) })
	image: string

	@Column({ type: DataType.FLOAT, defaultValue: 0 })
	calculatedRating: number

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number

	@BelongsTo(() => User, 'userId')
	user: User

	@HasMany(() => Review, 'placeId')
	reviews: Review[]

	@BelongsToMany(() => Category, () => PlaceCategory)
	categories: Category[]

	@BelongsToMany(() => User, () => PlaceUserFavourite)
	favourite_users: User[]
}
