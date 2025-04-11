class DATimeError extends Error {
  static messages = {
    invalidData: 'Invalid data, must be a string or a number',
    invalidDataValue: 'Invalid data, must be a positive number',
    invalidDateFormat: 'Invalid data, date format must be DD/MM/Y:YY or DD-MM-Y:YY',
    mustBeDATime: 'Invalid data, must be an DATime instance',
  }

  constructor(message) {
    super(message);
    this.name = 'DATimeError';
  }
}

export default class DATime {
  static daysNb = 5;
  static daysName = ['Madon', 'Jondre', 'Vondre', 'Sabaton', 'Dimon'];
  static monthDays = [31, 30, 30, 31, 30, 30,  31, 30, 30, 31, 30, 31];
  static eraNames = {
    1: 'de la Divine',
    2: 'des Gloires',
    3: 'des Tours',
    4: 'du Noir',
    5: 'des Exaltés',
    6: "d'Acier",
    7: 'des Tempêtes',
    8: 'des Bontés',
    9: 'du Dragon',
  }
  static specialDay = { 31: 'Annum' };
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
  static yearDays = DATime.monthDays.reduce((acc, curr) => acc + curr, 0);

  constructor(data) {
    this.input = data ?? 1;
    if (typeof this.input === 'string') {
      this.parseInputString();
      this.autoSetTimestamp();
    } else if (typeof this.input === 'number') {
      if (this.input < 0) throw new DATimeError(DATimeError.messages.invalidDataValue);
      this.timestamp = this.input;
      this.autoSetYear();
      this.autoSetMonthAndDay();
    } else throw new DATimeError(DATimeError.messages.invalidData);
  }

  static getAge(birth, now) {
    if (!(birth instanceof DATime)) birth = new DATime(birth);
    if (!(now instanceof DATime)) now = new DATime(now);
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
      if (yearStr[0] === '9') formatted = '10:';
      else if (yearStr.length === 4) {
        formatted = `${+(yearStr[0] + yearStr[1]) + 1}:${yearStr[2]}${yearStr[3]}`;
      } else {
        formatted = `${+yearStr[0] + 1}:${yearStr[1]}${yearStr[2]}`;
      }
    }
    return formatted;
  }

  static getCalendar(year) {
    const byMonth = DATime.monthDays.map((dayNb, month) => (
      Array.from({ length: dayNb }).map((_, i) => {
        const date = new DATime(`${i + 1}/${month + 1}/${year}`);
        return {
          timestamp: date.timestamp,
          date: date.formatDateReadable(),
          format: date.formatDate(),
          dayName: date.getDayName(),
          monthName: date.getMonthName(),
          yearName: year,
          eraName: date.getEraName(),
          day: date.day,
          month: date.month,
          year: date.year,
        }
      })
    ));
    return {
      byMonth: byMonth,
      byDay: byMonth.flat(),
    }
  }

  getEraName() {
    const yearStr = this.year.toString();
    let century;
    if (this.year < 100) century = 1;
    else if (yearStr[0] === '9') century = 10;
    else if (yearStr.length === 4) century = +(yearStr[0] + yearStr[1]) + 1;
    else century = +yearStr[0] + 1;
    return DATime.eraNames[century] ?? 'du Futur';
  }

  parseInputString() {
    let splitted;
    if (this.input.includes('/')) splitted = this.input.split('/');
    else if (this.input.includes('-')) splitted = this.input.split('-');
    else throw new DATimeError(DATimeError.messages.invalidDateFormat);
    if (splitted.length !== 3) throw new DATimeError(DATimeError.messages.invalidDateFormat);
    this.day = +splitted[0];
    this.month = +splitted[1];
    this.year = DATime.convertYearStringToNumber(splitted[2]);
  }

  autoSetYear() {
    this.year = Math.floor(this.timestamp / DATime.yearDays);
  }

  autoSetMonthAndDay() {
    this._daysRestInCurrentYear = this.timestamp - (this.year * DATime.yearDays);
    let month;
    this.day = DATime.monthDays.reduce((acc, curr, i) => {
      if (acc > curr) return acc - curr;
      if (!month) month = i + 1;
      return acc;
    }, this._daysRestInCurrentYear);
    this.month = month;
  }

  formatDate({ separator = '/' } = {}) {
    return `${this.day}${separator}${this.month}${separator}${DATime.convertYearToString(this.year)}`;
  }
  
  formatDateReadable() {
    return `${this.getDayName()} ${this.day} ${this.getMonthName()} ${DATime.convertYearToString(this.year)} ${this.getEraName()}`;
  }
  
  autoSetTimestamp() {
    if (this.timestamp) return this.timestamp;
    this.timestamp = this.year * DATime.yearDays;
    Array.from({ length: this.month - 1 }).forEach((_, i) => {
      this.timestamp += DATime.monthDays[i];
    })
    this.timestamp += this.day;
    return this.timestamp;
  }

  getDayName() {
    if (DATime.specialDay[this.day]) return DATime.specialDay[this.day];
    const dayOfWeek = this.day % DATime.daysNb;
    return DATime.daysName[dayOfWeek ? dayOfWeek - 1 : DATime.daysNb - 1];
  }

  getMonthName() {
    return DATime.monthNames[this.month - 1];
  }

  subtract(n, unit = 'day') {
    switch (unit) {
      case 'month':
        return new DATime(this.timestamp - (n * DATime.monthDays[this.month - 1]));
      case 'year':
        return new DATime(this.timestamp - (n * DATime.yearDays));
      case 'day':
      default:
        return new DATime(this.timestamp - n);
    }
  }

  add(n, unit = 'day') {
    switch (unit) {
      case 'month':
        return new DATime(this.timestamp + (n * DATime.monthDays[this.month - 1]));
      case 'year':
        return new DATime(this.timestamp + (n * DATime.yearDays));
      case 'day':
      default:
        return new DATime(this.timestamp + n);
    }
  }
}
