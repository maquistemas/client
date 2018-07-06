import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../../models/message';
import { Follow} from '../../../models/follow';
import { User} from '../../../models/user';
import { MessageService } from '../../../services/message.service';
import { FollowService } from '../../../services/follow.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';


@Component({
	selector: 'sended',
	templateUrl: 'sended.component.html',
	providers: [MessageService, FollowService, UserService]
	}) 
export class SendedComponent implements OnInit{
	public title: string;
	public message: Message;
	public identity;
	public token;
	public url: string;
	public status: string;
	public follows;
	public messages: Message[];

	public page;
	public next_page;
	public prev_page;
	public total;
	public pages;
	public userPageId;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _followService: FollowService,
		private _messageService: MessageService,
		private _userService: UserService
		){
		this.title = 'Mensajes enviados';
		this.identity = this._userService.getIdentity();
		this.message = new Message('','','','', this.identity._id,'');
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}


	ngOnInit(){
		console.log('sended.component cargado');
		this.actualPage();
	}


	actualPage(){
		this._route.params.subscribe(params => {
			let page = +params['page'];
			this.page = page;

			if(!params['page']){
				page = 1;
			}

			if(!page){
				page = 1;
			}else{
				
				this.next_page = page+1;
				this.prev_page = page-1;
			
				if(this.prev_page <= 0){
					this.prev_page = 1;
				}
			}

			//devolver listado de usuarios
			this.getMessages(this.token, this.page)
			
		});
	}

	getMessages(token, page){
		this._messageService.getEmitMessages(token, page).subscribe(
				response => {
					let responseString = JSON.stringify(response);
					let responseJson = JSON.parse(responseString);

				if(!responseJson.messages){
				
				}else {
					this.messages = responseJson.messages;
					this.total = responseJson.total;
					this.pages = responseJson.pages;
				
				}
			},
			error => {
				console.log(<any>error);
			}

		);
	}

}