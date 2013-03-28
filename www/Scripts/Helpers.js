var Helpers;
(function (Helpers) {
    var DateHelper = (function () {
        function DateHelper() { }
        DateHelper.MonthNames = [
            'January', 
            'February', 
            'March', 
            'April', 
            'May', 
            'June', 
            'July', 
            'August', 
            'September', 
            'October', 
            'November', 
            'December'
        ];
        DateHelper.MonthShortNames = [
            'Jan', 
            'Feb', 
            'Mar', 
            'Apr', 
            'May', 
            'Jun', 
            'Jul', 
            'Aug', 
            'Sep', 
            'Oct', 
            'Nov', 
            'Dec'
        ];
        DateHelper.DayOfWeekNames = [
            'Sunday', 
            'Monday', 
            'Tuesday', 
            'Wednesday', 
            'Thursday', 
            'Friday', 
            'Saturday'
        ];
        DateHelper.DayOfWeekShortNames = [
            'Su', 
            'Mo', 
            'Tu', 
            'We', 
            'Th', 
            'Fr', 
            'Sa'
        ];
        DateHelper.DaysInMonth = function DaysInMonth(iMonth, iYear) {
            return 32 - new Date(iYear, iMonth, 32).getDate();
        };
        DateHelper.toShortDate = function toShortDate(date) {
            return date.getDate().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getFullYear().toString();
        };
        DateHelper.toLongDate = function toLongDate(date) {
            return DateHelper.MonthNames[date.getMonth()] + ' ' + date.getDate().toString() + ', ' + date.getFullYear().toString();
        };
        DateHelper.toShortDisplayDate = function toShortDisplayDate(date) {
            return date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString();
        };
        return DateHelper;
    })();
    Helpers.DateHelper = DateHelper;    
})(Helpers || (Helpers = {}));
