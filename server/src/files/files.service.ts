import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
	async createFile(file): Promise<string> {
		try {
			const fileName = uuid.v4() + '.jpg'
			const filePath = path.resolve(__dirname, '../../src', 'static')
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true })
			}
			fs.writeFileSync(path.join(filePath, fileName), file.buffer)
			return fileName
		} catch (e) {
			console.log(e)
			throw new HttpException(
				'Something went wrong while uploading the file',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async rewriteFile(file, oldFileName) {
		try {
			const filePath = path.resolve(__dirname, '../../src', 'static')
			fs.writeFileSync(path.join(filePath, oldFileName), file.buffer)
		} catch (e) {
			throw new HttpException(
				'Something went wrong while uploading the file',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async deletePhoto(fileName) {
		try {
			const filePath = path.resolve(__dirname, '../../src', 'static')
			fs.unlink(path.join(filePath, fileName), e => {
				return e
			})
		} catch (e) {
			throw new HttpException(
				'Something went wrong while uploading the file',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
}
