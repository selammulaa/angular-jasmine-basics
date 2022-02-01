import { HttpClient } from "@angular/common/http";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { defer } from "rxjs";
import { HomeService } from "./home.service";


describe('Home Service', () => {

    let homeService: HomeService;
    let httpSpy: { get: jasmine.Spy} ;

    beforeEach(() => {
        
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

        TestBed.configureTestingModule({ 
            providers: [HomeService, {provide: HttpClient, useValue: httpSpy}] 
        }); 

        homeService = TestBed.inject(HomeService);

    })

    // spies - mock : but we also have multiple options 

    it('is created', () => {
        expect(homeService).toBeDefined();
    })

    it('call getCities()', fakeAsync(() => {
        const testData = [ // mock data
            {
                name: 'trulli',
                image: 'pic_trulli.jpg',
                alt: 'Italian Trulli'
            },
            {
                name: 'chania',
                image: 'img_chania.jpg',
                alt: 'Chania'
            }
        ]

        httpSpy.get.and.returnValue(defer(() => Promise.resolve(testData)));

        homeService.getCities().then((data) => {
            expect(data).toEqual(testData)
        });
        tick();
    }))


})


