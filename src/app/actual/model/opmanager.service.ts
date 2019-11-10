import { Injectable } from '@angular/core';
import { Merge } from './merge';
import { Compress } from './compress';
import { merge } from 'rxjs';
import { ApiService } from '../api.service';
import { Operation } from './operation';
import { Convert } from './convert';

@Injectable({
  providedIn: 'root'
})
export class OpmanagerService {
  mergeOp:Operation;
  compressOp:Operation;
  convertOp:Operation;
  

  constructor(private api:ApiService) {
    this.mergeOp = new Merge(api);
    this.compressOp = new Compress(api);
    this.convertOp = new Convert(api);
   }

  getOperationObject(operation){
    switch(operation){
      case 'merge' : return this.mergeOp;
      case 'compress' : return this.compressOp;
      case 'convert' : return this.convertOp;
    }

  }

  
}
