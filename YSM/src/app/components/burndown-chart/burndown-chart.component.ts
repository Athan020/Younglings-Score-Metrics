import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AmChart, AmChartsService } from '@amcharts/amcharts3-angular';
import { DatabaseService } from '../../services/database/database.service';
import { element } from 'protractor';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css']
})
export class BurndownChartComponent implements OnInit, OnDestroy {

  teamName;
  private chart: AmChart;
  currentDate: Date = new Date();
  currentSprint;
  sprints;

  @Input() pointsBurned: number;

  burnedDownArray: any[];

  constructor(private AmCharts: AmChartsService, protected readonly db: DatabaseService, protected readonly afAuth: AngularFireAuth) {

  }

  ngOnInit() {
    this.db.users.subscribe(response => {
      response.map(element => {
        if (element.user === this.afAuth.auth.currentUser.uid) {
          this.db.teams.subscribe(res => {
            res.map(e => {
              if (e.name === element.team) {
                this.sprints = e.totalSprints;
                this.db.getLatestSprintObject(e.name, e.totalSprints).subscribe(r => {
                  this.currentSprint = r;
                  this.burnedDownArray = this.currentSprint.burnDownChart;
                  this.displayChart(this.currentSprint.burnDownChart);
                });
              }
            });
          });
          // this.teamName = element.team;
          // this.db.getTeamSprint(this.teamName);
          // this.db.getLatestSprintObject(this.teamName).subscribe(res => {
          //   this.currentSprint = res;
          //   this.burnedDownArray = this.currentSprint.burnDownChart;
          //   this.displayChart(this.currentSprint.burnDownChart);
          // });
        }
      });
    });
    // this.db.getTeamSprint(this.teamName);
  }



  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

  updateChart() {
    const points = this.burnedDownArray[this.burnedDownArray.length - 1].points - this.pointsBurned;
    this.burnedDownArray.push({
      'date': this.currentDate.toISOString().substr(0, 10),
      'points': points
    });

    this.AmCharts.updateChart(this.chart, () => {
      this.chart.dataProvider = this.burnedDownArray;
    });

    this.db.pushPointsToDB(this.teamName, this.burnedDownArray);
  }

  displayChart(chartArray) {
    // this.burnedDownArray = [
    //   {
    //     'day': this.currentDate.toISOString().substr(0, 10),
    //     'points': points
    //   }
    // ]


    this.chart = this.AmCharts.makeChart('chartdiv', {
      'type': 'serial',
      'categoryField': 'date',
      'startDuration': 1,
      'categoryAxis': {
        'gridPosition': 'start'
      },
      'graphs': [
        {
          'balloonText': '[[title]] of [[category]]:[[value]]',
          'bullet': 'round',
          'id': 'AmGraph-1',
          'title': 'graph 1',
          'valueField': 'points'
        }
      ],
      'valueAxes': [
        {
          'id': 'ValueAxis-1',
          'title': 'Points'
        }
      ],
      'titles': [
        {
          'id': 'Title-1',
          'size': 15,
          'text': 'Sprint ' + (this.sprints + 1) + ' Burndown Chart'
        }
      ],
      'dataProvider': chartArray
    });
  }
}
