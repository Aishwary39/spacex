import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpacexProgramService } from 'src/app/services/spacex-program.service';

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
      this.getAllLaunches();
    });
  }

  getAllLaunches(){
    this.spaceXService.getLaunches().subscribe((res:any)=>{
      if(Object.keys(this.filters).length >0){
        const array = this.filterData(res);
        console.log(array);
      }else{
        this.launchProgram = res;
      }
      console.log(this.launchProgram);
    })
  }

  filterData(res){
    const filterKeys = Object.keys(this.filters);





    // this.launchProgram = res.filter(item=>{

    //   // let year;
    //   // if(item.static_fire_date_utc){
    //   //   year = new Date(item.static_fire_date_utc).getFullYear();
    //   // }else{
    //   //   year = null;
    //   // }
    //   // let landing;
    //   // if(item.cores && item.cores[0].landing_attempt){
    //   //   landing = item.cores[0].landing_attempt;
    //   // }else{
    //   //   landing = null;
    //   // }
    //   // if(this.filters['years'] && this.filters['launch'] && this.filters['landing']){
    //   //   return (year && year.toString() == this.filters.years) && (landing && landing.toString().toLowerCase() == this.filters.landing.toLowerCase())
    //   // }
    // })
   // console.log(this.launchProgram);
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
        elem.classList.remove('active');
      }else{
        this.checkIfFilterExists(parentElem);
        elem.classList.add('active');
      }
      if(parentElem.classList.contains('years')){
        textKey = 'static_fire_date_utc';
      }else if(parentElem.classList.contains('launch')){
        textKey = 'success';
      }else if(parentElem.classList.contains('landing')){
        textKey = 'landing_attempt';
      }else{
        return;
      }
      this.params[textKey] = elem.innerText;
    }
    this.router.navigate(['/space-programs'], { queryParams: this.params });
  }

}
