import { Component } from '@angular/core';
import { Repository } from '../../data/data.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent {
  repos$: Array<Repository>;
  filteredRepos: any;

  search(res: Array<Repository>) {
    this.repos$ = res;
    this.filteredRepos = res;
  }

  filterByParam(param: 'date' | 'size') {
    if (this.repos$) {
      this.filter(param);
    }
  }

  filter(params: 'date' | 'size') {
    this.filteredRepos = this.repos$.filter((res) => {
      if (params === 'size' && res.size < 1000) {
        return res;
      }
      if (params === 'date' && res.created_at > '2011-09-17T23:02:10Z') {
        return res;
      }
    });
  }
}
