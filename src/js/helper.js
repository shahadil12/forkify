import { async } from 'regenerator-runtime';
import { TIME_OUT } from './config';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const request = await Promise.race([fetch(url), timeout(TIME_OUT)]);
    const data = await request.json();

    if (!request.ok) throw new Error(`${data.message}(${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const request = await Promise.race([fetchPro, timeout(TIME_OUT)]);
    const data = await request.json();

    if (!request.ok) throw new Error(`${data.message}(${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
