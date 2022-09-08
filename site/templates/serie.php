<?php snippet('header') ?>
<?php $isdark = $page->bgdark()->toBool(); $fullheigt = $page->marges()->toBool();?>
<main>
    <section id="series">

    <?php snippet('nav') ?>

      <section class="gallery">

        <div class="namecount">
          <span>Nicolas Hermann</span>
          <div class="counter"> <span class="currentcount"></span>-<span class="allcount"></span> </div>
        </div>

        <section class="slides intro-text">
          <div  class="bg-light <?php if($isdark === true){ echo "bg-dark"; }?>">
            <h2><?= $page->titre() ?></h2>
            <?= $page->text() ?>
          </div>
        </section>

        <div class="next-prev">
          <a class="prev" ></a>
          <a class="next" ></a>
        </div>

        <?php foreach ($page->gallery()->toLayouts() as $layout): ?>
          <section class="slides column-grid-2">
            <?php foreach($layout->columns() as $column):?>
              <?php foreach ($column->blocks() as $block): ?>
                <div class="column <?= $block->position() ?> <?php if($block->colpos()->toBool() === true){ echo "grid-col-2"; }?> <?php if($fullheigt === true){ echo "full-height"; }?>" style="grid-column:span <?= $column->span(2) ?>;">
                  <?= $block ?>
                </div>
              <?php endforeach ?>
            <?php endforeach ?>
          </section>
        <?php endforeach ?>
        <?php if($page->video()->isNotEmtpuy()):?>
          <section class="slides center">
            <div class="column serie-center video-outer">
              <div class="video-inner">
                <iframe src="<?= $page->video()->url() ?>" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
          </section>
        <?php endif ?>
      </section>
    </section>
</main>
<?= js('assets/js/series.js') ?>
<?php snippet('footer') ?>