import { IsString } from 'class-validator'

export class GiveRoleDto {
	@IsString({ message: 'Must be a string' })
	roleName: string
}
