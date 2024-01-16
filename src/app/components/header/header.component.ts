import { Component, HostListener  } from '@angular/core'; //HostListener para escuchar eventos
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CartComponent, MobileMenuComponent], 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isMobile: boolean = false;
  cartOpen: boolean = false;
  isMenuOpen: boolean = false;

  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      this.isMobile = true;
    }    
  }

  @HostListener('window:resize', ['$event']) //escucha el evneto de redimension
  onResize(event: any) {
    if (event.target.innerWidth <= 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  handleCart () {  
    this.cartOpen = !this.cartOpen;
  }

  handleMenuMobile () {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
