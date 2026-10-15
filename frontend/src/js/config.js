const API_URLS = {
  localhost: 'https://6ywz8mq7wf.execute-api.eu-west-1.amazonaws.com/dev/contact',
  'dev.radek-drweski.com': 'https://6ywz8mq7wf.execute-api.eu-west-1.amazonaws.com/dev/contact',
  'radek-drweski.com': '',
};

export const CONFIG = {
  API_URL: API_URLS[window.location.hostname],
};
