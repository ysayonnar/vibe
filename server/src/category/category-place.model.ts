import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { Category } from './category.model'
import { Place } from 'src/place/place.model'

@Table({ tableName: 'place_category' })
export class PlaceCategory extends Model<PlaceCategory> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ForeignKey(() => Category)
	@Column({ type: DataType.INTEGER })
	categoryId: number

	@ForeignKey(() => Place)
	@Column({ type: DataType.INTEGER })
	placeId: number
}
