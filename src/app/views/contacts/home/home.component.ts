import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Contact } from '@app/core/models';
import { Router } from '@angular/router';
import { ContactsStoreFacade } from '@app/contacts-store/contacts.store-facade';
import { SpreadSheetService } from '../services/spredsheet.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];




// Pie
public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
      },
    },
  }
};

public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
public pieChartData: number[]   = [300, 500, 100];
public pieChartType: ChartType = 'pie';
public pieChartLegend   = true;
public pieChartPlugins  = [pluginDataLabels];
public pieChartColors   = [
  {
    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
  },
];


 // Doughnut
 public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
 public doughnutChartData: MultiDataSet = [
   [350, 450, 100],
   [50, 150, 120],
   [250, 130, 70],
 ];
 public doughnutChartType: ChartType = 'doughnut';




  contacts$ = this.contactsFacade.contacts$;
  public spreadSheetDataObj = {};


  constructor(private contactsFacade: ContactsStoreFacade, private router: Router,private spreadSheetService: SpreadSheetService,private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    let reqData =[
      'Current!H1',
      "Current!A2:E"
    ];
    this.spreadSheetService.getSpreadsheet(reqData).subscribe((response)=>{
      this.spreadSheetDataObj['currentMonthTotalSpending']  = response.valueRanges[0].values[0][0];
      this.spreadSheetDataObj['currentMonthSpendingList']   = response.valueRanges[1].values;
      this.buildPolarChartData(this.spreadSheetDataObj['currentMonthSpendingList']);
    });

  }



  public polarAreaChartLabels: Label[]      = [];
  public polarAreaChartData: SingleDataSet  = [];
  public polarAreaLegend                    = true;
  public polarAreaChartType: ChartType = 'polarArea';
  buildPolarChartData(data:Array<any>){
    let pieData = {};
    data.forEach((item)=>{
      let category = item[3];
      let amount   = parseFloat(item[4].replace('₹','').replace(/,/g,''));

      if(pieData[category]){
        pieData[category] = pieData[category]+amount;
      }else{
        pieData[category] = amount;
      }
    });
    this.polarAreaChartLabels = Object.keys(pieData);
     // @ts-ignore
    this.polarAreaChartData   = Object.values(pieData);
    this.changeDetection.detectChanges();
  }
 
  
  editContact(contact: Contact) {
    this.router.navigate(['/contacts', contact.id, 'edit']);
  }

  showContact(contact: Contact) {
    this.router.navigate(['/contacts', contact.id]);
  }

  deleteContact(contact: Contact) {
    const r = confirm('Are you sure?');
    if (r) {
      this.contactsFacade.deleteContact(contact.id);
    }
  }

}
