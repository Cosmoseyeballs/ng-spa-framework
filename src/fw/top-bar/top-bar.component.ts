import { Component, OnInit } from '@angular/core';
import { FrameworkService } from "fw/services/framework-config.service";

@Component({
  selector: 'fw-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private frameworkService:FrameworkService) { }

  ngOnInit() {
  }

}
