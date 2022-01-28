import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from "./login.service"
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

describe('Login Service', () => {
    let loginService: LoginService;
    let http: HttpClient;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({ // same as ng module
            imports: [HttpClientTestingModule],
            providers: [LoginService] // we can't mock this because we are testing this 
        }); // consists of utilities

        loginService = TestBed.inject(LoginService);
        http = TestBed.inject(HttpClient);
        httpController = TestBed.inject(HttpTestingController);

    })

    afterEach(() => {
        httpController.verify();
    })

    // this is the unit test
    it('service created', () => {
        expect(loginService).toBeDefined();
    })

    it('login api', () => {
        const testData = true;
        const inputData = {
            username: 'admin',
            password: 'admin'
        };

        loginService
            .login(inputData)
            .then((data) => expect(data).toEqual(testData));

        // we are mocking 
        const req = httpController.expectOne('login');

        expect(req.request.method).toEqual('POST');

        req.flush(testData);
    })

    it('call login() failed', () => {
        const emsg = "status 500 error";
        const inputData = {
            username: 'admin',
            password: 'admin'
        };

        loginService.login(inputData).then(
            () => fail('should have failed with the 500 error'), // we are making the test fail //force fail our test
            (error: HttpErrorResponse) => {
                expect(error.status).toEqual(500, 'status');
                expect(error.error).toEqual(emsg, 'message');
            }
        );

        const req = httpController.expectOne('login');

        expect(req.request.method).toEqual('POST');

        // second argument for error
        req.flush(emsg, { status: 500, statusText: 'Server Error'});
        // req.flush(emsg);


    })

})


 // we can define our test cases 
    /*
    beforeEach() // called before each and ever testcases 

    afterEach() // cleaning up after each test 

    beforeAll() // executed only once 

    afterAll() // executed after all
    */
