import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  baseURL: string = 'http://localhost:3000/api/';
  constructor() {}
}
