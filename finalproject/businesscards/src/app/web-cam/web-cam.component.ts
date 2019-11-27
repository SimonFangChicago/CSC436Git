import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BusinessCardService} from '../services/business-card.service';
import {BusniessCardModel} from '../model/busniess-card-model';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.css']
})
export class WebCamComponent implements OnInit {

  	@ViewChild("video",{static: false})
    public video: ElementRef;

    @ViewChild("canvas",{static: false})
    public canvas: ElementRef;

    public capture_image: any;

    public constructor(private http : HttpClient,private cardsService:BusinessCardService,private router:Router) {
        this.capture_image = '';
    }

    public ngOnInit() { }

    public ngAfterViewInit() {
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                this.video.nativeElement.src = window.URL.createObjectURL(stream);
                this.video.nativeElement.play();
            });
        }
    }

    public capture() {
        var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
        //this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
		this.capture_image = 'https://www.jje.sg/media/catalog/product/cache/1/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/s/s/ssbw-01.png';

        this.OCR();
    }

    public OCR()
    {
    	const request: any = {
		 'requests': [
		 {
		 'image': {
		 'source': {
		 'imageUri':
		'https://www.jje.sg/media/catalog/product/cache/1/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/s/s/ssbw-01.png',
		 },
		 },
		 'features': [
		 {
		 'type': 'TEXT_DETECTION',
		 'maxResults': 1,
		 }
		 ]
		 }
		 ]
		 };
		 const url =
		'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBby6pLqEOiul44__X2MGZsNXF9SzzlQEE';
		 this.http.post(
		 url,
		 request
		 ).subscribe( (results: any) => {
		 //console.log('RESULTS RESULTS RESULTS');
		 console.log(results);
		 console.log(results.responses["0"].fullTextAnnotation);

		 var _name = results.responses["0"].fullTextAnnotation.text;
		 var _address = results.responses["0"].fullTextAnnotation.text;
		 var _email = results.responses["0"].fullTextAnnotation.text;
		 var _number = results.responses["0"].fullTextAnnotation.text;

		 

		 var newCard = {
		 	firstName : _name,
		 	lastName : _name,
		 	email : _email,
		 	phoneNumber : _number,
		 	additionalInfo : ''
		 }

		 console.log(newCard);
		 //console.log('RESULTS RESULTS RESULTS');

		this.cardsService.add(newCard);


  		this.router.navigate(['busniessCards']);

		 });

    }
}
