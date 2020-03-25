import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coronavirus-column',
  templateUrl: './coronavirus-column.component.html',
  styleUrls: ['./coronavirus-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusColumnComponent implements OnInit {

  @Input() data;
  chartDatas: any[];
  colorScheme = {
    domain: ['#FF0000', '#0069cc']
  };

  constructor(private readonly datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initDatas();
  }

  private initDatas(): void {
    this.chartDatas = [];
    this.data.forEach((element, index) => {
      if (this.data.length - index < 15) {
        const data = {
          name: this.datePipe.transform(element.reportDate, 'dd/MM'),
          series: [
            {
              name: 'Chine',
              value: element.confirmed.china
            },
            {
              name: 'Reste du monde',
              value: element.confirmed.outsideChina
            }
          ]
        };
        this.chartDatas.push(data);
      }
    });
  }

}
