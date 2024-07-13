import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from 'src/user/user.model'

@Table({ tableName: 'friends' })
export class Friend extends Model<Friend> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	friendId: number

	@BelongsTo(() => User, 'userId')
	user: User

	@BelongsTo(() => User, 'friendId')
	friend: User
}
