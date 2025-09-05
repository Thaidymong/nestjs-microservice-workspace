import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces';

export const CurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest() as any; 

    if (!request.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const user = request.user as JwtPayload;

    if (!user.sub) {
      throw new UnauthorizedException('User ID not found in token');
    }

    return user.sub;
  },
);