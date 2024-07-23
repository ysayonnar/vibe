import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript'
import { Place } from 'src/place/place.model'
import { PlaceCategory } from './category-place.model'

interface CategoryCreate {
	name: string
	description: string
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreate> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@Column({ type: DataType.STRING, unique: true })
	name: string

	@Column({ type: DataType.STRING(500) })
	description: string

	@BelongsToMany(() => Place, () => PlaceCategory)
	places: Place[]
}
