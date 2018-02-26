import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '@env/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'anms-file-gallery-dialog',
    templateUrl: './file-gallery-dialog.component.html',
    styleUrls: ['./file-gallery-dialog.component.scss']
})
export class FileGalleryDialogComponent implements OnInit {

    selected: any = null;

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
    }

    onSetFile(file) {
        if(!environment.production)
            console.log("file", file);

        this.selected = file;
    }

    pick() {

    }

}
