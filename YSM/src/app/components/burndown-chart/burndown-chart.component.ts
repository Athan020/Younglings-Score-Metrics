import { Component, OnInit } from '@angular/core';
import { AmChart, AmChartsService } from '@amcharts/amcharts3-angular';
import { DatabaseService } from '../../services/database/database.service';
import { element } from 'protractor';
import { AngularFireAuth } from 'angularfire2/Auth';

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css']
})
export class BurndownChartComponent implements OnInit {

  teamName;
  private chart: AmChart;
  currentDate: Date = new Date();
  currentSprint;
  constructor(private AmCharts: AmChartsService, protected readonly db: DatabaseService, protected readonly afAuth: AngularFireAuth) {

  }

  ngOnInit() {
    this.db.users.subscribe(response =>
      response.map(element => {
        if (element.user === this.afAuth.auth.currentUser.uid) {
          this.teamName = element.team;

          this.db.getLatestSprintObject(this.teamName).subscribe(response => {
            this.currentSprint = response
            this.displayChart(this.currentSprint.points)
            console.log(this.currentSprint)
          }
          )
        }

      }
      )
    );


    this.db.getTeamSprint(this.teamName);

  }



  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

  updateChart() {
    this.AmCharts.updateChart(this.chart, () => {
      this.chart.dataProvider = [{
        "category": this.currentDate.toISOString().substr(0, 10),
        "column-1": 0
      }];
    });
  }

  displayChart(points) {
    this.chart = this.AmCharts.makeChart("chartdiv", {
      "type": "serial",
      "categoryField": "day",
      "startDuration": 1,
      "categoryAxis": {
        "gridPosition": "start"
      },
      "graphs": [
        {
          "balloonText": "[[title]] of [[category]]:[[value]]",
          "bullet": "round",
          "id": "AmGraph-1",
          "title": "graph 1",
          "valueField": "points"
        }
      ],
      "valueAxes": [
        {
          "id": "ValueAxis-1",
          "title": "Points"
        }
      ],
      "titles": [
        {
          "id": "Title-1",
          "size": 15,
          "text": "Sprint 1 Burndown Chart"
        }
      ],
      "dataProvider": [
        {
          "day": this.currentDate.toISOString().substr(0, 10),
          "points": points
        }
      ]
    });
  }
}
