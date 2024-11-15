<?php snippet("header"); ?>
<?php
$isdark = $page->bgdark()->toBool();
$fullheight = $page->marges()->toBool();
?>

<main>
  <section id="series">

    <?php snippet("nav"); ?>
    <?php snippet("mobnav"); ?>
    <?php snippet("mainmenu"); ?>

    <section class="gallery">

      <div class="namecount">
        <h1 class="z-index-4"><a href="<?= $site->url() ?>">Nicolas Hermann</a></h1>

        <div class="counter flex flex-col gap-4 align-center">
            <div class="flex gap-2">
              <span class="prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                    <g transform="translate(19254.619 18134.096)">
                      <path d="M -19245.89453125 -18121.69921875 L -19246.072265625 -18121.876953125 L -19251.11328125 -18126.919921875 L -19251.2890625 -18127.095703125 L -19251.11328125 -18127.271484375 L -19250.583984375 -18127.802734375 L -19246.072265625 -18132.31640625 L -19245.89453125 -18132.4921875 L -19245.716796875 -18132.31640625 L -19244.654296875 -18131.25390625 L -19244.478515625 -18131.076171875 L -19244.65625 -18130.8984375 L -19248.4609375 -18127.095703125 L -19244.65625 -18123.29296875 L -19244.478515625 -18123.115234375 L -19244.654296875 -18122.9375 L -19245.716796875 -18121.875 L -19245.89453125 -18121.69921875 Z" stroke="none"/>
                      <path d="M -19245.89453125 -18122.052734375 L -19244.83203125 -18123.115234375 L -19248.814453125 -18127.095703125 L -19244.83203125 -18131.076171875 L -19245.89453125 -18132.138671875 L -19250.935546875 -18127.095703125 L -19245.89453125 -18122.052734375 M -19245.89453125 -18121.345703125 L -19251.642578125 -18127.095703125 L -19245.89453125 -18132.845703125 L -19244.125 -18131.076171875 L -19248.107421875 -18127.095703125 L -19244.125 -18123.115234375 L -19245.89453125 -18121.345703125 Z" stroke="none" fill="#fff"/>
                    </g>
                </svg>
              </span>
              <div><span class="currentcount"></span>-<span class="allcount"></span></div>
              <span class="next">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                    <g transform="translate(19254.619 18134.096)">
                      <path d="M -19249.34375 -18121.69921875 L -19249.521484375 -18121.875 L -19250.583984375 -18122.9375 L -19250.759765625 -18123.115234375 L -19250.58203125 -18123.29296875 L -19246.77734375 -18127.095703125 L -19250.58203125 -18130.8984375 L -19250.759765625 -18131.076171875 L -19250.583984375 -18131.25390625 L -19249.521484375 -18132.31640625 L -19249.34375 -18132.4921875 L -19249.166015625 -18132.314453125 L -19244.125 -18127.271484375 L -19243.94921875 -18127.095703125 L -19244.125 -18126.919921875 L -19244.654296875 -18126.388671875 L -19249.166015625 -18121.875 L -19249.34375 -18121.69921875 Z" stroke="none"/>
                      <path d="M -19249.34375 -18122.052734375 L -19244.302734375 -18127.095703125 L -19249.34375 -18132.138671875 L -19250.40625 -18131.076171875 L -19246.423828125 -18127.095703125 L -19250.40625 -18123.115234375 L -19249.34375 -18122.052734375 M -19249.34375 -18121.345703125 L -19251.11328125 -18123.115234375 L -19247.130859375 -18127.095703125 L -19251.11328125 -18131.076171875 L -19249.34375 -18132.845703125 L -19243.595703125 -18127.095703125 L -19249.34375 -18121.345703125 Z" stroke="none" fill="#fff"/>
                    </g>
                </svg>
              </span>
            </div>
        </div>
        <?php snippet("actionsbtns"); ?>
      </div>

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
-                  <?php continue; ?>
                <?php else: ?>
                  <div class="column <?= $block->position() ?> <?= $block->gridcol()->toBool() ? "grid-col-2" : "" ?> <?= $fullheight ? "full-height" : "" ?>">
                    <?= $block ?>
                  </div>
                <?php endif; ?>
              <?php endforeach; ?>
            <?php endforeach; ?>
          </section>
        <?php endif;?>
      <?php endforeach; ?>

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
              <section class="slides <?php if ($isdark === true) {
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
        <section class="slides <?php if ($isdark === true) {
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

      <section class="slides intro-text <?= $isdark ? "bg-dark" : "bg-light" ?>">
        <div class="<?= $isdark ? "bg-dark" : "bg-light" ?>">
          <h2><?= $page->titre() ?></h2>
          <?= $page->text()->kirbytext() ?>
        </div>
        <div class="counter desk-hide mob-show"></div>
      </section>

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
