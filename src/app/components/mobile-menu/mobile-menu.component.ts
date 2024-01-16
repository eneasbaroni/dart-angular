import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css'
})
export class MobileMenuComponent {

  hidden = true

  @Output() closeMenu = new EventEmitter();

  setCloseMobileMenu() {
    
    setTimeout(() => {      
      this.hidden = true     
    }, 50)

    setTimeout(() => {      
      this.closeMenu.emit(); //emite el evento para que lo escuche el padre      
    }, 800)
  }

  ngOnInit() {         
    setTimeout(() => {      
      this.hidden = false          
    }, 100);
  }

}
