import { useState } from 'react';
import './DateInput.css';
import dateLogo from '../../assets/date.svg';
import arrowUp from '../../assets/Arrow-up.svg';
import arrowDown from '../../assets/Arrow-down.svg';
import { Controller } from 'react-hook-form';
import { DateInputProps, DateItem } from '../../types/form.types';

function DateInput({ name, label = "თარიღანი", control, required = false }: DateInputProps) {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const months = [
    'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
    'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
  ];

  const getDaysInMonth = (year: number, month: number): number => (new Date(year, month + 1, 0).getDate());
  const getMonthName = (date: Date): string => (`${months[date.getMonth()]} ${date.getFullYear()}`);

  const getPreviousMonthDays = (year: number, month: number): DateItem[] => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysFromPrevMonth = firstDay === 0 ? 6 : firstDay - 1;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

    const days: DateItem[] = [];
    for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
      days.push({
        day: i,
        month: prevMonth,
        year: prevMonthYear,
        isCurrentMonth: false
      });
    }
    return days;
  };

  const getCurrentMonthDays = (year: number, month: number): DateItem[] => {
    const daysInMonth = getDaysInMonth(year, month);
    const days: DateItem[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: month,
        year: year,
        isCurrentMonth: true
      });
    }
    return days;
  };

  const getNextMonthDays = (year: number, month: number, totalDaysShown: number): DateItem[] => {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    const days: DateItem[] = [];

    const daysNeeded = 42 - totalDaysShown;

    for (let i = 1; i <= daysNeeded; i++) {
      days.push({
        day: i,
        month: nextMonth,
        year: nextMonthYear,
        isCurrentMonth: false
      });
    }
    return days;
  };

  const generateCalendarDays = (): DateItem[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const today = new Date();

    const previousMonthDays = getPreviousMonthDays(year, month);
    const currentMonthDays = getCurrentMonthDays(year, month);
    const nextMonthDays = getNextMonthDays(year, month, previousMonthDays.length + currentMonthDays.length);

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays].map(day => {
      const dayDate = new Date(day.year, day.month, day.day);
      return {
        ...day,
        isDisabled: dayDate < today
      };
    });
  };

  const goToPreviousMonth = (): void => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(prevMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const goToNextMonth = (): void => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(prevMonth.getMonth() + 1);
      return newMonth;
    });
  };

  const formatDate = (date: Date): string => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const isSelected = (day: number, month: number, year: number, value: string | null): boolean => {
    if (!value) return false;
    const date = new Date(value);
    return date.getDate() === day &&
           date.getMonth() === month &&
           date.getFullYear() === year;
  };

  return (
    <div className="date-picker-container">
      <div className="date-picker-label">{label} {required && <span className="required">*</span>}</div>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field: { onChange, value } }) => (
          <>
            <div
              className="date-input-wrapper"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <input
                type="text"
                readOnly
                className="date-input"
                placeholder="DD/MM/YYYY"
                value={value ? formatDate(new Date(value)) : ''}
              />
              <div className="calendar-icon">
                <img className="icon" src={dateLogo} alt="Calendar" />
              </div>
            </div>
            {showCalendar && (
              <div className="calendar-dropdown">
                <div className="calendar-content">
                  <div className="month-navigation">
                    <div className="month-year">{getMonthName(currentMonth)}</div>
                    <div className="navigation-buttons">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToPreviousMonth();
                        }}
                        className="nav-button"
                      >
                        <img className="nav-icon" src={arrowUp} alt="Previous month" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToNextMonth();
                        }}
                        className="nav-button"
                      >
                        <img className="nav-icon" src={arrowDown} alt="Next month" />
                      </button>
                    </div>
                  </div>
                  <div className="weekday-header">
                    {dayNames.map((day, index) => (
                      <div key={index} className="day-name">{day}</div>
                    ))}
                  </div>
                  <div className="calendar-grid">
                    {generateCalendarDays().map((dateObj, index) => (
                      <div
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (dateObj.isDisabled) return;
                          const newDate = new Date(dateObj.year, dateObj.month, dateObj.day);
                          onChange(newDate.toISOString());
                          setShowCalendar(false);
                        }}
                        className={`calendar-day ${!dateObj.isCurrentMonth ? 'other-month' : ''} ${value && isSelected(dateObj.day, dateObj.month, dateObj.year, value) ? 'selected' : ''} ${dateObj.isDisabled ? 'disabled' : ''}`}
                      >
                        {dateObj.day}
                      </div>
                    ))}
                  </div>
                  <div className="calendar-actions">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCalendar(false);
                      }}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCalendar(false);
                      }}
                      className="ok-button"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}

export default DateInput;
