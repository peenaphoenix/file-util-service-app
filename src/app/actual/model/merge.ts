import { Operation } from './operation';
import { ApiService } from '../api.service';
import { HttpResponse } from '@angular/common/http';

export class Merge implements Operation {

    constructor(private api: ApiService) {

    }

    process(element: any) {
        return new Promise((resolve, reject) => {
            // let file:File = element.connectedTo[0].data['file'];
            let files: File[] = [];
            element.connectedTo.forEach(item => {

                files.push(item.data['file']);
            });

            console.log(element)
            console.log("compress the files")
            this.api.merge(files).subscribe(res => {
                console.log(res)
                if (res instanceof HttpResponse) {
                    if(element.connectNext[0].operation){
                        element['data']={
                            file:this.api.blobToFile(res.body,"pass_intrim.pdf")
                        }
                        resolve("Done");
                    } else {
                        var blob = new Blob([res.body], { type: 'application/pdf' });
                        var filename = 'merged_pdf.pdf';
                        saveAs(blob, filename);
                        resolve("Done");
                    }
                   
                }

            })
        })

    }

    

}
