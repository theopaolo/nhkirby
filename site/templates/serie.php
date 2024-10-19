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

    <section class="gallery">

      <div class="namecount">
        <h1 class="z-index-4"><a href="<?= $site->url() ?>">Nicolas Hermann</a></h1>
        <div class="counter"> <span class="currentcount"></span>-<span class="allcount"></span> </div>
      </div>

      <section class="slides intro-text bg-light
            <?= $isdark ? "bg-dark" : "" ?>">
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
        <?php $seriegridclass = "";
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
                <!-- <?php if ($caption->isNotEmpty()): ?>
                    <div class="video-caption"><?= $caption ?></div>
                  <?php endif; ?> -->
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

      <div class="soundbtn" style="position: fixed; bottom:1rem;">
        <!-- <div class="wave">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div> -->

        <div class="playpausebtn">
          <svg class="play-icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 3.80902L19.882 12L3.5 20.191L3.5 3.80902Z" stroke="#a1a1a1" />
          </svg>

          <svg class="pause-icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4.5" y="3.5" width="5" height="17" stroke="#a1a1a1" />
            <rect x="14.5" y="3.5" width="5" height="17" stroke="#a1a1a1" />
          </svg>
        </div>

        <!-- <span><?= $site->audiobtn()->text() ?></span> -->
      </div>
      <?php if ($sound = $site->fondsonore()->toFile()): ?>
        <audio loop>
          <source src="<?= $sound->url() ?>" type="<?= $sound->mime() ?>">
        </audio>
      <?php endif; ?>
    </section>
  </section>

</main>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
<?= js("assets/js/series.js") ?>

<?php snippet("footer"); ?>
