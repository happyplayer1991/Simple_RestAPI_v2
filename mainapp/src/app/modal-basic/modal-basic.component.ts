import { Component} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {Router} from "@angular/router";

import { PlaceService } from '../place.service';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.css']
})
export class ModalBasicComponent  {

  closeResult: string;
  
  locationName: string;
  description: string;
  latitude: string;
  longitude: string;
  
  public place_data: Array<any> = []; // save place data

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private placeService: PlaceService
  ) {}

  open(content) { 
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
      // ** Add place data ** //
      this.place_data.push({
        locationName: this.locationName,
        description: this.description,
        latitude: this.latitude,
        longitude: this.longitude
      });
      // ** save place data ** //
      this.placeService.myMethod(this.place_data);

      this.router.navigate(['/']); // redirct to main page
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
