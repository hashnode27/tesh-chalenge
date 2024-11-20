import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serviceCheck(): any {
    return {
      services: 'Test Chalenge API',
      v: 1,
    };
  }
}
