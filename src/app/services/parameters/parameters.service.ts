import { Injectable } from '@angular/core';

@Injectable()
export class ParametersService {

  private parameters: any = [];

  public set(key: any, value: any) {
    this.parameters[key] = value;
  }

  public get(key: any) {
    return this.parameters[key] || null;
  }

  public reset() {
    this.parameters = [];
  }
}
