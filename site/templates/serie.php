<?php snippet('header') ?>
<?php $isdark = $page->bgdark()->toBool(); $fullheigt = $page->marges()->toBool();?>
<div class="overlay"><span><?= $site->loading()->text() ?></span></div>
<main>
    <section id="series">

    <?php snippet('nav') ?>
    <?php snippet('mobnav') ?>

      <section class="gallery">

        <div class="namecount">
          <h1 class="z-index-4"><a href="<?= $site->url()?>">Nicolas Hermann</a></h1>
          <div class="counter"> <span class="currentcount"></span>-<span class="allcount"></span> </div>
        </div>

        <section class="slides intro-text bg-light <?php if($isdark === true){ echo "bg-dark"; }?>">
          <div  class="bg-light <?php if($isdark === true){ echo "bg-dark"; }?>">
            <h2><?= $page->titre() ?></h2>
            <?= $page->text()->kirbytext() ?>
          </div>
          <div class="counter desk-hide mob-show">1</span>-<span class="firstall"></span> </div>
        </section>

        <div class="next-prev">
          <a class="prev" ></a>
          <span class="nav-sep"></span>
          <a class="next" ></a>
        </div>

        <?php foreach ($page->gallery()->toLayouts() as $layout): ?>
          <?php
            $seriegridclass = '';
            if ($layout->columns()->count() > 1) {
                $seriegridclass = 'serie-grid';
            }
          ?>
          <section class="slides bg-light <?php if($isdark === true){ echo "bg-dark"; }?> <?= $layout->attrs()->presentation() ?> <?= $seriegridclass ?>">
            <?php foreach($layout->columns() as $column):?>
              <?php foreach ($column->blocks() as $block): ?>
                <div class="column <?= $block->position() ?> <?php if($block->gridcol()->toBool() === true){ echo "grid-col-2"; }?> <?php if($fullheigt === true){ echo "full-height"; }?>"">
                  <?= $block ?>
                </div>
              <?php endforeach ?>
            <?php endforeach ?>
          </section>
        <?php endforeach ?>

        <?php if($page->video()->isNotEmpty()):?>
          <section class="slides center">
            <div class="serie-center video-outer">
              <div class="video-inner video-player">
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