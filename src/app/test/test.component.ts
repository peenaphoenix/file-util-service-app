import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      $( ".draggable" ).draggable();
      $('#draggable2').connections({to: '.draggable', 'class': 'demo', borderClasses: {
          top: 'connection-border-top',
          right: 'connection-border-right',
          bottom: 'connection-border-bottom',
          left: 'connection-border-left'
      }});
      $(".draggable").connections({'class': 'fast'});
      $('.demo').html(function(i) { return '<span>Line&nbsp;' + (13 * i + 78) + '</span>' });
      $('*').disableSelection();
      $.repeat().add('connection').each($).connections('update').wait(0);
   });
  
  }

}
