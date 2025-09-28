// Ansi codes for console colors

// "\x1b[0m" - reset needed in each log to avoid color bleeding
// "\x1b[31m" - red color
// "\x1b[32m" - green color
// "\x1b[33m" - yellow color

export const errorLog = (...message) => {
  return console.log(`${"\x1b[31m%s\x1b[0m"}`, `${message}`);
};

export const infoLog = (...message) => {
  return console.log(`${"\x1b[32m%s\x1b[0m"}`, `${message}`);
};

export const warningLog = (...message) => {
  return console.log(`${"\x1b[33m%s\x1b[0m"}`, `${message}`);
};
