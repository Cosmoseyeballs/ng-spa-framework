import { Component } from '@angular/core';
import { FrameworkService, FrameworkConfigSettings } from "fw/services/framework-config.service";
import { MenuService } from "fw/services/menu.service";
import { initialMenuItems } from "app/app.menu";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(frameworkService: FrameworkService, menuService:MenuService) {
    let config: FrameworkConfigSettings = {
      socalIcons: [
        { imageFile: 'assets/social-fb-bw.png', alt: 'Facebook', link: 'http://www.facebook.com' },
        // { imageFile: 'assets/social-google-bw.png', alt: 'Google +', link: 'http://www.google.com' },
        { imageFile: 'social-twitter-bw.png', alt: 'Twitter', link: 'http://www.twitter.com' },

      ],
      showLanguageSelector: true,
      showUserControls: false,
      showStatusBar: true,
      showStatusBarBreakpoint: 800

    };

    frameworkService.configure(config)
    menuService.items = initialMenuItems;
  }
}
