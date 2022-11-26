import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProjectService } from '../Services/service-project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectDetails:any
  constructor(private projectService:ServiceProjectService,private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.initData()
  }
  initData() {
    let idP = this.route.snapshot.params['Pid'];
    this.projectService.getProjectDetails(idP).subscribe((res: any) => {
      this.projectDetails = res;
      console.log(res);
    });}

}
