import { Injectable } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

@Injectable()
export class AppService {
  async getHello() {
    return "Hello";
  };
}
