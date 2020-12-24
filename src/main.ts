import { enableProdMode } 			from '@angular/core';
import { platformBrowserDynamic }	from '@angular/platform-browser-dynamic';

import { AppModule }				from './app/app.module';
import { environment }				from './environments/environment';
import { NgbdDatepickerI18n } 		from './app/datepicker-i18n/datepicker-i18n';

if(environment.production){
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

platformBrowserDynamic().bootstrapModule(NgbdDatepickerI18n).then(ref => {
	// Ensure Angular destroys itself on hot reloads.
	if(window['ngRef']){
		window['ngRef'].destroy();
	}
	window['ngRef'] = ref;

	// Otherwise, log the boot error
}).catch(err => console.error(err));
