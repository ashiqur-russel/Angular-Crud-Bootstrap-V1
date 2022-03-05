import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  postEmployee(data: any) {
    const postUrl = 'http://localhost:5000/posts'

    return this.http.post<any>(postUrl, data)
      .pipe(map((res: any) => {
        return res
      }))
  }

  getEmployee() {
    const postUrl = 'http://localhost:5000/posts'

    return this.http.get<any>(postUrl)
      .pipe(map((res: any) => {
        return res
      }))
  }

  updateEmployee(data: any, id: number) {
    const postUrl = 'http://localhost:5000/posts'

    return this.http.put<any>(`postUrl/${id}`, data)
      .pipe(map((res: any) => {
        return res
      }))
  }

  deleteEmployee(id: number) {
    const postUrl = 'http://localhost:5000/posts'

    return this.http.delete<any>(`postUrl/${id}`)
      .pipe(map((res: any) => {
        return res
      }))
  }
}
