import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { LoaderService } from '@app/loader.service';
import { MediaDataService } from '@app/media/media-data.service';
import { InsuranceDataService } from '@app/insurance/insurance-data.service';
import { Store } from '@ngrx/store';
import { actionInitMedia, selectorMedias } from '@app/media/media.reducer';
import { actionInitInsurance, selectorInsurances } from '@app/insurance/insurance.reducer';
import { selectorMembers } from '@app/member/member.reducer';
import { selectorDeposits } from '@app/deposit/deposit.reducer';
import { selectorCredits } from '@app/credit/credit.reducer';
import { selectorBookkeepings } from '@app/bookkeeping/bookkeeping.reducer';

@Injectable()
export class TreadService {

    count: number = 2;

    constructor(
        private loader: LoaderService,
        private store: Store<any>,
        private insuranceService: InsuranceDataService,
        private mediaService: MediaDataService,
    ) {
        // this.loader.display(true);

        this.store.select(selectorMedias);
        this.store.select(selectorInsurances);
        this.store.select(selectorMembers);
        this.store.select(selectorDeposits);
        this.store.select(selectorCredits);
        this.store.select(selectorBookkeepings);
    }

    run() {
        // this.mediaService.getAll()
        //     .subscribe(
        //         result => {
        //             if (!environment.production)
        //                 console.log('get all data media', result);

        //             this.store.dispatch(actionInitMedia(result.data));
        //             this.done();
        //         });

        // this.insuranceService.getAll()
        //     .subscribe(
        //         result => {
        //             if (!environment.production)
        //                 console.log('all data insurances', result);

        //             this.store.dispatch(actionInitInsurance(result.data));
        //             this.done();
        //         });
    }

    done() {
        if(--this.count == 0)
            this.loader.display(false);
    }

}
