import { ApiService } from '../api.service';
import { HttpResponse } from '@angular/common/http';

export class Convert {
    constructor(private api:ApiService){

    }

    
    process(element: any) {
        return new Promise((resolve,reject)=>{
            let file:File = element.connectedTo[0].data['file'];
            console.log(element)
            console.log("convert the files")
            this.api.convert(file).subscribe(res=>{
                console.log(res)
                if(res instanceof HttpResponse){
                    var blob = new Blob([res.body], {type: 'application/zip'});
                    var filename = 'converted_zip.zip';
                    saveAs(blob, filename);
                    resolve("Done");
                }
               
            })
        })
        
    }
}
