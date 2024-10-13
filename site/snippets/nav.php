<nav class="mob-hide nav-grid desk-nav">
  <ul>
    <li class="dropdown">
      <a href="#"><?= $site->page("series")->title() ?></a>
      <div class="dropdown-content dark-drop">
        <?php foreach ($site->page("series")->children() as $p): ?>
          <?php if ($kirby->language() == "fr"): ?>
            <a href="<?= $p->url() ?>"><?= $p->title() ?></a>
          <?php else: ?>
            <a href="<?= $p->url("en") ?>"><?= $p->title() ?></a>
          <?php endif; ?>
        <?php endforeach; ?>
      </div>
    </li>
  </ul>
  <span class="nav-center"></span>
  <ul class="flex" style="justify-self: baseline;">
    <li><a href="<?= $site->page("about")->url() ?>"><?= $site
    ->page("about")
    ->title() ?></a></li>

    <li>
        <?php foreach ($kirby->languages() as $language): ?>
        <a <?php e(
            $kirby->language() == $language,
            ' class="active"'
        ); ?> href="<?php echo $language->url(); ?>" hreflang="<?php echo $language->code(); ?>" data-no-swup>
          <?php echo html($language->code()); ?>
        </a>
        <?php endforeach; ?>
    </li>

  </ul>
</nav>
