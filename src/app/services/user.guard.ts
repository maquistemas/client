import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate{

	constructor(
		private _router: Router,
		private _userService: UserService
	){}

	canActivate(){
		let identity = this._userService.getIdentity();
		console.log('>>>>identity 1: ');
		console.log(identity);
		console.log('>>>>>>>2');
		if(identity && (identity.role == 'ROLE_USER' || identity.role == 'ROLE_ADMIN')){
			console.log('>>>>>>>3');
			return true;
		}else{
			this._router.navigate(['/login']);
			return false;
		}
	}
}