<button class="nav-action nav-toggler">+</button>
<!-- <nav class="offscreen-nav">
  <div class="navwrap">
    <span class="nav-name"><a href="<?= $site->url()?>">Nicolas Hermann</a></span>
    <div class="flex dir-column">
      <span class='mb-3'><?= $site->page("series")->title()?></span>
      <?php foreach($site->page('series')->children() as $p): ?>
          <a  class="mb-1" href="<?= $p->url() ?>"><?= $p->title() ?></a>
        <?php endforeach ?>
    </div>
    <a class="nav-about" href="<?= $site->page("about")->url()?>"><?= $site->page("about")->title()?></a>
  </div>
</nav> -->