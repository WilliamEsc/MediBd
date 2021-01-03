import { BrowserModule }			 from '@angular/platform-browser';
import { NgModule }					 from '@angular/core';
import { FormsModule }				 from '@angular/forms';
import { HttpClientModule } 		 from '@angular/common/http';
import { AppComponent }				 from './app.component';
import { NgbModule }				 from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerI18n }		 from './datepicker-i18n/datepicker-i18n';
import { NgBootstrapDarkmodeModule } from 'ng-bootstrap-darkmode';

import { HeaderComponent }			 from './header/header.component';
import { FooterComponent }			 from './footer/footer.component';
import { RechercheComponent }		 from './recherche/recherche.component';
import { RechercheAvanceeComponent } from './recherche-avancee/recherche-avancee.component';
import { DonneesService }			 from './donnees.service';
import { AppAreaChartComponent } 	 from './app-area-chart/app-area-chart.component';
import { ResultatComponent } from './resultat/resultat.component';
import { BodyComponent } from './body/body.component';
import { AnalysesComponent } from './analyses/analyses.component';
import { ForceDirectedGraphComponent } from './force-directed-graph/force-directed-graph.component';
import { ZoomableCirclePackingComponent } from './zoomable-circle-packing/zoomable-circle-packing.component';
import { PieComponent } from './pie/pie.component';
import { StackedBarComponent } from './stacked-bar/stacked-bar.component';
import { ListeMedicamentLaboComponent } from './liste-medicament-labo/liste-medicament-labo.component';
import { ListeLaboComponent } from './liste-labo/liste-labo.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		RechercheComponent,
		RechercheAvanceeComponent,NgbdDatepickerI18n, AppAreaChartComponent, ResultatComponent, BodyComponent, AnalysesComponent, ForceDirectedGraphComponent, ZoomableCirclePackingComponent, PieComponent, StackedBarComponent, ListeMedicamentLaboComponent, ListeLaboComponent
	],
	imports: [
		BrowserModule,
		NgbModule,
		FormsModule,
		HttpClientModule,
		NgBootstrapDarkmodeModule,
	],
	providers: [DonneesService],
	bootstrap: [AppComponent]
})
export class AppModule{}
