import { Component, Inject } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


export interface DialogData {
  file: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  public files: NgxFileDropEntry[] = [];
  displayedColumns: string[] = ['name'];
  dataSource: NgxFileDropEntry[] = [];

  isConvert = false;
  isCompress = false;
  isResize = false;

  browsedFiles = [];
  selectedFiles = [];

  operationList = ['PNG to JGP', 'JPG to PNG', 'COMPRESS', 'RESIZE'];
  selectedOperation = [];

  dropFile(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dropOperation(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  constructor(public dialog: MatDialog) { }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.dataSource = files;

    for (const file of this.files) {
      this.browsedFiles.push(file.relativePath);
    }

    console.log(this.files);
    for (const droppedFile of files) {

      console.log('droppedFile : ');
      console.log(droppedFile);

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log('droppedFile.relativePath');
          console.log(droppedFile.relativePath);
          console.log('file');
          console.log(file);

          const fileTypeRegEx = new RegExp('^.*\.(jpg|JPG|png|PNG)$');

          if (!(fileTypeRegEx.test(droppedFile.relativePath))) {
            this.dataSource = [];
            this.files = [];
            this.openDialogBox();
          }

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  onConvert() {
    this.isConvert = true;
    this.isCompress = false;
    this.isResize = false;
  }

  onCompress() {
    this.isConvert = false;
    this.isCompress = true;
    this.isResize = false;
  }

  onResize() {
    this.isConvert = false;
    this.isCompress = false;
    this.isResize = true;
  }

  clearUploads() {
    this.dataSource = [];
    this.files = [];
    this.browsedFiles = [];
    this.selectedFiles = [];
  }

  openDialogBox() {
    const dialogRef = this.dialog.open(DialogBox, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dialog-box',
  templateUrl: 'dialog-box.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogBox {

  constructor(
    public dialogRef: MatDialogRef<DialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

