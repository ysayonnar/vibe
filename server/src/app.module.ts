import { Module } from '@nestjs/common'
import { PlaceModule } from './place/place.module'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { Place } from './place/place.model'
import { RolesModule } from './roles/roles.module'
import { Role } from './roles/roles.model'

@Module({
	imports: [
		PlaceModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			models: [Place, Role],
			autoLoadModels: true,
		}),
		RolesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
