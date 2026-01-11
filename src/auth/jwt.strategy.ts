import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Folosim secretul din .env sau un fallback
      secretOrKey: config.get('JWT_SECRET') || 'secret', 
    });
  }

  async validate(payload: any) {
    // Asta returnează req.user în controllere
    return { sub: payload.sub, email: payload.email, role: payload.role };
  }
}