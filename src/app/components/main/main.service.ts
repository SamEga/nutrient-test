import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  URL = 'http://api.github.com/repos';

  constructor(private http: HttpClient) {}

  getRepoInfo(params: { owner: string; repo: string }): Observable<any> {
    return this.http.get(`${this.URL}/${params.owner}/${params.repo}`);
  }
}
