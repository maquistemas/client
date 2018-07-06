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
	selector: 'add',
	templateUrl: 'add.component.html',
	providers: [MessageService, FollowService, UserService]
	}) 
export class AddComponent implements OnInit{
	public title: string;
	public message: Message;
	public identity;
	public token;
	public url: string;
	public status: string;
	public follows;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _followService: FollowService,
		private _messageService: MessageService,
		private _userService: UserService
		){
		this.title = 'Enviar mensaje';
		this.identity = this._userService.getIdentity();
		this.message = new Message('','','','', this.identity._id,'');
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}


	ngOnInit(){
		console.log('add.component cargado');
	}
}