import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../roles.decorator';
import { Role } from '../roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(
      'requiredRoles.....=> from roles guard class....',
      requiredRoles,
    );
    if (!requiredRoles) {
      console.log('-----------------------------');

      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    console.log('user===========>', user);
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
