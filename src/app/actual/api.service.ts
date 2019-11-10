import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { 

  }

  merge(files:File[]): Observable<any>{
    const formData: FormData = new FormData();
      files.forEach(file=>formData.append('file', file, file.name));
      const req = new HttpRequest('POST', 'http://developer.creospiders.com:3000/pdf/merge2', formData,{
        responseType:'blob'
      });
      return this.http.request(req)
  }

  compress(file:File): Observable<any>{
    const formData: FormData = new FormData();
     formData.append('file', file, file.name);
     formData.append('type', 'default');
      const req = new HttpRequest('POST', 'http://developer.creospiders.com:3000/pdf/compress', formData,{
        responseType:'blob'
      });
      return this.http.request(req)
  }

  convert(file:File): Observable<any>{
    const formData: FormData = new FormData();
     formData.append('file', file, file.name);
     formData.append('type', 'html');
      const req = new HttpRequest('POST', 'http://developer.creospiders.com:3000/pdf/convert', formData,{
        responseType:'blob'
      });
      return this.http.request(req)
  }

  blobToFile(theBlob, fileName):File{
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }
}
