import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

const RoleGuard = (roles: string[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      return roles.includes(user?.role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
