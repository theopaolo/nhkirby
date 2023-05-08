<?php snippet('header') ?>
<?php snippet('intro') ?>

<div class="container exp">

    <div class="namecount z-index-1">
      <h1 class="z-index-4 expbtn"><a href="<?php $site->url()?>">Nicolas Hermann</a></h1>
      <span class="cpar"></span>
      <div class="soundbtn">
        <div class="wave">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <span>sound on/off</span>
      </div>
    </div>

    <?php snippet('nav') ?>

    <div class="lightbox">
    </div>

    <?php if($sound = $site->fondsonore()->toFile()): ?>
      <audio loop>
        <source src="<?= $sound->url() ?>" type="<?= $sound->mime() ?>">
      </audio>
    <?php endif ?>

  </div>

<section class="imgverticales">
  <?php foreach( $page->find('verticales')->images() as $image):  ?>
    <span data-imgurl="<?= $image->thumb(["width" => 900])->url() ?>"></span>
  <?php endforeach ?>
</section>
<section class="imghorizontales">
  <?php foreach( $page->find('horizontales')->images() as $image):  ?>
    <span data-imgurl="<?= $image->thumb(["width" => 900])->url() ?>"></span>
  <?php endforeach ?>
</section>

<!-- <section class="videos">
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
    <source src="https://theopaolo.com/nhvideos/embryon.mp4" type='video/mp4' >
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
</section> -->

<canvas class="webgl"></canvas>
<div class="loading-bar"> </div>
<span class="loadpercent">0%</span>

<main id="swup" class="transition-fade">
  <section>
    <?php snippet('mobnav') ?>
  </section>
</main>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/gsap.min.js"></script>
<?= js('assets/dist/js/app.js') ?>
<?= js('assets/js/introScript.js') ?>
<?php snippet('footer') ?>