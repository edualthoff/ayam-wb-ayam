import { InformativoRequestService } from './../../../core/services/https/informativo/informativo-request.service';
import { LoadSpinnerService } from './../../../shared/components/load-spinner/load-spinner.service';
import { AdItemPreviewComponent } from './../../../shared/components/dialog/preview-post/ad-item.component';
import { Component, Input, OnInit } from '@angular/core';
import { InformativoDto } from '../../../core/interfaces/informativo.dto';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],

})
export class PreviewComponent implements AdItemPreviewComponent, OnInit {

  @Input() data: any;
  info$: Observable<InformativoDto>;
  text: HTMLFormElement;

  constructor(private httpInfo: InformativoRequestService, public spinner: LoadSpinnerService) {
  }

  ngOnInit(): void {
    this.info$ = this.httpInfo.findById(this.data.info.id).pipe<InformativoDto>(debounceTime(500));
  }
}
