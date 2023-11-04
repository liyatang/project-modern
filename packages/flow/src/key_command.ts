const isMac = /macintosh|mac os x/i.test(navigator.userAgent);

const KeyCommand = {
  COPY: isMac ? 'cmd+c' : 'ctrl+c',
  PASTER: isMac ? 'cmd+v' : 'ctrl+v',
};

export { KeyCommand };
