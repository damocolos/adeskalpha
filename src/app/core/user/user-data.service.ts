import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserDataService {

    endpoint: string = environment.app.endpoint;

    constructor(
        private http: HttpClient
    ) { 

    }

    getAll(): Observable<any>{
        return this.http.get(`${this.endpoint}/users`);
    }

    getAllPage(page: number): Observable<any>{
        return this.http.get(`${this.endpoint}/users?page=${page}`);
    }

    getSingle(id: any): Observable<any>{
        return this.http.get(`${this.endpoint}/users/${id}`);
    }

    create(data: any): Observable<any>{
        return this.http.post(`${this.endpoint}/users`, data);
    }

    update(data: any): Observable<any>{
        return this.http.put(`${this.endpoint}/users`, data);
    }

    delete(id: any): Observable<any>{
        return this.http.delete(`${this.endpoint}/users/${id}`);
    }

}
