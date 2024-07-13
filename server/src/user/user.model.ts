import {
	BelongsToMany,
	Column,
	DataType,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { Friend } from 'src/friend/friend.model'
import { FriendRequest } from 'src/friend/friend_request.model'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'

interface UserCreationInterface {
	username: string
	email: string
	password_hash: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationInterface> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	username: string

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string

	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	password_hash: string

	@Column({
		type: DataType.STRING(1000),
		allowNull: true,
		defaultValue: 'no bio',
	})
	bio: string

	// @Column({ type: DataType.STRING, unique: false, allowNull: false })
	// avatar: string

	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	isBanned: boolean

	@Column({ type: DataType.STRING, allowNull: true })
	banReason: string

	@Column({ type: DataType.STRING, unique: true, allowNull: true })
	telegram_username: string

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]

	@HasMany(() => Friend, 'friendId')
	friends: Friend[]

	@HasMany(() => FriendRequest, 'senderId')
	sended_friend_requests: FriendRequest[]

	@HasMany(() => FriendRequest, 'recipientId')
	friend_requests: FriendRequest[]
}
