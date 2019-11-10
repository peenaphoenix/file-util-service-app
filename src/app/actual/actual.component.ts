import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-actual',
  templateUrl: './actual.component.html',
  styleUrls: ['./actual.component.scss']
})
export class ActualComponent implements OnInit {
  myColor = '#F9F4F3'
  constructor(public dialog: MatDialog) { }
  _selectedElementsMap = new Map<string,any>();

  id = 1;

  selectedElements = [];

  operations = ['merge','split','convert','compress']
  
  connectionPairs = new Map<string,any[]>();

  ngOnInit() {
  }

  elementclick(elementkey){
    let id = elementkey+this.id;
    console.log(id);
    let element = {
      key:elementkey,
      id:id,
      operation: this.operations.indexOf(elementkey)>-1
    }
   
    this.id++;
    // $('.element').draggable();
    this.checkConnections();
    if(element.key==='input'){
      this.dialog.open(DialogComponent, {
        height: '400px',
        width: '600px',
        disableClose:true,
        data:element
      }).afterClosed().subscribe(data=>{
        this.addElement(data);
        console.log(data)
      });
    } else {
      this.addElement(element);
    }
   
  }

  isSingleClick: Boolean = true; 

  clickItem(item,event){
    this.isSingleClick = true;
    setTimeout(()=>{
        if(this.isSingleClick){
          console.log("dragged")
        }
     },250)
    
  }

  connectNodes(){
    $('#'+this.connectSelector[0]).connections({'to': '#'+this.connectSelector[1],css:{
      'z-index':'200',
      'border-color':'red'
    }});
    this.addToConnectionPair(this.connectSelector[0],this.connectSelector[1]);
    this.connectSelector = [];
  }

  addToConnectionPair(source,destination){
    if(this.connectionPairs.has(source)){
      this.connectionPairs.get(source).push(destination)
    } else {
      this.connectionPairs.set(source,[destination]);
    }
  }

  removeConnectionPair(source,destination){
    if(this.connectionPairs.has(source) && this.connectionPairs.get(source).indexOf(destination)>-1){
      this.connectionPairs.get(source).splice(this.connectionPairs.get(source).indexOf(destination),1)
    }
  }

  UpdateConnections(){
    $('*').connections('remove');
    this.connectionPairs.forEach((target,source)=>{
      $('#'+source).connections({'to': '#'+target,css:{
        'z-index':'200',
        'border-color':'red'
      }});
    })
  }

  connectSelector = [];

  // selectItem(item){
  //   this.isSingleClick = false;
  //   if(this.connectSelector.length<2){
  //     this.connectSelector.push(item)
  //   } else {
  //     if(this.connectSelector.indexOf(item)>-1){
  //       this.connectSelector.splice(this.connectSelector.indexOf(item),1);
  //     } else {
  //       alert("Already 2 elements selected")
  //     }
  //   }
  // }

  selectItem(item){
    this.isSingleClick = false;
    if(this.connectSelector.length<2){
      this.connectSelector.push(item);
      if(this.connectSelector.length === 2){
        if(this.connectionPairs.get(this.connectSelector[0]) && this.connectionPairs.get(this.connectSelector[0]).indexOf(this.connectSelector[1])>-1){
          this.removeNodes();
        } else {
          this.connectNodes();
        }
        
      }
    } 
  }

  removeNodes(){
    this.connectSelector.forEach(item=>$('#'+item).addClass('readyRemove'));
    $('.readyRemove').connections('remove');
    this.removeConnectionPair(this.connectSelector[0],this.connectSelector[1]);
    this.connectSelector = [];
  }

  clearNodes(){
    $('*').connections('remove');
    this.connectionPairs.clear();
  }

  addElement(element){
      this._selectedElementsMap.set(element.id,element);
      this.selectedElements = Array.from(this._selectedElementsMap.values());
  }



  checkConnections(){
    
  }
  
}
