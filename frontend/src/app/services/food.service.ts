import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '@shared/models/Food';
import { Tag } from '@shared/models/Tag';
import { sample_foods, sample_tags } from 'data';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(`${SERVER_URL}${FOODS_PATH}`);
  }

  getById(id: string): Observable<Food> {
    return this.http.get<Food>(`${SERVER_URL}${FOODS_PATH}/${id}`);
  }

  searchByName(name: string): Observable<Food[]> {
    return this.http.get<Food[]>(`${SERVER_URL}${FOODS_PATH}${SEARCH_PATH}/${name}`);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${SERVER_URL}${FOODS_PATH}${TAGS_PATH}`);
  }

  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag === 'All'
      ? this.getAll()
      : this.http.get<Food[]>(`${SERVER_URL}${FOODS_PATH}/tag/${tag}`);
  }
}

const SERVER_URL = environment.serverUrl;
const FOODS_PATH = environment.foodsPath;
const TAGS_PATH = environment.tagsPath;
const SEARCH_PATH = environment.searchPath;
