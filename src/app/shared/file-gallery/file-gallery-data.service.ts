import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileGalleryDataService {

    private endpoint: string = environment.app.endpoint;

    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<any> {
        return this.http.get(`${this.endpoint}/medias`);
    }

    update(data: any): Observable<any> {
        return this.http.put(`${this.endpoint}/medias`, data);
    }

    delete(data: any): Observable<any> {
        return this.http.delete(`${this.endpoint}/medias/${data.id}`);
    }

    uploadFile(data: any): Observable<any> {
        return this.http.post(`${this.endpoint}/upload-image`, data);
    }

    getImage(url: string): string {
        return `${environment.app.IMAGE_URL}/${url}`;
    }

}


