<?php snippet("header"); ?>
<?php
$isdark = $page->bgdark()->toBool();
$fullheight = $page->marges()->toBool();

// Corrected variable name from $fullheigt to $fullheight
?>
<div class="overlay"><span><?= $site->loading()->text() ?></span></div>
<main>
  <section id="series">

    <?php snippet("nav"); ?>
    <?php snippet("mobnav"); ?>
    <?php snippet("mainmenu"); ?>

    <section class="gallery">

      <div class="namecount">
        <h1 class="z-index-4"><a href="<?= $site->url() ?>">Nicolas Hermann</a></h1>
        <div>
          <div class="counter mb-1">
            <span class="currentcount"></span>-<span class="allcount"></span>
          </div>
          <div class="action flex gap-2">
        <div class="soundbtn">
          <div class="playpausebtn">
            <svg class="play-icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 3.80902L19.882 12L3.5 20.191L3.5 3.80902Z" stroke="#a1a1a1" />
            </svg>
            <svg class="pause-icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4.5" y="3.5" width="5" height="17" stroke="#a1a1a1" />
              <rect x="14.5" y="3.5" width="5" height="17" stroke="#a1a1a1" />
            </svg>
          </div>
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

      </div>

      <section class="slides intro-text bg-light <?= $isdark ? "bg-dark" : "" ?>">
        <div class="<?= $isdark ? "bg-dark" : "bg-light" ?>">
          <h2><?= $page->titre() ?></h2>
          <?= $page->text()->kirbytext() ?>
        </div>
        <div class="counter desk-hide mob-show">1-<span class="firstall"></span> </div>
      </section>

      <div class="next-prev">
        <a class="prev"></a>
        <span class="nav-sep"></span>
        <a class="next"></a>
      </div>

      <?php foreach ($page->gallery()->toLayouts() as $layout): ?>
        <?php
        $seriegridclass = "";
        if ($layout->columns()->count() > 1) {
            $seriegridclass = "serie-grid";
        }
        $hasNonVideoBlocks = false;
        foreach ($layout->columns() as $column) {
            foreach ($column->blocks() as $block) {
                if ($block->type() != "video") {
                    $hasNonVideoBlocks = true;
                    break 2;
                }
            }
        }
        ?>

        <?php if ($hasNonVideoBlocks): ?>
          <section class="slides bg-light <?php if ($isdark === true) {
              echo "bg-dark";
          } ?> <?= $layout->attrs()->presentation() ?> <?= $seriegridclass ?>">
            <?php foreach ($layout->columns() as $column): ?>
              <?php foreach ($column->blocks() as $block): ?>
                <?php if ($block->type() == "video"): ?>
                  <!-- Skip rendering the video block here; we'll handle it separately -->
                  <?php continue; ?>
                <?php else: ?>
                  <div class="column <?= $block->position() ?> <?= $block->gridcol()->toBool() ? "grid-col-2" : "" ?> <?= $fullheight ? "full-height" : "" ?>">
                    <?= $block ?>
                  </div>
                <?php endif; ?>
              <?php endforeach; ?>
            <?php endforeach; ?>
          </section>
        <?php endif;
          // End of hasNonVideoBlocks check
          ?>
      <?php endforeach; ?>

      <!-- Now handle video blocks separately -->
      <?php foreach ($page->gallery()->toLayouts() as $layout): ?>
        <?php foreach ($layout->columns() as $column): ?>
          <?php foreach ($column->blocks() as $block): ?>
            <?php if ($block->type() == "video"): ?>
              <?php
              $caption = $block->caption();
              if (
                  $block->location() == "kirby" &&
                  ($video = $block->video()->toFile())
              ) {
                  $url = $video->url();
              } else {
                  $url = $block->url();
              }
              ?>
              <section class="slides center <?php if ($isdark === true) {
                  echo "bg-dark";
              } ?>">
                <div class="serie-center video-outer">
                  <div class="video-inner video-player">
                    <iframe src="<?= $url ?>" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                  </div>
                </div>
              </section>
            <?php endif; ?>
          <?php endforeach; ?>
        <?php endforeach; ?>
      <?php endforeach; ?>

      <?php if ($page->video()->isNotEmpty()): ?>
        <section class="slides center <?php if ($isdark === true) {
            echo "bg-dark";
        } ?>">
          <div class="serie-center video-outer">
            <div class="video-inner video-player">
              <iframe src="<?= $page
                  ->video()
                  ->url() ?>" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        </section>
      <?php endif; ?>


      <?php if ($sound = $site->fondsonore()->toFile()): ?>
        <audio loop>
          <source src="<?= $sound->url() ?>" type="<?= $sound->mime() ?>">
        </audio>
      <?php endif; ?>
    </section>
  </section>

</main>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
<?= js("assets/js/series.js", ["type" => "module"]) ?>
<?php snippet("footer"); ?>
