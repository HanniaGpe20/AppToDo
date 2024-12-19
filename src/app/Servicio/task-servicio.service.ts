import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Task from "../Interface/Task";

@Injectable({
  providedIn: 'root'
})
export class TaskServicioService {

  private baseUrl='http://localhost:8080/Tasks';
  constructor(private http:HttpClient) { }

      //METODOS DEL SERVICIO
        GetAllTasks(): Observable<Task[]> {
          return this.http.get<Task[]>(this.baseUrl);
        }

        PostTask(task: Task): Observable<Task> {
          return this.http.post<Task>(this.baseUrl, task);
        }

        DeleteTask(id: number): Observable<Task[]> {
          return this.http.delete<Task[]>(`${this.baseUrl}/${id}`);
        }

        PutTask(task: Task, id: number): Observable<Task[]> {
          return this.http.put<Task[]>(`${this.baseUrl}/${id}`, task);
        } 


}
