export class DateManipulations {
  static getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear()
      + '/' + DateManipulations.formatNumberTo2Digits( (now.getUTCMonth() + 1))
      + '/' +  DateManipulations.formatNumberTo2Digits(now.getUTCDate());
    const time =  DateManipulations.formatNumberTo2Digits(now.getUTCHours())
      + '/' +  DateManipulations.formatNumberTo2Digits(now.getUTCMinutes())
      + '/' +  DateManipulations.formatNumberTo2Digits(now.getUTCSeconds());

    return (date + '/' + time);
  }

  private static formatNumberTo2Digits(num): string {
    return ('0' + num).slice(-2);
  }

  private static getTimeStampOld() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();

    return (date + ' ' + time);
  }
}
