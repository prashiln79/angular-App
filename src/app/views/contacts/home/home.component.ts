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
  
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

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
  public expandUtility: boolean = false;
  public month = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private contactsFacade: ContactsStoreFacade, private router: Router,private spreadSheetService: SpreadSheetService,private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.spreadSheetService.getSpreadsheet([
      'Current!H1',
      "Current!A2:E",
      "Utility!A2:F",
      "Utility!H2:H2",
      "Expenses!F2:F2",
      "Electricity!A2:F",
      "Expenses!A2:E",
    ]).subscribe((response)=>{
      this.spreadSheetDataObj['currentMonthTotalSpending']  = response.valueRanges[0].values[0][0];
      this.spreadSheetDataObj['currentMonthSpendingList']   = response.valueRanges[1].values;
      this.spreadSheetDataObj['totalUtilityList']           = response.valueRanges[2].values;
      this.spreadSheetDataObj['totalUtilityCost']           = response.valueRanges[3].values[0][0];
      this.spreadSheetDataObj['totalCost']                  = response.valueRanges[4].values[0][0];
      this.spreadSheetDataObj['electricityList']            = (response.valueRanges[5].values).reverse();
      this.spreadSheetDataObj['fullYearExpensesList']       = (response.valueRanges[6].values).reverse();
      this.buildPolarChartData(this.spreadSheetDataObj['currentMonthSpendingList']);
      this.buildPieChartData(this.spreadSheetDataObj['totalUtilityList']);
      this.buildFullyearExpensesChart(this.spreadSheetDataObj['fullYearExpensesList']);
    });
  }

  public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartData: ChartDataSets[] = [
    { data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Expenses' },
  ];
  buildFullyearExpensesChart(data){

    let barChartData: ChartDataSets[] = [
      { data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Expenses' },
    ];

    data.forEach((item)=>{
      let date = parseInt(item[0].split('-')[1]);
      let amount   = parseFloat(item[4].replace('₹','').replace(/,/g,''));
      // @ts-ignore
      barChartData[0].data[date]+= amount;
    });
    this.barChartData = barChartData;
    this.changeDetection.detectChanges();
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


  // Utility
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
  public pieChartLabels: Label[] = [];
  public pieChartData: number[]   = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend   = true;
  public pieChartPlugins  = [pluginDataLabels];
  public pieChartColors   = [
    {
      backgroundColor: ['rgba(255,161,181,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  buildPieChartData(data:Array<any>){
    let Data = {};
    data.forEach((item)=>{
      let category = item[3];
      let amount   = parseFloat(item[4].replace('₹','').replace(/,/g,''));

      if(Data[category]){
        Data[category] = Data[category]+amount;
      }else{
        Data[category] = amount;
      }
    });
    this.pieChartLabels = Object.keys(Data);
     // @ts-ignore
    this.pieChartData   = Object.values(Data);
    this.changeDetection.detectChanges();
  }

  expnadUtility(){
    this.expandUtility = !this.expandUtility;
    this.buildElectricityChart(this.spreadSheetDataObj['electricityList']);
  }
 
  public electricityChartLabels: Label[] = [];
  public electricitybarChartData: ChartDataSets[] = [
    { data: [], label: 'Amount' },
    { data: [], label: 'Unit' }
  ];

  buildElectricityChart(data){
    this.electricityChartLabels   = [];
    this.electricitybarChartData  = [
      { data: [], label: 'Amount' },
      { data: [], label: 'Unit' }
    ];
    let Data      = {};
    let totalAmt  = 0;


    data.forEach((item)=>{
      let amount   = parseFloat(item[4].replace('₹','').replace(/,/g,''));
      totalAmt+= amount;
      let unit   = parseFloat(item[5].replace(/,/g,''));
      let date = (item[0].split('-')[2]+'/'+ this.month[parseInt(item[0].split('-')[1])]+' - '+item[1].split('-')[2]+'/'+ this.month[parseInt(item[1].split('-')[1])])||'error';
      this.electricityChartLabels.push(date);
      this.electricitybarChartData[0].data.push(amount);
      this.electricitybarChartData[1].data.push(unit);
     
    });
    this.spreadSheetDataObj['electricityTotalAmount'] = totalAmt;

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
