import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from '../main/main.service';
import { Repository } from 'src/app/data/data.model';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.sass'],
})
export class RepositoryComponent implements OnInit, OnDestroy {
  routeSub: Subscription;
  repo: Repository;

  constructor(private service: MainService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.parseUrl();
  }

  getRepoInfo(params: { owner: string; repo: string }) {
    this.service.getRepoInfo(params).subscribe(
      (res) => (this.repo = res),
      (err) => console.log(err)
    );
  }

  parseUrl() {
    this.routeSub = this.route.params.subscribe(
      (params: { owner: string; repo: string }) => this.getRepoInfo(params)
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
