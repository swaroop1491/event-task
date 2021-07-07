import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL MODULE
import { AppMaterialModule } from '../app-material.module';

// COMPONENTS
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [ HeaderComponent ],
    imports: [ CommonModule, AppMaterialModule ],
    exports: [ HeaderComponent ]
})
export class CoreModule {}
