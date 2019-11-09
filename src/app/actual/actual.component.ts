import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-actual',
  templateUrl: './actual.component.html',
  styleUrls: ['./actual.component.scss']
})
export class ActualComponent implements OnInit {
  myColor = '#F9F4F3'
  constructor() { }
  _selectedElementsMap = new Map<string,any>();

  id = 1;

  selectedElements = [];

  ngOnInit() {
  }

  elementclick(elementkey){
    let id = elementkey+this.id;
    console.log(id);
    this.addElement({key:elementkey,id:id});
    this.id++;
    // $('.element').draggable();
    this.checkConnections();
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
  }

  connectSelector = [];

  selectItem(item){
    this.isSingleClick = false;
    if(this.connectSelector.length<2){
      this.connectSelector.push(item)
    } else {
      if(this.connectSelector.indexOf(item)>-1){
        this.connectSelector.splice(this.connectSelector.indexOf(item),1);
      } else {
        alert("Already 2 elements selected")
      }
    }
  }

  addElement(element){
      this._selectedElementsMap.set(element.id,element);
      this.selectedElements = Array.from(this._selectedElementsMap.keys());
  }

  checkConnections(){
    
  }
  
}
