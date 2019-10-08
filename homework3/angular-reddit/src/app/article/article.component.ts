import {
  Component,
  OnInit,
  Input,        // <-- added,
  HostBinding
} from '@angular/core';
import { Article } from './article.model'; // <-- added
import {RoleEnum} from './RoleEnum';
import {AdminServiceService} from '../services/admin-service.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() article: Article;

  constructor(private adminServiceService:AdminServiceService) {
    // article is populated by the Input now,
    // so we don't need anything here
  }

  voteUp(): boolean {
    this.article.voteUp();
    return false;
  }

  voteDown(): boolean {
    this.article.voteDown();
    return false;
  }

  moveToLeast(): boolean{
      this.adminServiceService.putToLeast(this.article);
      return false;
  }

  ngOnInit() {
  }

  isAdministrator(): boolean{
    return this.article.isAdministrator();
  }

}
