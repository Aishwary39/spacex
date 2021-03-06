import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpacexProgramService {

  getLaunchesUrl = "https://api.spacexdata.com/v4/launches";

  constructor(private http : HttpClient) { }

  getLaunches(){
    return this.http.get(this.getLaunchesUrl);
  }

}
