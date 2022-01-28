import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

class Page {
  
  constructor(private fixture: ComponentFixture<LoginComponent>){ }
  
  get submitButton(){
    return this.fixture.nativeElement.querySelector('button');
  }

  get usernameInput(){
    return this.fixture.debugElement.nativeElement.querySelector('#username');
  }

  get passwordInput(){
    return this.fixture.debugElement.nativeElement.querySelector("#pwd");
  }

  get errorMsg(){
    return this.fixture.debugElement.query(By.css('.error')).nativeElement;
  }

  public updateValue(input: HTMLInputElement, value: string){
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
}

describe('Login Component', () => {
  let loginComponent: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>; // test utilities we can harnest
  let debugEl: DebugElement;

  let loginService: LoginService;
  let loginServiceSpy: {login: jasmine.Spy};
  let routerSpy: { navigateByUrl: jasmine.Spy};
  let router: Router;
  let page: Page;

  beforeEach(async () => {
    // mock the one that are injected
    loginServiceSpy = jasmine.createSpyObj(LoginService, ['login']);
    routerSpy = jasmine.createSpyObj(Router, ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ LoginComponent ], // what we are testing
      providers:[
        { provide: LoginService, useValue: loginServiceSpy},
        { provide: Router, useValue: routerSpy}
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    debugEl = fixture.debugElement;
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    page = new Page(fixture);
    fixture.detectChanges();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(loginComponent).toBeTruthy();
  });
});
