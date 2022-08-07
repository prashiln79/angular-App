import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { ChangeDetectorRef } from '@angular/core';
import { SpreadSheetService } from '@app/core/services/spredsheet.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {

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
  public spreadSheetDataObj = {};
  public expandUtility: boolean = false;
  public month = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public statusBoardItems:Array<{startDate : '', endDate : '', percentage:'0%', amount:0, days:0, describe:'',name:''}>=[];
  public enableLoader = true;
  public showTxn: boolean = false;
  public electricityPerMonthCost: number;
  public electricityPerMonthunits: number;
  public waterPerMonthCost: number;
  public waterPerMonthunits: number;

  constructor(private spreadSheetService: SpreadSheetService,private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.spreadSheetService.getSpreadsheet([
      'Current!H1',
      "Current!A2:E",
      "Utility!A2:F",
      "Utility!H2:H2",
      "Expenses!F2:F2",
      "Electricity!A2:F",
      "Expenses!A2:E",
      "Water!A2:F",
      "Data!I2:I2",
      "Data!J2:J2",
      "2021 Expenses!F2:F2",
    ]).subscribe((response)=>{
      this.enableLoader = false;
      this.spreadSheetDataObj['currentMonthTotalSpending']  = response.valueRanges[0].values[0][0];
      this.spreadSheetDataObj['currentMonthSpendingList']   = response.valueRanges[1].values;
      this.spreadSheetDataObj['totalUtilityList']           = response.valueRanges[2].values;
      this.spreadSheetDataObj['totalUtilityCost']           = response.valueRanges[3].values[0][0];
      this.spreadSheetDataObj['totalCost']                  = response.valueRanges[4].values[0][0];
      this.spreadSheetDataObj['electricityList']            = (response.valueRanges[5].values).reverse();
      this.spreadSheetDataObj['fullYearExpensesList']       = (response.valueRanges[6].values).reverse();
      this.spreadSheetDataObj['waterList']                  = (response.valueRanges[7].values);
      this.spreadSheetDataObj['electricityID']              = response.valueRanges[8].values[0][0];
      this.spreadSheetDataObj['WaterID']                    = response.valueRanges[9].values[0][0];
      this.spreadSheetDataObj['lastYeartotalCost']          = response.valueRanges[10].values[0][0];
      this.spreadSheetDataObj['monthlyUtilityCost']         = 0;
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
      let date = (parseInt(item[0].split('-')[1])-1);
      let amount   = parseInt(item[4].replace('₹','').replace(/,/g,''));
      // @ts-ignore
      barChartData[0].data[date]+= amount;
    });
    this.barChartData = barChartData;
    this.changeDetection.detectChanges();
  }
  


  buildBroadbandBar(data){
    let boardItem = {};
    boardItem['startDate']  = data[0].split('-')[2]+'-'+this.month[parseInt(data[0].split('-')[1])]+'-'+data[0].split('-')[0];
    boardItem['endDate']    = data[1].split('-')[2]+'-'+this.month[parseInt(data[1].split('-')[1])]+'-'+data[1].split('-')[0];
    // @ts-ignore
    let totalDays = Math.ceil(Math.abs(new Date(data[0]) - new Date(data[1])) / (1000 * 60 * 60 * 24)); 
    // @ts-ignore
    let diffDays = Math.ceil(Math.abs(new Date(data[1]) - new Date()) / (1000 * 60 * 60 * 24)); 
    boardItem['percentage'] = (100 - Math.round((diffDays/totalDays)*100))+'%';
    boardItem['amount']     = data[4];
    boardItem['days']       = diffDays>=0?diffDays:0;
    boardItem['describe']   = data[2];
    boardItem['name']       = data[3];
    // @ts-ignore
    this.statusBoardItems.push(boardItem);
  }



  public polarAreaChartLabels: Label[]      = [];
  public polarAreaChartData: SingleDataSet  = [];
  public polarAreaLegend                    = true;
  public polarAreaChartType: ChartType = 'polarArea';
  buildPolarChartData(data:Array<any>){
      if(data){
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
  }


  // Utility chart
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
    let Utilitys = {};
    let lastEnddate
    data.forEach((item)=>{
      let category = item[3];
      let amount   = parseFloat(item[4].replace('₹','').replace(/,/g,''));
      // @ts-ignore
      let totalDays = Math.ceil(Math.abs(new Date(item[0]) - new Date(item[1])) / (1000 * 60 * 60 * 24)); 
       // @ts-ignore
      let overlapDays = Math.ceil(Math.abs(new Date(item[0]) - new Date(lastEnddate)) / (1000 * 60 * 60 * 24));

      if(Utilitys[category]){
        if(category == "Telephone" && overlapDays>0){
          Utilitys[category]['totalDays'] = totalDays;
          
        }else{
          Utilitys[category]['totalDays']+= totalDays;
        }
        Utilitys[category]['totalAmount']  += amount;
        Utilitys[category]['amount']  = Math.round((Utilitys[category]['totalAmount']/Utilitys[category]['totalDays'])*30);
      }else{
        Utilitys[category] = {totalDays:0,totalAmount:0,amount:0};
        Utilitys[category]['totalDays']  = totalDays;
        Utilitys[category]['totalAmount']    = amount;
        Utilitys[category]['amount']  = Math.round((Utilitys[category]['totalAmount']/Utilitys[category]['totalDays'])*30);
        
      }

      if(((new Date)<(new Date (item[1])))){
        this.buildBroadbandBar(item);
      }
      if(category == "Telephone"){
        lastEnddate = item[1];
      }
    });
    this.pieChartLabels = Object.keys(Utilitys);
     // @ts-ignore
     this.pieChartLabels.forEach((item:any)=>{
      this.pieChartData.push(Utilitys[item]['amount']);
      this.spreadSheetDataObj['monthlyUtilityCost'] += Utilitys[item]['amount'];
     });

    this.changeDetection.detectChanges();
  }

  expnadUtility(){
    //navigator.vibrate(100);
    this.expandUtility = !this.expandUtility;
    if(this.expandUtility){
      this.buildElectricityChart(this.spreadSheetDataObj['electricityList']);
      this.buildWaterChart(this.spreadSheetDataObj['waterList']);
    }
  }

  expnadTxn(){
    this.showTxn = !this.showTxn;
  }
 

  //electricity chart
  public electricityChartLabels: Label[] = [];
  public electricitybarChartData: ChartDataSets[] = [
    { data: [], label: 'Amount' },
    { data: [], label: 'Unit' }
  ];
  buildElectricityChart(data){
    this.electricityChartLabels   = [];
    this.electricityPerMonthCost  = 0;
    this.electricityPerMonthunits = 0;
    this.electricitybarChartData  = [
      { data: [], label: 'Amount' },
      { data: [], label: 'Unit' }
    ];
    let Data      = {};
    let totalAmt  = 0;
    let totalDays = 0;
    let totalUnit = 0;

    data.forEach((item)=>{

      // @ts-ignore
      totalDays+= Math.ceil(Math.abs(new Date(item[0]) - new Date(item[1])) / (1000 * 60 * 60 * 24)); 
      let amount   = parseFloat(item[4].replace('₹','').replace(/,/g,''));
      totalAmt  += amount;
      totalUnit += parseInt(item[5]);
      let unit   = parseFloat(item[5].replace(/,/g,''));
      let date = (item[0].split('-')[2]+'/'+ this.month[parseInt(item[0].split('-')[1])]+' - '+item[1].split('-')[2]+'/'+ this.month[parseInt(item[1].split('-')[1])])||'error';
      this.electricityChartLabels.push(date);
      this.electricitybarChartData[0].data.push(amount);
      this.electricitybarChartData[1].data.push(unit);
    });

    this.electricityPerMonthCost  = Math.round((totalAmt/totalDays)*30);
    this.electricityPerMonthunits = Math.round((totalUnit/totalDays)*30);

    this.spreadSheetDataObj['electricityTotalAmount'] = totalAmt;
    this.changeDetection.detectChanges();
  }
  

  //water chart
  public waterChartLabels: Label[] = [];
  public waterbarChartData: ChartDataSets[] = [
    { data: [], label: 'Amount' },
    { data: [], label: 'Unit' }
  ];
  buildWaterChart(data){
    this.waterChartLabels   = [];
    this.waterbarChartData  = [
      { data: [], label: 'Amount' },
      { data: [], label: 'Unit' }
    ];
    let Data      = {};
    let totalAmt  = 0;
    let totalDays = 0;
    let totalUnit = 0;
    data.forEach((item)=>{
      let amount   = parseFloat(item[4].replace('₹','').replace(/,/g,''));
      totalAmt+= amount;
      // @ts-ignore
      totalDays+= Math.ceil(Math.abs(new Date(item[0]) - new Date(item[1])) / (1000 * 60 * 60 * 24)); 
      totalUnit += parseInt(item[5]);
      let unit   = parseFloat(item[5].replace(/,/g,''));
      let date = (item[0].split('-')[2]+'/'+ this.month[parseInt(item[0].split('-')[1])]+' - '+item[1].split('-')[2]+'/'+ this.month[parseInt(item[1].split('-')[1])])||'error';
      this.waterChartLabels.push(date);
      this.waterbarChartData[0].data.push(amount);
      this.waterbarChartData[1].data.push(unit);
    });
    this.waterPerMonthCost  = Math.round((totalAmt/totalDays)*30);
    this.waterPerMonthunits = Math.round((totalUnit/totalDays)*30);
    this.spreadSheetDataObj['waterTotalAmount'] = totalAmt;
    this.changeDetection.detectChanges();
  }
  
  
}
