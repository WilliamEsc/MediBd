import { Component, Injectable } 														  from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
	'fr': {
		weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
		months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
	}
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also use the Angular LOCALE_ID value
@Injectable()
export class I18n{
	language = 'fr';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
	constructor(private _i18n: I18n) {
		super();
	}

	getWeekdayShortName(weekday: number): string {
		return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
	}
	getMonthShortName(month: number): string {
		return I18N_VALUES[this._i18n.language].months[month - 1];
	}
	getMonthFullName(month: number): string {
		return this.getMonthShortName(month);
	}

	getDayAriaLabel(date: NgbDateStruct): string {
		return `${date.day}-${date.month}-${date.year}`;
	}
}

@Component({
	selector: 'ngbd-datepicker-i18n',
	templateUrl: './datepicker-i18n.html',
	providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}],// define custom NgbDatepickerI18n provider
	styleUrls: ['./datepicker-i18n.scss']
})
export class NgbdDatepickerI18n{
	model: NgbDateStruct;
	hoveredDate: NgbDate | null = null;

	fromDate: NgbDate | null;
	toDate: NgbDate | null;

	constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter){
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}

	onDateSelection(date: NgbDate){
		if(!this.fromDate && !this.toDate){
			this.fromDate = date;
		}else if(this.fromDate && !this.toDate && date && date.after(this.fromDate)){
			this.toDate = date;
		}else{
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate){
		return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
	}

	isInside(date: NgbDate){
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate){
		return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}
}