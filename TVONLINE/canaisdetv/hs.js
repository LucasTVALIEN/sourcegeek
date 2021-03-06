<script src="//cdn.jsdelivr.net/npm/cdnbye@latest"></script>
<video id="video" controls></video>
<p id="version"></p>
<h3>download info:</h3>
<p id="info"></p>
<script>
    document.querySelector('#version').innerText = `hls.js version: ${Hls.version}  cdnbye version: ${Hls.engineVersion}`;
    var video = document.getElementById('video');
    var source = 'http://pfsv.io/live/1353156238/37396/365.m3u8';
    if(Hls.isSupported()) {
        var hls = new Hls({
            p2pConfig: {
                live: true,        // set false in VOD mode
                // announceLocation: 'hk',        // if using Hongkong tracker
                // announceLocation: 'us',        // if using USA tracker
                // Other p2pConfig options provided by CDNBye
            }
        });
        hls.loadSource(source);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
            video.play();
        });
        hls.p2pEngine.on('stats', function ({totalHTTPDownloaded, totalP2PDownloaded, totalP2PUploaded}) {
            var total = totalHTTPDownloaded + totalP2PDownloaded;
            document.querySelector('#info').innerText = `p2p ratio: ${Math.round(totalP2PDownloaded/total*100)}%, saved traffic: ${totalP2PDownloaded}KB, uploaded: ${totalP2PUploaded}KB`;
        });
    }
    // This is using the built-in support of the plain video element, without using hls.js.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = source;
        video.addEventListener('loadedmetadata',function() {
            video.play();
        });
    }
</script>
