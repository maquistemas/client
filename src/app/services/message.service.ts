import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';//funciona luego de ejecutar: npm install --save rxjs-compat
import { GLOBAL } from './global';
import { Follow } from '../models/follow';
import { Message } from '../models/message';

@Injectable()
export class MessageService{
	public url: string;

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

	addMessage(token, message): Observable<any>{
		let params = JSON.stringify(message);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
										.set('Authorization', token);

		return this._http.post(this.url+'message', params, {headers: headers}); 
	}

	getMyMessages(token, page = 1){
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
										.set('Authorization', token);

	 	return this._http.get(this.url+'my-messages/'+page, {headers: headers});

	}

	getEmitMessages(token, page = 1){
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
										.set('Authorization', token);

	 	return this._http.get(this.url+'messages/'+page, {headers: headers});

	}


}