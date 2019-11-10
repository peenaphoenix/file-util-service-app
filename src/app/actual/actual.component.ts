import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { OpmanagerService } from './model/opmanager.service';
 
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-actual',
  templateUrl: './actual.component.html',
  styleUrls: ['./actual.component.scss']
})
export class ActualComponent implements OnInit {
  myColor = '#F9F4F3'
  constructor(public dialog: MatDialog,private opsManager:OpmanagerService) { }
  _selectedElementsMap = new Map<string,any>();

  id = 1;
  isFirstNode = true;

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
      initial:this.isFirstNode,
      connectedTo:[],
      connectNext:[],
      executor: this.opsManager.getOperationObject(elementkey),
      operation: this.operations.indexOf(elementkey)>-1
    }
    if(this.isFirstNode) {
      this.isFirstNode = false;
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
    this._selectedElementsMap.get(destination).connectedTo.push(this._selectedElementsMap.get(source));
    this._selectedElementsMap.get(source).connectNext.push(this._selectedElementsMap.get(destination));
    console.log(this._selectedElementsMap);
  }

  removeConnectionPair(source,destination){
    if(this.connectionPairs.has(source) && this.connectionPairs.get(source).indexOf(destination)>-1){
      this.connectionPairs.get(source).splice(this.connectionPairs.get(source).indexOf(destination),1)
    }
    this._selectedElementsMap.get(destination).connectedTo.splice(
      this._selectedElementsMap.get(destination).connectedTo.indexOf(this._selectedElementsMap.get(source)),1
    );
    this._selectedElementsMap.get(source).connectNext.splice(
      this._selectedElementsMap.get(source).connectNext.indexOf(this._selectedElementsMap.get(destination)),1
    );
    console.log(this._selectedElementsMap);
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
    this._selectedElementsMap.forEach((value,key)=>{
      value.connectedTo = [];
      value.connectNext = [];
    });
  }

  addElement(element){
      this._selectedElementsMap.set(element.id,element);
      this.selectedElements = Array.from(this._selectedElementsMap.values());
  }


  async process(){
    // find the input node and traverse to first op node
    let firstNode = Array.from(this._selectedElementsMap.values()).filter(item=>item.initial)[0];
    let node = null;
    if(firstNode.key === 'input'){
      node = firstNode;
      while(node.connectNext.length!==0){
        node = node.connectNext[0];
        if(node.operation){
          await node.executor.process(node);
        }
      }
    }
    
    // Array.from(this._selectedElementsMap.keys())
    console.log(this._selectedElementsMap);
  }


  checkConnections(){
    
  }
  
}
