import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PasswordService} from './password.service';
import {NgForm} from '@angular/forms';

declare var $;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['change-password.css']
})
export class ChangePasswordComponent implements OnInit {

  msg: string;

  constructor(private passwordService: PasswordService) {
  }

  // @Input() message = 'Fuck';
  // tslint:disable-next-line:no-output-native
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  ngOnInit(): void {
    setTimeout(() => {
      $('.backdrop').css('opacity', '1');
    }, 50);
  }

  OnChangeClicked(form: NgForm) {
    if (form.value.oldpass === '' || form.value.newpass === '') {
      return;
    }
    // this.passwordService.changePwd()
    console.log(form.value);
    this.passwordService.changePwd('1-BSCS-2016', form.value.oldpass, form.value.newpass).subscribe(
      response => {
        const res = response as { Expr1: boolean }[];
        if (res.length > 0) {
          console.log('done');
          this.msg = 'Changed';
          setTimeout(() => {
            this.close.emit();
          }, 600);
        } else {
          console.log('wrong');
          this.msg = 'Wrong';
        }
      }
    );
  }
}
