<nav class="mob-hide nav-grid desk-nav">
  <ul>
    <li class="dropdown">
      <a class="seriestrans" href="#"><?= $site->page("series")->title()?></a>
      <div class="dropdown-content dark-drop">
        <?php foreach($site->page('series')->children() as $p): ?>
          <a href="<?= $p->url() ?>"><?= $p->title() ?></a>
        <?php endforeach ?>
      </div>
    </li>
  </ul>
  <span class="nav-center"></span>
  <ul style="justify-self: baseline;">
    <li><a class="abouttrans" href="<?= $site->page("about")->url()?>"><?= $site->page("about")->title()?></a> </li>
  </ul>
</nav>