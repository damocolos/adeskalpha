import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media/media.component';
import { AllMediaComponent } from './all-media/all-media.component';
import { MediaDataService } from '@app/media/media-data.service';
import { StoreModule } from '@ngrx/store';
import { mediaReducer } from '@app/media/media.reducer';
import { SharedModule } from '@app/shared';

@NgModule({
    imports: [
        CommonModule,
        MediaRoutingModule,

        // StoreModule.forFeature('media',
        //     { medias: mediaReducer }
        // ),

        SharedModule
    ],
    declarations: [MediaComponent, AllMediaComponent],
    providers: [MediaDataService]
})
export class MediaModule { }
