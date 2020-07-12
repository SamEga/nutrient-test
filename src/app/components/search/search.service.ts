import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  URL = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient) {}

  getRepositories(q: string): Observable<any> {
    return this.http.get(this.URL, { params: { q } });
  }
}
