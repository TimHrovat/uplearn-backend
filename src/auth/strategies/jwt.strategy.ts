import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from 'src/utils/constants';
import { Request } from 'express';
import { Role } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      secretOrKey: jwtSecret,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.headers.authorization !== '') {
      return req.headers.authorization;
    }
    return null;
  }

  async validate(payload: { id: string; role: Role }) {
    return payload;
  }
}
