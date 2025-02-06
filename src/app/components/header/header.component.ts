import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpen = false;
  isDarkMode = false;
  searchKey: any
  routeSub: any
  topics: any = []
  categories: any = []

  groupedTopics: any = [];
  groupedCategories: any = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.searchKey = params.get('topic');
    });
    this.getCategoriesAndTopics()
  }

  getCategoriesAndTopics(){
    this.apiService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data.categories
        this.groupCategories()
      },
      error: (err: any) => console.error('Error fetching categories:', err)
    });
    this.apiService.getAllTopics().subscribe({
      next: (data: any) => {
        this.topics = data.topics
        this.groupTopics()
      },
      error: (err: any) => console.error('Error fetching topics:', err)
    });
  }

  groupTopics() {
    const groupSize = 5; // Number of topics per column
    for (let i = 0; i < this.topics.length; i += groupSize) {
      this.groupedTopics.push(this.topics.slice(i, i + groupSize));
    }
  }

  groupCategories() {
    const groupSize = 5; // Number of topics per column
    for (let i = 0; i < this.categories.length; i += groupSize) {
      this.groupedCategories.push(this.categories.slice(i, i + groupSize));
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('bg-dark', this.isDarkMode);
    document.body.classList.toggle('text-white', this.isDarkMode);
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'World': 'fas fa-globe',
      'Politics': 'fas fa-landmark',
      'Business': 'fas fa-briefcase',
      'Technology': 'fas fa-microchip',
      'Science': 'fas fa-flask',
      'Health': 'fas fa-heartbeat',
      'Sports': 'fas fa-futbol',
      'Entertainment': 'fas fa-film',
      'Travel': 'fas fa-plane',
      'Environment': 'fas fa-leaf'
    };
    return icons[category] || 'fas fa-circle-notch';
  }

  redirectToCategory(category: any) {
    this.router.navigate(['category/' + category])
  }

  redirectToTopic(topic: any) {
    this.router.navigate(['topic/' + topic])
  }

}
