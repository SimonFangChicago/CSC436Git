import { Injectable } from '@angular/core';
import { Article } from '../article/article.model';


@Injectable()
export class AdminServiceService {

  constructor() { }

  articles:Article[];

  updateArticles(articles:Article[]):void{
  	this.articles = articles;
    
  }

  putToLeast(article:Article):void {

      console.log(this.articles);

  		var minimus_votes = this.articles[0].votes;

  		for (let item of this.articles) {
        console.log
  			if(minimus_votes>item.votes)
  			{
  				minimus_votes = item.votes;
  			}
	    }

      if(article.votes > minimus_votes)
	      article.votes = minimus_votes - 1;
  }

}
