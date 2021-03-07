import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpacexProgramService } from 'src/app/services/spacex-program.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.css']
})
export class LaunchListComponent implements OnInit {
  
  launchProgram = [];
  filters = null;
  params : any = {}
  launchYearFilter = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015' , '2016' , '2017' ,'2018' , '2019', '2020'];

  constructor(private spaceXService : SpacexProgramService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.filters = params;
      this.params = Object.assign(this.params,this.filters);
      this.getAllLaunches();
    });
  }

  getAllLaunches(){
    this.spaceXService.getLaunches().subscribe((res:any)=>{
      const updatedResults = this.manageResponse(res);
      if(Object.keys(this.filters).length >0){
        const array = this.filterData(updatedResults);
      }else{
        this.launchProgram = updatedResults;
      }
    })
  }

  manageResponse(res){
    for(let i=0; i<res.length;i++){
      if(res[i].static_fire_date_utc){
        res[i].years = new Date(res[i].static_fire_date_utc).getFullYear().toString();
      }else{
        res[i].years = null;
      }
      if(res[i].success != null){
        res[i].successfulLaunch = res[i].success.toString();
      }else{
        res[i].successfulLaunch = null;
      }
      if(res[i].cores && res[i].cores.length>0 && res[i].cores[0].landing_attempt){
        res[i].landingAttempt = res[i].cores[0].landing_attempt.toString();
      }else{
        res[i].landingAttempt = null;
      }
    }
    return res;
  }

  filterData(res){
    const array = _.filter(res,this.filters)
    this.updateUI();
    this.launchProgram = array;
  }

  updateUI(){
    for(let key in this.filters){
      let val : any = document.getElementById(key);
      let children : any = val.children;
      if(children){
        for(let i=0;i<children.length;i++){
          if(children[i].innerText.toLowerCase() == this.filters[key]){
            children[i].classList.add('active');
          }
        }
      }
    }
  }

  checkIfFilterExists(parentElem){
    let childElem : any = parentElem.children;
    for(let i = 0; i<childElem.length;i++){
      if(childElem[i].classList.contains('active')){
        childElem[i].classList.remove('active');
      }
    }
  }

  filterResults(event){
    let textKey = '';
    if(event && event.target && event.target.parentElement){
      let parentElem = event.target.parentElement;
      let elem = event.target;
      if(elem.classList.contains('active')){
        let id = parentElem.id;
        delete this.params[id];
        elem.classList.remove('active');
      }else{
        this.checkIfFilterExists(parentElem);
        elem.classList.add('active');
      }
      if(parentElem.classList.contains('years')){
        textKey = 'years';
      }else if(parentElem.classList.contains('successfulLaunch')){
        textKey = 'successfulLaunch';
      }else if(parentElem.classList.contains('landingAttempt')){
        textKey = 'landingAttempt';
      }else{
        return;
      }
      if(elem.classList.contains('active')){
        this.params[textKey] = elem.innerText.toLowerCase();
      }
    }
    this.router.navigate(['/space-programs'], { queryParams: this.params });
  }

}
