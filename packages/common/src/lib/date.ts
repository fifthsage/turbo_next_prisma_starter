import dayjs, { OpUnitType, QUnitType } from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale("ko");
dayjs.tz.setDefault("Asia/Seoul");

export { dayjs };

export function diff(value: Date, unit: QUnitType | OpUnitType = "hours") {
  return dayjs(value).diff(new Date(), unit, true);
}

export function diffAfter(
  value: Date,
  target: number,
  unit: QUnitType | OpUnitType = "hours",
) {
  return diff(value, unit) > target;
}

export function diffWithin(
  value: Date,
  target: number,
  unit: QUnitType | OpUnitType = "hours",
) {
  return diff(value, unit) <= target;
}

export function checkClosed(value: Date) {
  return dayjs(value).isBefore(new Date(), "date");
}

export function compareDateTime(
  compare: string | Date,
  target: string | Date,
  format: string = "YYYYMMDDTHHmmss",
) {
  return dayjs(target).format(format) === dayjs(compare).format(format);
}

export const formatDuration = (seconds: number): string => {
  const d = dayjs.duration(seconds, "seconds");

  if (seconds >= 3600 && seconds % 3600 > 0) {
    return d.format("H시간 m분");
  }
  if (seconds >= 3600) {
    return d.format("H시간");
  }
  if (seconds >= 60 && seconds % 60 > 0) {
    return d.format("m분");
  }
  if (seconds >= 60) {
    return d.format("m분 s초");
  }
  return d.format("s초");
};
