/**
 * Pure-JS Jalali (Persian) <-> Gregorian calendar math.
 * No external dependencies — everything reduces to a shared "jdn"
 * (day-index) so the two calendar systems can be swapped mid-selection
 * without losing the underlying day.
 */

export type CalendarSystem = "jalali" | "gregorian";

export interface JalaliDate {
  jy: number;
  jm: number; // 1-12
  jd: number; // 1-31
}

export interface GregorianDate {
  gy: number;
  gm: number; // 1-12
  gd: number; // 1-31
}

const div = (a: number, b: number) => Math.trunc(a / b);
const mod = (a: number, b: number) => a - Math.trunc(a / b) * b;

// Break points of the 33-year arithmetic Jalali leap cycle.
const BREAKS = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097,
  2192, 2262, 2324, 2394, 2456, 3178,
];

function jalCal(jy: number) {
  const bl = BREAKS.length;
  const gy = jy + 621;
  let leapJ = -14;
  let jp = BREAKS[0];
  let jump = 0;
  for (let i = 1; i < bl; i += 1) {
    const jm = BREAKS[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }
  let n = jy - jp;
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  const march = 20 + leapJ - leapG;
  if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
  let leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) leap = 4;
  return { leap: leap === 1, gy, march };
}

function g2d(gy: number, gm: number, gd: number) {
  let d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return d;
}

function d2g(jdn: number): GregorianDate {
  let j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const i = div(mod(j, 1461), 4) * 5 + 308;
  const gd = div(mod(i, 153), 5) + 1;
  const gm = mod(div(i, 153), 12) + 1;
  const gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return { gy, gm, gd };
}

export function jalaliToJdn(jy: number, jm: number, jd: number): number {
  const r = jalCal(jy);
  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}

export function jdnToJalali(jdn: number): JalaliDate {
  const gy = d2g(jdn).gy;
  let jy = gy - 621;
  const r = jalCal(jy);
  const jdn1f = g2d(gy, 3, r.march);
  let k = jdn - jdn1f;
  if (k >= 0) {
    if (k <= 185) {
      return { jy, jm: 1 + div(k, 31), jd: mod(k, 31) + 1 };
    }
    k -= 186;
  } else {
    jy -= 1;
    k += 179;
    if (r.leap) k += 1;
  }
  return { jy, jm: 7 + div(k, 30), jd: mod(k, 30) + 1 };
}

export function gregorianToJdn(gy: number, gm: number, gd: number): number {
  return g2d(gy, gm, gd);
}

export function jdnToGregorian(jdn: number): GregorianDate {
  return d2g(jdn);
}

export function gregorianToJalali(gy: number, gm: number, gd: number): JalaliDate {
  return jdnToJalali(g2d(gy, gm, gd));
}

export function jalaliToGregorian(jy: number, jm: number, jd: number): GregorianDate {
  return d2g(jalaliToJdn(jy, jm, jd));
}

export function isJalaliLeapYear(jy: number): boolean {
  return jalCal(jy).leap;
}

export function jalaliMonthLength(jy: number, jm: number): number {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return isJalaliLeapYear(jy) ? 30 : 29;
}

function isGregorianLeapYear(gy: number): boolean {
  return (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0;
}

export function gregorianMonthLength(gy: number, gm: number): number {
  const lengths = [31, isGregorianLeapYear(gy) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return lengths[gm - 1];
}

/** 0 = Saturday ... 6 = Friday (Iran week order). */
export function weekdayIndex(jdn: number): number {
  return mod(jdn + 2, 7);
}

export function todayJdn(): number {
  const now = new Date();
  return gregorianToJdn(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export const JALALI_MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
];

export const GREGORIAN_MONTHS_FA = [
  "ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن",
  "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر",
];

export const WEEKDAY_LABELS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
export const WEEKDAY_LABELS_FULL = [
  "شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه",
];

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

export function toLatinDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

/** Formats as the app's canonical storage string, e.g. "۱۴۰۵/۰۵/۲۴". */
export function formatJalaliString(jy: number, jm: number, jd: number): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return toPersianDigits(`${jy}/${pad(jm)}/${pad(jd)}`);
}

/** Parses either Persian- or Latin-digit "YYYY/MM/DD" into a JalaliDate. */
export function parseJalaliString(value: string): JalaliDate | null {
  const latin = toLatinDigits(value.trim());
  const match = latin.match(/^(\d{3,4})[/-](\d{1,2})[/-](\d{1,2})$/);
  if (!match) return null;
  const jy = Number(match[1]);
  const jm = Number(match[2]);
  const jd = Number(match[3]);
  if (jm < 1 || jm > 12 || jd < 1 || jd > jalaliMonthLength(jy, jm)) return null;
  return { jy, jm, jd };
}

export function formatJalaliLabel(jy: number, jm: number, jd: number): string {
  return `${toPersianDigits(jd)} ${JALALI_MONTHS[jm - 1]} ${toPersianDigits(jy)}`;
}

export function formatGregorianLabel(gy: number, gm: number, gd: number): string {
  return `${toPersianDigits(gd)} ${GREGORIAN_MONTHS_FA[gm - 1]} ${toPersianDigits(gy)}`;
}

/** Short "day month" label for compact chips, no year. */
export function formatShortLabel(jdn: number, system: CalendarSystem): string {
  if (system === "jalali") {
    const { jy, jm, jd } = jdnToJalali(jdn);
    return `${toPersianDigits(jd)} ${JALALI_MONTHS[jm - 1]}`;
  }
  const { gm, gd } = jdnToGregorian(jdn);
  return `${toPersianDigits(gd)} ${GREGORIAN_MONTHS_FA[gm - 1]}`;
}

/** "day month year" label, always in Jalali (the app's canonical display calendar). */
export function formatFullLabel(jdn: number): string {
  const { jy, jm, jd } = jdnToJalali(jdn);
  return formatJalaliLabel(jy, jm, jd);
}

export function jdnFromValueString(value: string): number | null {
  const parsed = parseJalaliString(value);
  if (!parsed) return null;
  return jalaliToJdn(parsed.jy, parsed.jm, parsed.jd);
}

export function valueStringFromJdn(jdn: number): string {
  const { jy, jm, jd } = jdnToJalali(jdn);
  return formatJalaliString(jy, jm, jd);
}
