function calculateAge() {
    // 1) Select input fields
    let dayInput   = document.querySelector('.day input');
    let monthInput = document.querySelector('.month input');
    let yearInput  = document.querySelector('.year input');
  
    // 2) Select parent containers
    let dayContainer   = document.querySelector('.day');
    let monthContainer = document.querySelector('.month');
    let yearContainer  = document.querySelector('.year');
  
    // 3) Select error paragraphs
    let dayError   = document.querySelector('.day .error');
    let monthError = document.querySelector('.month .error');
    let yearError  = document.querySelector('.year .error');
  
    // 4) Select output spans (years, months, days)
    let outputSpans = document.querySelectorAll('.output h2 span');
  
    // 5) Clear previous errors and reset outputs
    dayError.textContent   = '';
    monthError.textContent = '';
    yearError.textContent  = '';
  
    // Remove .error-state from containers in case they were set previously
    dayContainer.classList.remove('error-state');
    monthContainer.classList.remove('error-state');
    yearContainer.classList.remove('error-state');
  
    outputSpans[0].textContent = '--'; // years
    outputSpans[1].textContent = '--'; // months
    outputSpans[2].textContent = '--'; // days
  
    // 6) Parse input values
    let dayVal   = parseInt(dayInput.value);
    let monthVal = parseInt(monthInput.value);
    let yearVal  = parseInt(yearInput.value);
  
    let isValid = true; // We'll track overall validity
  
    // 7) Current date info
    let today       = new Date();
    let currentYear = today.getFullYear();
  
    // 8) Validate Day
    if (isNaN(dayVal)) {
      dayError.textContent = 'This field is required';
      dayContainer.classList.add('error-state');
      isValid = false;
    } else if (dayVal < 1 || dayVal > 31) {
      dayError.textContent = 'Must be a valid day';
      dayContainer.classList.add('error-state');
      isValid = false;
    }
  
    // 9) Validate Month
    if (isNaN(monthVal)) {
      monthError.textContent = 'This field is required';
      monthContainer.classList.add('error-state');
      isValid = false;
    } else if (monthVal < 1 || monthVal > 12) {
      monthError.textContent = 'Must be a valid month';
      monthContainer.classList.add('error-state');
      isValid = false;
    }
  
    // 10) Validate Year
    if (isNaN(yearVal)) {
      yearError.textContent = 'This field is required';
      yearContainer.classList.add('error-state');
      isValid = false;
    } else if (yearVal > currentYear) {
      yearError.textContent = 'Must be in the past';
      yearContainer.classList.add('error-state');
      isValid = false;
    }
  
    // 11) Check if the date is actually valid (e.g., 31 Feb is invalid)
    if (isValid) {
      let testDate = new Date(yearVal, monthVal - 1, dayVal);
      if (
        testDate.getDate()   !== dayVal   ||
        testDate.getMonth()  !== (monthVal - 1) ||
        testDate.getFullYear() !== yearVal
      ) {
        dayError.textContent = 'Must be a valid date';
        dayContainer.classList.add('error-state');
        isValid = false;
      }
    }
  
    // 12) Stop if invalid
    if (!isValid) return;
  
    // 13) Otherwise, calculate the exact age
    let birthDate = new Date(yearVal, monthVal - 1, dayVal);
  
    let ageYears  = currentYear - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays   = today.getDate() - birthDate.getDate();
  
    // Adjust days if negative
    if (ageDays < 0) {
      ageMonths--;
      let prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      ageDays += prevMonthDays;
    }
  
    // Adjust months if negative
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }
  
    // 14) Display final result
    outputSpans[0].textContent = ageYears;
    outputSpans[1].textContent = ageMonths;
    outputSpans[2].textContent = ageDays;
  }
  