class XDateError extends Error {
  static messages = {
    invalidData: 'Invalid data, must be a string or a number',
    invalidDataValue: 'Invalid data, must be a positive number',
    invalidDateFormat: 'Invalid data, date format must be DD/MM/YYYY or DD-MM-YYYY',
    mustBeXDate: 'Invalid data, must be an XDate instance',
  }

  constructor(message) {
    super(message);
    this.name = 'XDateError';
  }
}

export default class XDate {
  static daysNb = 5;
  static daysName = ['Madon', 'Jondre', 'Vondre', 'Sabaton', 'Dimon'];
  static monthDays = [31, 30, 30, 31, 30, 30,  31, 30, 30, 31, 30, 31];
  static monthNames = [
    'Marchiver',
    'Gardien',
    'Drakonis',
    'Longnuage',
    'Floraison',
    'Justinien',
    'Réconfort',
    'Auguste',
    'Voiréale',
    'Vendangien',
    'Primeneige',
    'Tollecourse',
  ];
  static yearDays = XDate.monthDays.reduce((acc, curr) => acc + curr, 0);

  constructor(data) {
    this.input = data ?? 1;
    if (typeof this.input === 'string') {
      this.parseInputString();
      this.autoSetTimestamp();
    } else if (typeof this.input === 'number') {
      if (this.input < 0) throw new XDateError(XDate.messages.invalidDataValue);
      this.timestamp = this.input;
      this.autoSetYear();
      this.autoSetMonthAndDay();
    } else throw new XDateError(XDate.messages.invalidData);
  }

  static getAge(birth, now) {
    if (!birth instanceof XDate || !now instanceof XDate) throw new XDateError(XDate.messages.mustBeXDate);
    let age = now.year - birth.year;
    // If the birth date is not yet this year
    if (now.month < birth.month || (now.month === birth.month && now.day < birth.day)) age--;
    return age;
  }

  static convertYearStringToNumber(yearString) {
    const [centuryStr, yearStr] = yearString.split(':');
    const century = +centuryStr - 1;
    const year = +yearStr;
    return (century * 100) + year;
  }

  static convertYearToString(year) {
    let formatted = '';
    if (year < 100) {
      formatted = '1:';
      if (year < 10) formatted += `0${year}`;
      else formatted += `${year}`;
    } else {
      const yearStr = year.toString();
      formatted = `${+yearStr[0] + 1}:${yearStr[1]}${yearStr[2]}`;
    }
    return formatted;
  }

  parseInputString() {
    let splitted;
    if (this.input.includes('/')) splitted = this.input.split('/');
    else if (this.input.includes('-')) splitted = this.input.split('-');
    else throw new XDateError(XDate.messages.invalidDateFormat);
    if (splitted.length !== 3) throw new XDateError(XDate.messages.invalidDateFormat);
    this.day = +splitted[0];
    this.month = +splitted[1];
    this.year = XDate.convertYearStringToNumber(splitted[2]);
  }

  autoSetYear() {
    this.year = Math.floor(this.timestamp / XDate.yearDays);
  }

  autoSetMonthAndDay() {
    this._daysRestInCurrentYear = this.timestamp - (this.year * XDate.yearDays);
    let month;
    this.day = XDate.monthDays.reduce((acc, curr, i) => {
      if (acc > curr) return acc - curr;
      if (!month) month = i + 1;
      return acc;
    }, this._daysRestInCurrentYear);
    this.month = month;
  }

  formatDate({ separator = '/' } = {}) {
    return `${this.day}${separator}${this.month}${separator}${XDate.convertYearToString(this.year)}`;
  }
  
  formatDateReadable() {
    return `${this.getDayName()} ${this.day} ${this.getMonthName()} ${XDate.convertYearToString(this.year)}`;
  }
  
  autoSetTimestamp() {
    if (this.timestamp) return this.timestamp;
    this.timestamp = this.year * XDate.yearDays;
    Array.from({ length: this.month - 1 }).forEach((_, i) => {
      this.timestamp += XDate.monthDays[i];
    })
    this.timestamp += this.day;
    return this.timestamp;
  }

  getDayName() {
    return XDate.daysName[(this.day % XDate.daysNb) - 1];
  }

  getMonthName() {
    return XDate.monthNames[this.month - 1];
  }
}