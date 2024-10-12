<?php snippet("header"); ?>
<?php snippet("intro"); ?>

<div class="container exp">

    <div class="namecount z-index-1">
      <h1 class="z-index-4 expbtn">Nicolas Hermann</h1>
      <span class="cpar"></span>

      <div class="flex gap-4">
        <div class="soundbtn">
          <!-- <div class="wave">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div> -->

          <div class="playpausebtn">
            <svg class="play-icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 3.80902L19.882 12L3.5 20.191L3.5 3.80902Z" stroke="#a1a1a1"/>
            </svg>

            <svg class="pause-icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4.5" y="3.5" width="5" height="17" stroke="#a1a1a1"/>
              <rect x="14.5" y="3.5" width="5" height="17" stroke="#a1a1a1"/>
            </svg>
          </div>

          <!-- <span><?= $site->audiobtn()->text() ?></span> -->
        </div>
        <div class="fullscreenbtn">
          <svg aria-hidden="true" class="fullscreen-icon" width="100" height="100" viewBox="-10 -10 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" role="button" aria-label="Fullscreen Icon">
            <path d="M3.30103 100.109L23.641 79.3391L20.0707 75.8391L-0.28127 96.6201L0.21092 78.1001L-4.30078 77.9868L-5 104.999L22 103.737L21.7891 99.2371L3.30103 100.109Z" fill="black"/>
            <path d="M78.0002 -3.73819L78.2111 0.76181L96.6991 -0.10928L76.3591 20.6607L79.9294 24.1607L100.281 3.39072L99.7892 21.8987L104.301 22.012L105 -5L78.0002 -3.73819Z" fill="black"/>
            <path d="M78.0002 103.738L78.2111 99.2381L96.6991 100.109L76.3591 79.3392L79.9294 75.8392L100.281 96.6092L99.7892 78.1012L104.301 77.9879L105 105L78.0002 103.738Z" fill="black"/>
            <path d="M3.30103 -0.1093L23.641 20.6607L20.0707 24.1607L-0.28127 3.3797L0.21092 21.8997L-4.30078 22.013L-5 -4.99902L22 -3.73732L21.7891 0.76268L3.30103 -0.1093Z" fill="black"/>
          </svg>
          <span class="sr-only"><?= $site->fullscreenbtn()->text() ?></span>
        </div>
      </div>
    </div>

    <?php snippet("nav"); ?>

    <div class="lightbox">
    </div>

    <?php if ($sound = $site->fondsonore()->toFile()): ?>
      <audio loop>
        <source src="<?= $sound->url() ?>" type="<?= $sound->mime() ?>">
      </audio>
    <?php endif; ?>

  </div>

<section class="imgverticales">
  <?php foreach ($page->find("verticales")->images()->shuffle() as $image): ?>
    <span data-imgurl="<?= $image->thumb(["width" => 900])->url() ?>"></span>
  <?php endforeach; ?>
</section>

<section class="imghorizontales">
  <?php foreach ($page->find("horizontales")->images()->shuffle() as $image): ?>
    <span data-imgurl="<?= $image->thumb(["width" => 900])->url() ?>"></span>
  <?php endforeach; ?>
</section>

<section class="videos">
  <video class="video-sphere" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo-com.mon.world/nhvideos/spectreeau.mp4" type='video/mp4' >
  </video>
  <video class="video-sphere" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo-com.mon.world/nhvideos/avion.mp4" type='video/mp4' >
  </video>
  <video class="video-sphere" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo-com.mon.world/nhvideos/embryon.mp4" type='video/mp4' >
  </video>
  <video class="video-sphere" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo-com.mon.world/nhvideos/embryon.mp4" type='video/mp4' >
  </video>
  <video class="video-sphere" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo-com.mon.world/nhvideos/birds.mp4" type='video/mp4' >
  </video>
  <video class="video-sphere" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo-com.mon.world/nhvideos/electricite.mp4" type='video/mp4' >
  </video>
  <video class="video-sphere" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo-com.mon.world/nhvideos/tambour.mp4" type='video/mp4' >
  </video>
  <video class="video-sphere" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo-com.mon.world/nhvideos/etoilefilante.mp4" type='video/mp4' >
  </video>
  <video class="video-sphere" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo-com.mon.world/nhvideos/volcano.mp4" type='video/mp4' >
  </video>
  <video class="video-sphere" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo-com.mon.world/nhvideos/saturne.mp4" type='video/mp4' >
  </video>
</section>

<canvas class="webgl"></canvas>
<canvas id="starry-sky"></canvas>
<div class="loading-bar"> </div>
<span class="loadpercent">0%</span>

<main id="swup" class="transition-fade">
  <section>
    <?php snippet("mobnav"); ?>
  </section>
</main>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
<?= js("assets/dist/js/app.js") ?>
<?php snippet("footer"); ?>
