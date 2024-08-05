import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { ServerErrorException } from 'src/exceptions/server-error.exception'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
	async createFile(file): Promise<string> {
		try {
			const fileName = uuid.v4() + '.jpg'
			const filePath = path.resolve(__dirname, '../../dist', 'static')
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true })
			}
			fs.writeFileSync(path.join(filePath, fileName), file.buffer)
			return fileName
		} catch (e) {
			throw new ServerErrorException()
		}
	}

	async rewriteFile(file, oldFileName) {
		try {
			const filePath = path.resolve(__dirname, '../../dist', 'static')
			fs.writeFileSync(path.join(filePath, oldFileName), file.buffer)
		} catch (e) {
			console.log(e)
			throw new ServerErrorException()
		}
	}

	async deletePhoto(fileName) {
		try {
			const filePath = path.resolve(__dirname, '../../src', 'static')
			fs.unlink(path.join(filePath, fileName), e => {
				return e
			})
		} catch (e) {
			throw new ServerErrorException()
		}
	}
}
