import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ComponentsComponent } from './app/components/components.component';

bootstrapApplication(ComponentsComponent, appConfig).catch((err) =>
  console.error(err)
);
