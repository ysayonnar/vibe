import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { ROLES_KEY } from './roles-auth.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector
	) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
				context.getHandler(),
				context.getClass(),
			])
			if (!requiredRoles) {
				return true
			}
			const req = context.switchToHttp().getRequest()
			const authHeader: string = req.headers.authorization
			const bearer = authHeader.split(' ')[0]
			const token = authHeader.split(' ')[1]

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({ msg: 'User is not authorized' })
			}
			const user = this.jwtService.verify(token)
			req.user = user
			return user.roles.some(role => requiredRoles.includes(role.name))
		} catch (e) {
			throw new HttpException('invalid role stack', HttpStatus.FORBIDDEN)
		}
	}
}
