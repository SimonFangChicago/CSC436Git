import {RoleEnum} from './RoleEnum';

export class Article {
  title: string;
  link: string;
  votes: number;
  role: RoleEnum;

  constructor(title: string, link: string, votes?: number, role?: RoleEnum) {
    this.title = title;
    this.link = link;
    this.votes = votes || 0;
    this.role = role || RoleEnum.User;
  }

  voteUp(): void {
    this.votes += 1;
  }

  voteDown(): void {
    this.votes -= 1;
  }

  // domain() is a utility function that extracts
  // the domain from a URL, which we'll explain shortly
  domain(): string {
    try {
      // e.g. http://foo.com/path/to/bar
      const domainAndPath: string = this.link.split('//')[1];
      // e.g. foo.com/path/to/bar
      return domainAndPath.split('/')[0];
    } catch (err) {
      return null;
    }
  }

  isAdministrator(): boolean{
    return this.role == RoleEnum.Administrator;
  }
}
