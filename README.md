# finishline-monitor
![finishline-monitor](https://i.imgur.com/hywRuR6.png)

Monitors a single product on finishline.com and alerts restocks via Discord Webhook

### Tech Stack
- NodeJS  

### Installation
1. Download & Extract ZIP
2. `cd` into directory
3. Run `npm install`
4. Edit `config.js`
6. Run `node monitor.js` 
7. Observe

### Configuration File
- [WEBHOOK](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks?page=1)[String]: Notifications will be sent to this webhook.
- `PRODUCT_ID`[String]: (blue box) on the image below
- `STYLE_ID`[String]: (red box) on the image below
- `COLOR_ID`[String]: (green box) on the image below
- `POLL_INVTERVAL`[Number]: refresh interval (1000 = 1 second)

![PRODUCT_ID, STYLE_ID, COLOR_ID](https://i.ibb.co/2SV4Qh5/imageedit-4-5085916166.gif)
![Example](https://i.ibb.co/qd94JF5/Screen-Shot-2020-07-01-at-11-25-18-PM.png)
