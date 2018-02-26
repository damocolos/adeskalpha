import { Component, Inject, OnDestroy, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InsuranceDataService } from '@app/insurance/insurance-data.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Store } from '@ngrx/store';
import { environment } from '@env/environment';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms/src/model';
import { LoaderService } from '@app/loader.service';

// declare var google: any;

@Component({
    selector: 'anms-loc-picker',
    templateUrl: './loc-picker.component.html',
    styleUrls: ['./loc-picker.component.scss']
})

export class LocPickerComponent implements OnDestroy {

    title: string = 'My first AGM project';
    lat: number = -7.5541904;
    lng: number = 110.7819508;
    gMap: GoogleMap;
    zoom: number = 13;
    
    public searchControl: FormControl;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    marker = require('../../../assets/marker_location.png');

    constructor(
        private loader: LoaderService,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
        // show loader
        this.loader.display(true);
        if (!environment.production)
            console.log('data loc', data);

        if(data.lat && data.lng) {
            if (data.lat != '' && data.lng != '') {
                this.lat = +data.lat;
                this.lng = +data.lng;
                this.zoom = 17;
            }
        }
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["geocode"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.lat = place.geometry.location.lat();
                    this.lng = place.geometry.location.lng();
                    this.zoom = 14;
                });
            });
        })
    }

    ngOnDestroy(): void { }

    // center change event
    onCenterChange(event) {
        this.lat = event.lat;
        this.lng = event.lng;
    }

    onMapReady(event) {
        // when map ready hide loader
        if (!environment.production)
            console.log('map ready');

        this.loader.display(false);
    }

    ok() {
        // close dialog and send data
        this.dialogRef.close({
            lat: this.lat,
            lng: this.lng
        });
    }

}
