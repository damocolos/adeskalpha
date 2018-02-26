import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class InsuranceDataService {

    private endpoint: string = environment.app.endpoint;

    constructor(
        private http: HttpClient
    ) { 

    }

    getAll(): Observable<any>{
        return this.http.get(`${this.endpoint}/insurance-profiles`);
    }

    getAllPage(page: number): Observable<any>{
        return this.http.get(`${this.endpoint}/insurances?page=${page}`);
    }

    getSingle(id: any): Observable<any>{
        return this.http.get(`${this.endpoint}/insurance-profiles/${id}`);
    }

    getSingleInsurance(id: any): Observable<any>{
        return this.http.get(`${this.endpoint}/insurances/${id}`);
    }

    create(data: any): Observable<any>{
        return this.http.post(`${this.endpoint}/insurances`, data);
    }

    updateProfile(data: any): Observable<any> {
        return this.http.put(`${this.endpoint}/insurance-profiles`, data);
    }

    update(data: any): Observable<any>{
        // console.log(data);
        return this.http.put(`${this.endpoint}/insurances`, data);
        // return this.http.post(`${this.endpoint}/ex/insurances/${id}`, data);
    }

    delete(id: any): Observable<any>{
        return this.http.delete(`${this.endpoint}/insurances/${id}`);
    }

    uploadFile(data: any): Observable<any> {
        return this.http.post(`${this.endpoint}/upload-image`, data);
    }

}
