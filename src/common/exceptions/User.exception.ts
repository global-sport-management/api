import { UnauthorizedException } from '@nestjs/common';

export class NotAdminException extends UnauthorizedException {
  constructor() {
    super(`You are not the amdin`);
  }
}
