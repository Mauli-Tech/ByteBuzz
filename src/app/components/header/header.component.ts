import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  topics: string[] = [
    'World News', 'Politics', 'Business', 'Technology', 'Science',
    'Health', 'Sports', 'Entertainment', 'Travel', 'Environment',
    'Education', 'Food', 'Fashion', 'Culture', 'Automobile',
    'Cryptocurrency', 'AI & Robotics', 'Space', 'Weather', 'Gaming'
  ];

  categories: string[] = [
    'World', 'Politics', 'Business', 'Technology', 'Science', 'Health', 'Sports', 'Entertainment'
  ];

  groupedTopics: string[][] = [];

  constructor(private router: Router,
    private route: ActivatedRoute
  ) {
    this.groupTopics();
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.searchKey = params.get('topic');
    });
  }

  groupTopics() {
    const groupSize = 5; // Number of topics per column
    for (let i = 0; i < this.topics.length; i += groupSize) {
      this.groupedTopics.push(this.topics.slice(i, i + groupSize));
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
