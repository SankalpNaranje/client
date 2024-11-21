import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import ArticleIcon from '@mui/icons-material/Article';

const initialValue = dayjs(); // Set this to your desired initial value

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  // Check if the current day (with full date info) is in the highlightedDays array
  const isSelected =
    !outsideCurrentMonth &&
    highlightedDays.some((highlightedDay) =>
      day.isSame(highlightedDay, 'day')
    );

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <ArticleIcon /> : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        sx={{
          color: 'white', // Set text color to white for all days
          ...(isSelected && {
            backgroundColor: '#bd66f1', // Background color for highlighted days (adjust as needed)
          }),
        }}
      />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  

  const fetchHighlightedDays = async (date) => {
    const controller = new AbortController();
    try {
      const res = await axios.get('http://localhost:8800/get-exam', {
        signal: controller.signal,
      });
      const dates = res.data.map((exam) =>
        dayjs(exam.examdate.trim(), 'YYYY-MM-DD')
      );
      setHighlightedDays(dates); // Store the full date objects
      
      setIsLoading(false);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching exam dates:', error);
      }
    }
    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
        sx={{
          // Set the styles for the calendar itself, including days and arrows
          '.MuiPickersDay-root': {
            color: 'white', // All days text color
          },
          '.MuiIconButton-root': {
            color: 'white', // Arrows color
          },
          '.MuiPickersArrowSwitcher-root button': {
            color: 'white', // Navigation arrows color
          },
          '.MuiDayCalendar-weekDayLabel': {
            color: 'white', // Day labels (S, M, T, W, etc.) text color
          },
        }}
      />
    </LocalizationProvider>
  );
}
