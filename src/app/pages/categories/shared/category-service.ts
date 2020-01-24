import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Category } from "./category.mdel";
import { HttpClient } from "@angular/common/http";
import { map, catchError, flatMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private apiPath = "api/categories";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataCategories));
  }

  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;

    const category = this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToCategory));

    return category;
  }

  create(category: Category): Observable<Category> {
    return this.http
      .post(this.apiPath, category)
      .pipe(catchError(this.handleError), map(this.jsonDataToCategory));
  }

  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;

    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(() => category)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonDataCategories(data: any[]): Category[] {
    const categories: Category[] = [];

    data.forEach(element => categories.push(element as Category));
    return categories;
  }

  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUIILÇAO => ", error);

    return throwError(error);
  }

  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }
}
