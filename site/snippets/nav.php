<nav class="mob-hide nav-grid desk-nav">
  <ul class="flex" style="justify-self: end;">
    <li class="dropdown">
      <a href="#">séries</a>
      <div class="dropdown-content dark-drop">
        <?php foreach($site->page('series')->children() as $p): ?>
          <a href="<?= $p->url() ?>"><?= $p->title() ?></a>
        <?php endforeach ?>
      </div>
    </li>
  </ul>
  <span></span>
  <ul style="justify-self: baseline;">
    <li><a href="<?= $site->page("about")->url()?>">à propos</a> </li>
  </ul>
</nav>

<button class="nav-action">+</button>

<nav class="offscreen-nav">
  <span class="f-1"><a href="<?= $site->url() ?>">Nicolas Hermann</a></span>
  <div class="flex f-3 dir-column">
    <span class="mb-3">séries</span>
    <?php foreach($site->page('series')->children() as $p): ?>
      <a class="mb-1" href="<?= $p->url() ?>"><?= $p->title() ?></a>
    <?php endforeach ?>
  </div>
  <a class="f-1" href="<?= $site->page("about")->url()?>">à propos</a>
</nav>