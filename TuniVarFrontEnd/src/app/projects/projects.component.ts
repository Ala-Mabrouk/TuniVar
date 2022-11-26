import { Component, OnInit } from '@angular/core';
import { ServiceProjectService } from '../Services/service-project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  listAllProject:any
  constructor(private projectService:ServiceProjectService) { }




  ngOnInit(): void {
    this.initData()
  }


  initData() {
    this.projectService.getAllProject().subscribe((res: any) => {
      this.listAllProject = res;
      console.log(res);
    });
  }


}
