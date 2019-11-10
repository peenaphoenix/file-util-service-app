import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  inputFileRelated={
    file:null
  };

 

  constructor(public dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {

    switch(this.data.key){
      case 'input':
        this.data['data'] = this.inputFileRelated;
        break;
    }
    
   }

  ngOnInit() {
  }


  handleFileInput(files: FileList) {
    this.inputFileRelated.file = files.item(0);
  }
}
