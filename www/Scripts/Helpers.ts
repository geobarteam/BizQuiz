module Helpers{

    export class DateHelper
    {
        public static MonthNames: string[] = ['January', 'February', 'March', 'April', 'May', 
            'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        public static MonthShortNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        public static DayOfWeekNames: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
            'Thursday', 'Friday', 'Saturday'];
        public static DayOfWeekShortNames: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        
        public static DaysInMonth(iMonth, iYear): number
        {
            return 32 - new Date(iYear, iMonth, 32).getDate();
        }

        public static toShortDate(date: Date): string
        {
            return date.getDate().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getFullYear().toString();
        }

        public static toLongDate(date: Date): string
        {
            return MonthNames[date.getMonth()] + ' ' + date.getDate().toString() + ', ' + 
                date.getFullYear().toString();
        }

        public static toShortDisplayDate(date: Date): string
        {
            return  date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' +
                date.getFullYear().toString();
        }
    } 
}