import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BusinessCardService} from '../services/business-card.service';
import {BusniessCardModel} from '../model/busniess-card-model';
import { Router } from  "@angular/router";
import domtoimage from 'dom-to-image';

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

    private base64String : string;

    private loading : boolean;

    public constructor(private http : HttpClient,private cardsService:BusinessCardService,private router:Router) {
        this.capture_image = '';
    }

    public ngOnInit() { 
    	this.cardsService.setTobeEditedCard(null);
    }

    public ngAfterViewInit() {
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                this.video.nativeElement.srcObject = stream;//window.URL.createObjectURL(stream);
                this.video.nativeElement.play();
            });
        }
    }

    public capture() {
        var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
		this.capture_image = this.canvas.nativeElement.toDataURL("image/png");
		this.convertToBase64();
    }

    public isLoading()
    {
    	return this.loading;
    }

    public OCR()
    {
    	this.loading = true;

		 const request: any = 
		 {
		 	'requests': 
		 	[
				 {
				 	'image': 
				 	 {
				 		'content': this.base64String
				 	 },
				 	'features': 
				 	 [
						 {
							 'type': 'TEXT_DETECTION'
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

			 this.loading = false;

			 console.log(results);
			 console.log(results.responses["0"].fullTextAnnotation);


			 var _name = 'webCameTest';
			 var _address = '';
			 var _email = '';
			 var _number = '';

			 if(results.responses["0"].fullTextAnnotation === null || results.responses["0"].fullTextAnnotation === undefined)
			 {
			 	alert("No text found in camera capture image");
			 	
			 }
			 else
			 {
			 	var fullText = results.responses["0"].fullTextAnnotation.text;
				 var length = results.responses["0"].fullTextAnnotation.text.length;

				 _name = results.responses["0"].fullTextAnnotation.text;

				 if(length>20)
				 {
				 	_name = results.responses["0"].fullTextAnnotation.text.substring(0,length/4);
				 	_address = results.responses["0"].fullTextAnnotation.text.substring(length/4,2*length/4);
				 	_email = results.responses["0"].fullTextAnnotation.text.substring(2*length/4,3*length/4);
				 	_number = results.responses["0"].fullTextAnnotation.text.substring(3*length/4,length-1);
				 }
			 }

			 
			 

			 var newCard = {
			 	isNew : true,
			 	firstName : _name,
			 	lastName : '',
			 	email : _email,
			 	phoneNumber : _number,
			 	additionalInfo : '',
			 	imageBase64: this.base64String
			 }

			 console.log(newCard);

			//this.cardsService.add(newCard);

			this.cardsService.setTobeEditedCard(newCard);


	  		this.router.navigate(['newBusniessCards']);

		 });

    }

    convertToBase64() {

    const imgNode = this.canvas.nativeElement;
      console.log(imgNode);
      domtoimage.toPng(imgNode)
      .then( (dataUrl: string) => {
        this.base64String = dataUrl;
        this.base64String = this.base64String.replace('data:image/png;base64,','');
        console.log(this.base64String);
        this.OCR();
      }).catch( (e: any) => {
        console.log(e);
      });

  }
}
