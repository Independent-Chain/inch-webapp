import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { validate } from '@telegram-apps/init-data-node';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	login(initData: string) {
    const botToken = process.env.BOT_TOKEN;
		try {
			validate(initData, botToken);
			return true
		} catch(error) {
			return false
		}
	}

	generateToken(userId: number) {
		const payload = { sub: userId }
		return this.jwtService.sign(payload)
	}
}
