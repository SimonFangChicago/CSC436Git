import { Component } from '@angular/core';
import { Article } from './article/article.model';
import {RoleEnum} from './article/RoleEnum';
import {AdminServiceService} from './services/admin-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  articles: Article[];

  constructor(private adminServiceService:AdminServiceService) {
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 3,RoleEnum.Administrator),
      new Article('Fullstack', 'http://fullstack.io', 2,RoleEnum.Administrator),
      new Article('Angular Homepage', 'http://angular.io', 1)
    ];

    this.adminServiceService.updateArticles(this.articles);
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement, role:HTMLSelectElement): boolean {
    console.log(`Adding article title: ${title.value} and link: ${link.value} and role: ${role.value}`);

    var selectedValue = role.options[role.selectedIndex].value;

    console.log(selectedValue);

    var roleType = selectedValue=="User"?RoleEnum.User:RoleEnum.Administrator;

    this.articles.push(new Article(title.value, link.value, 0,roleType));
    title.value = '';
    link.value = '';

    this.adminServiceService.updateArticles(this.articles);
    return false;
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }
}
