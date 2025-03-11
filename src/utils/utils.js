export const checkNullOrEmpty = (value) => {
  if (value === undefined || value === null || value === "") return true;

  if (typeof value === "object" && !Array.isArray(value)) {
    return Object.keys(value).length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
};
// export const checkNullOrEmpty = (value) => {
//   return value === undefined || value === null || value === '';
// };

export const setLocalItem = (key, value) => {
  if (checkNullOrEmpty(key)) return;

  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalItem = (key) => {
  if (checkNullOrEmpty(key)) return;

  return JSON.parse(localStorage.getItem(key));
};

export const removeLocalItem = (key) => {
  if (checkNullOrEmpty(key)) return;

  localStorage.removeItem(key);
};

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const formatDate = (dateString) => {
  const [datePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("/");
  return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
};
export const studyformatDate = (dateString) => {
  if (!dateString) return "";
  const [datePart] = dateString.split(" ");
  return datePart.replace(/\//g, "-"); 
};

//Subheader date format for Arabic and English
export function getFormattedDate(lang = "en") {
  const today = new Date();
  const isArabic = lang === "ar";

  const formatDate = (locale, calendar, options = {}) =>
    new Intl.DateTimeFormat(locale, {
      ...options,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      calendar,
    })
      .format(today)
      .replace(/[٠-٩]/g, (d) => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);

  // Gregorian date with weekday
  const gregorianDate = formatDate("ar-SA", "gregory", { weekday: "long" });
  const hijriDate = formatDate("ar-SA", "islamic");

  if (isArabic) {
    return `${gregorianDate} م - ${hijriDate}`;
  } else {
    const gregorianEnglish = formatDate("en-US", "gregory", { weekday: "long" });
    const hijriEnglish = formatDate("en-SA-u-ca-islamic", "islamic");
    return `${gregorianEnglish} AD - ${hijriEnglish}`;
  }
}

