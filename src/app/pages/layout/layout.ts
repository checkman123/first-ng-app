import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  //Inject services
  router = inject(Router);

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar-wrapper');
    if (sidebar) {
      sidebar.classList.toggle('collapsed');
    }
  }

  logout() {
    // Clear user data from local storage
    localStorage.removeItem('leaveUser');
    this.router.navigate(['/login']);
  }
}
