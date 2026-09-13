/* ==========================================================================
   Background song — toggle play/pause via a hidden YouTube player
   Video: https://youtu.be/lkt-Gj2Yu4c
   ========================================================================== */

(function () {
  "use strict";

  var VIDEO_ID = "lkt-Gj2Yu4c";
  var player = null;
  var ready = false;
  var wantsPlay = false;
  var btn = document.querySelector(".music-toggle");
  if (!btn) return;

  function setUI(playing) {
    btn.classList.toggle("playing", playing);
    btn.setAttribute("aria-label", playing ? "Pause our song" : "Play our song");
  }
  setUI(false);

  // create hidden mount point
  var mount = document.createElement("div");
  mount.id = "yt-audio-player";
  mount.style.position = "fixed";
  mount.style.width = "1px";
  mount.style.height = "1px";
  mount.style.overflow = "hidden";
  mount.style.opacity = "0";
  mount.style.pointerEvents = "none";
  document.body.appendChild(mount);

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("yt-audio-player", {
      videoId: VIDEO_ID,
      playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: VIDEO_ID },
      events: {
        onReady: function () {
          ready = true;
          if (wantsPlay) player.playVideo();
        },
        onStateChange: function (e) {
          if (e.data === YT.PlayerState.PLAYING) setUI(true);
          if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) setUI(false);
        },
      },
    });
  };

  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);

  btn.addEventListener("click", function () {
    if (!ready) {
      wantsPlay = true;
      setUI(true);
      return;
    }
    var state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });
})();
