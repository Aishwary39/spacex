import { Component, OnInit } from '@angular/core';
import { SpacexProgramService } from 'src/app/services/spacex-program.service';

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.css']
})
export class LaunchListComponent implements OnInit {
  
  launchProgram = [];
  launchYearFilter = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015' , '2016' , '2017' ,'2018' , '2019', '2020'];

  constructor(private spaceXService : SpacexProgramService) { }

  ngOnInit() {
    this.spaceXService.getLaunches().subscribe((res:any)=>{
      this.launchProgram = res;
      console.log(this.launchProgram);
    })
  }

}
