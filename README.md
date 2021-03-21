# Introduction

BiliAudio is a chrome extension which helps converting the bilibili video to audio!

## Tech Stack
1. Learn how to download the bilibili video, check [here](https://www.bilibili.com/read/cv6415114/);
2. Use [ffmpeg.wasm](https://ffmpegwasm.github.io/#installation) to convert flv to mp3, here is [demo](https://codepen.io/jeromewu/pen/NWWaMeY?editors=1010);

## Getting Started

**To get started, follow the instructions below**

To get a local copy up and running follow these simple steps.

- git clone the repo

```
git clone https://github.com/onedebos/covtension && cd biliAudio
```

- Install all the required packages with

```
npm install
```

- Build from webpack

```
npm run build
```

To install in Chrome

- Head over to chrome://extensions
- Toggle "Developer mode" on.
- Click Load unpacked.
- Upload the dist folder to chrome
- The extension should now be available for use

## Contribution

- [x] get the bvid of bilibili;
- [x] form up playUri to get download url of flv video;
- [ ] convert flv to mp3 online(for now, user needs to download flv first, and upload flv video, then download the coverted mp3 file);
- [ ] transfer mp3 to music platform(eg: qq music, wangyiyun music);
- [ ] ...
