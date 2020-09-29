import {Realtime} from 'leancloud-realtime';

export let realtime = null;

if (!realtime) {
  realtime = new Realtime({
    appId: 'm7baukzusy3l5coew0b3em5uf4df5i2krky0ypbmee358yon',
    appKey: '2e46velw0mqrq3hl2a047yjtpxn32frm0m253k258xo63ft9',
    server: 'https://leanmessage.jishuq.com',
  });
}
