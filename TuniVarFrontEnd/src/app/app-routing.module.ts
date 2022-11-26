import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinishedProjectsComponent } from './finished-projects/finished-projects.component';
import { HomeComponent } from './home/home.component';
import { LogInSignUpComponent } from './log-in-sign-up/log-in-sign-up.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestComponent },

  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:Pid', component: ProjectComponent },
  { path: 'login', component: LogInSignUpComponent },
  { path: 'finished', component: FinishedProjectsComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
