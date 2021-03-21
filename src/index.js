import axios from "axios";
import FFmpeg from "@ffmpeg/ffmpeg";

var biliVideoUrl = document.getElementById('biliVideoUrl');
var link = document.getElementById('link');
var bvid = '';
var api = "https://api.bilibili.com/x/web-interface/view?bvid=";
var api2 = "https://api.bilibili.com/x/player/playurl?";

chrome.tabs.query({
  active: true,
  currentWindow: true
}, function(tabs) {
  var tabURL = tabs[0].url;
  var bvArr = tabURL.match(/(BV.*\?)/ig);
  if (bvArr !== null && bvArr.length > 0){
    bvid = bvArr[0].slice(0, bvArr[0].length - 1);
    biliVideoUrl.value = bvid;
  } else {
    biliVideoUrl.value = "Not found invalid bvid";
  }
});

var getLink = document.getElementById('getLink');

getLink.addEventListener("click", async () => {
  // bvid => video flv
  var response = await axios.get(`${api}${bvid}`);
  var avid = response.data.data.aid;
  var cid = response.data.data.cid;
  if (avid !== undefined && cid !== undefined) {
    var response2 = await axios.get(`${api2}avid=${avid}&cid=${cid}`);
    var flvUrl = response2.data.data.durl[0].url;
    link.innerHTML = flvUrl;
  }
});

// flv => mp3
const message = document.getElementById('message');
const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({
  log: true,
  progress: ({ ratio }) => {
    message.innerHTML = `Complete: ${(ratio * 100.0).toFixed(2)}%`;
  },
});

const transcode = async ({ target: { files }  }) => {
  console.log(files);
  const { name } = files[0];
  message.innerHTML = 'Loading ffmpeg-core.js';
  await ffmpeg.load();
  message.innerHTML = 'Start transcoding';
  ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
  await ffmpeg.run('-i', name,  'output.mp3');
  message.innerHTML = 'Complete transcoding';
  const data = ffmpeg.FS('readFile', 'output.mp3');

  const audio = document.getElementById('output-audio');
  audio.src = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }));
}

document.getElementById('uploader').addEventListener('change', transcode);



