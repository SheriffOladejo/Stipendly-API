
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestWithUser } from 'src/types/request-with-user';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    var token = request.headers['authorization'] as string;
    token = token?.replace('Bearer ', '');

    if (!token) throw new UnauthorizedException('Missing auth token');

    const user = await this.prisma.user.findUnique({
      where: { auth_token: token },
    });

    if (!user) throw new UnauthorizedException('Invalid auth token');

    request.user = user;

    return true;
  }
}
