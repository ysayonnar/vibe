import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'

export interface PlaceCreation {
	longtitude: string
	width: string
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

	@Column({ type: DataType.STRING, allowNull: false })
	longtitude: string

	@Column({ type: DataType.STRING, allowNull: false })
	width: string

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	name: string

	@Column({ type: DataType.STRING(1000), unique: false, allowNull: true })
	description: string

	// @Column({ type: DataType.NUMBER })
	// photos: boolean

	@Column({ type: DataType.INTEGER, defaultValue: 0 })
	calculatedRating: string

	// @Column({type: ForeignKey})
	// userId: number`
}
