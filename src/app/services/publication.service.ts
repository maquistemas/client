import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';//funciona luego de ejecutar: npm install --save rxjs-compat
import { GLOBAL } from './global';
import { Publication } from '../models/pubication';

@Injectable()
export class PublicationService{
	public url: string;

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

	addPublication(token, publication){
		let params = JSON.stringify(publication);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
										.set('Authorization', token);

		return this._http.post(this.url+'publication', params, {headers:headers});

	}

}