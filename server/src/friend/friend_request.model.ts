import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from 'src/user/user.model'

@Table({ tableName: 'friend_requests' })
export class FriendRequest extends Model<FriendRequest> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	isAccepted: boolean

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	senderId: number

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	recipientId: number

	@BelongsTo(() => User, 'senderId')
	sender: User

	@BelongsTo(() => User, 'recipientId')
	recipient: User
}
