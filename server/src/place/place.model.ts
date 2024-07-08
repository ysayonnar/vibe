import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'

export interface PlaceCreation {
	longtitude: number
	width: number
	name: string
	description: string
	//userId: number -- foreign key
}

@Table({ tableName: 'places' })
export class Place extends Model<Place, PlaceCreation> {
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

	// @Column({type: ForeignKey})
	// userId: number`
}
