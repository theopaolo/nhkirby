<?php snippet(['header', 'intro']) ?>

<div class="container exp">

    <div class="namecount z-index-1">
      <h1 class="z-index-3 expbtn">Nicolas Hermann</h1>
      <div class="soundbtn">
        <div class="wave">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <span>sound on/off</span>
      </div>
    </div>

    <?php snippet('nav') ?>

    <div class="lightbox">
      <!-- <button class="boxbtn">fermer</button> -->
    </div>

    <audio loop>
      <source src="static/OlivierMessiaenLaviergeetlenfant.mp3" type="audio/mpeg">
    </audio>
  </div>

<section class="videos">
  <video class="video" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo.com/nhvideos/spectreeau.mp4" type='video/mp4' >
  </video>
  <video class="video" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo.com/nhvideos/avion.mp4" type='video/mp4' >
  </video>
  <video class="video" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo.com/nhvideos/embryon.mp4" type='video/mp4' >
  </video>
  <video class="video" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo.com/nhvideos/bigbang.mp4" type='video/mp4' >
  </video>
  <video class="video" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo.com/nhvideos/birds.mp4" type='video/mp4' >
  </video>
  <video class="video" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo.com/nhvideos/electricite.mp4" type='video/mp4' >
  </video>
  <video class="video" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo.com/nhvideos/tambour.mp4" type='video/mp4' >
  </video>
  <video class="video" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo.com/nhvideos/etoilefilante.mp4" type='video/mp4' >
  </video>
  <video class="video" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo.com/nhvideos/volcano.mp4" type='video/mp4' >
  </video>
  <video class="video" loop muted="muted" crossOrigin="anonymous" playsinline style="display: none;" >
    <source src="https://theopaolo.com/nhvideos/saturne.mp4" type='video/mp4' >
  </video>
</section>

<canvas class="webgl"></canvas>
<div class="loading-bar"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/gsap.min.js"></script>
<?= js('assets/dist/bundle.js') ?>

<?php snippet('footer') ?>