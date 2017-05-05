import { Component, HostListener, OnInit, Input, HostBinding, Renderer, ElementRef,
          trigger,state,style,transition,animate } from '@angular/core';
import { MenuItem, MenuService } from "fw/services/menu.service";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'fw-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations:[
    trigger('visibilityChanged',[
      transition(':enter',[ // :enter is alias to 'void =>'
        style({opacity:0}),
        animate(250, style({opacity:1}))
      ]),
      transition(':leave', [ // :leave is alias to ' => void'
        animate(100, style({opacity:0}))        
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {
  @Input() item = <MenuItem>null; // : MenuItem; // se angular-cli issue #2034
  @HostBinding('class.parent-is-popup')
  @Input() parentIsPopup = true;
  isActiveRoute = false;

  mouseInItem = false;
  mouseInPopup = false;
  popupLeft = 0;
  popupTop = 34;

  constructor(private router: Router,
    private menuService: MenuService,
    private el: ElementRef,
    private renderer: Renderer) { }

  ngOnInit() {
    this.checkActiveRoute(this.item.route);

    this.router.events
          .subscribe((event)=>{
            if(event instanceof NavigationEnd){
              this.checkActiveRoute(event.url);
              console.log(event.url+" "+ this.item.route+ " " + this.isActiveRoute)
            }
          });
   }

  checkActiveRoute(route:string){
    this.isActiveRoute = (route=='/'+this.item.route)
  }

  @HostListener('click', ['$event'])
  onClick(event): void {
    event.stopPropagation();
    if (this.item.submenu) {
      if (this.menuService.isVertical) {
        this.mouseInPopup = !this.mouseInPopup;
      }
    } else
      if (this.item.route) {
        // force horizontal menus to close by sending a mouseleave event
        let newEvent = new MouseEvent('mouseleave', { bubbles: true })
        this.renderer.invokeElementMethod( 
          this.el.nativeElement, 'dispatchEvent', [newEvent]);

        this.router.navigate(['/' + this.item.route]);

         console.log("force horizontal menus to close")
      }
  }
  onPopupMouseEnter(event): void {
    if (!this.menuService.isVertical) {
      this.mouseInPopup = true;
    }
    // console.log("onPopupMouseEnter")
  }
  onPopupMouseLeave(event): void {
    if (!this.menuService.isVertical) {
      this.mouseInPopup = false;
    }
    // console.log("onPopupMouseLeave")

  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event): void {
    if (!this.menuService.isVertical) {
      this.mouseInItem = false;
    }
    // console.log("onMouseLeave")

  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.menuService.isVertical) {
      if (this.item.submenu) {
        this.mouseInItem = true;
        if (this.parentIsPopup) {
          this.popupLeft = 160;
          this.popupTop = 0;
        }
      }
    }
    // console.log("onMouseEnter")

  }
}
