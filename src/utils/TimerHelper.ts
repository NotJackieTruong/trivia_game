import R from '#assets';

/**
 *
 * @param {*} timeStamp
 * DD/MM/YYYY
 */

export function convertTimeStampToString(timeStamp: string | number) {
  const MyDate = new Date(timeStamp);
  return `${`0${MyDate.getDate()}`.slice(-2)}/${`0${MyDate.getMonth() + 1}`.slice(-2)}/${MyDate.getFullYear()}`;
}
/**
 *
 * @param {*} timeStamp
 * YYYY-MM-DD
 */
export function convertTimeStampToString2(timeStamp: string | number) {
  const MyDate = new Date(timeStamp);
  return `${MyDate.getFullYear()}-${`0${MyDate.getMonth() + 1}`.slice(-2)}-${`0${MyDate.getDate()}`.slice(-2)}`;
}

export function getDayOfWeek(day: number) {
  return [
    R.strings().date_sunday,
    R.strings().date_monday,
    R.strings().date_tuesday,
    R.strings().date_wednesday,
    R.strings().date_thursday,
    R.strings().date_friday,
    R.strings().date_saturday
  ][day];
}
export function getSubDayOfWeek(day: number) {
  return ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][day];
}

export function convertDateTimeToString(day: string | number) {
  const d = new Date(day);
  const date = `${`0${d.getDate()}`.slice(-2)}-${`0${d.getMonth() + 1}`.slice(-2)}-${d.getFullYear()}`;
  const time = `${d.getHours()}:${`0${d.getMinutes()}`.slice(-2)}`;
  return {
    date,
    time
  };
}

export function convertDateTimeToString2(day: string | number) {
  const d = new Date(day);
  const date = `${`0${d.getDate()}`.slice(-2)}/${`0${d.getMonth() + 1}`.slice(-2)}/${d.getFullYear()}`;
  const time = `${d.getHours()}:${`0${d.getMinutes()}`.slice(-2)}`;
  const year = d.getFullYear();
  return {
    date,
    time,
    dayOfWeek: getDayOfWeek(d.getDay()),
    year,
    dateTimeStr: `${time} ${date}`
  };
}

export function getCurrentTime() {
  const d = new Date();
  const date = `${`0${d.getDate()}`.slice(-2)}/${`0${d.getMonth() + 1}`.slice(-2)}/${d.getFullYear()}`;
  const time = `${d.getHours()}:${`0${d.getMinutes()}`.slice(-2)}`;
  return {
    date,
    time,
    dayOfWeek: getDayOfWeek(d.getDay())
  };
}

export function convertDateTimeToString3(day: string | number) {
  const d = new Date(day);
  const date = `${`0${d.getDate()}`.slice(-2)}/${`0${d.getMonth() + 1}`.slice(-2)}`;
  const time = `${d.getHours()}:${`0${d.getMinutes()}`.slice(-2)}`;
  return {
    date,
    time,
    dayOfWeek: getDayOfWeek(d.getDay())
  };
}

/**
 *
 * @param date 30/04/2021
 * @returns 12321321321
 */

export function convertStringToTimeStamp(date: string) {
  if (!date) {
    return '';
  }
  const arr = date.split('/');
  const newDate = `${arr[2]}/${arr[1]}/${arr[0]}`;
  return new Date(newDate).getTime() / 1000;
}

export function convertTimeStringToTimeTemplate(date: string) {
  if (!date) {
    return '';
  }
  const arr = date.split('/');
  return `${arr[1]}/${arr[0]}/${new Date().getFullYear()}`;
}

export function convertTimeStringToTimeTemplate2(date: string) {
  if (!date) {
    return '';
  }
  const arr = date.split('/');
  return `${new Date().getFullYear()}/${arr[1]}/${arr[0]}`;
}

export function getMinusTime(dateVal: any) {
  const date = `${dateVal}`;
  const date1 = new Date(date).getTime();
  const currentDate = new Date().getTime();
  let difference = Math.abs(date1 - currentDate);
  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  const minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  // const secondsDifference = Math.floor(difference / 1000);
  if (daysDifference > 0 && daysDifference < 32) {
    return `${daysDifference} ${R.strings().day_ago}`;
  } else if (daysDifference > 31) {
    const newDate = new Date(date1);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return `${day}/${month}/${year}`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference} ${R.strings().date_hour_ago}`;
  } else if (minutesDifference) {
    return `${minutesDifference} ${R.strings().date_minute_ago}`;
  }
  return R.strings().date_just_now;
}
