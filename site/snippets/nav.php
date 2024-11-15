<nav class="mob-hide nav-grid desk-nav">

  <ul>
    <li class="dropdown">
      <button class="nav-toggler"><?= $site->worksbtn()->text() ?></button>
    </li>
  </ul>

  <span class="nav-center"></span>

  <ul class="flex" style="justify-self: baseline;">
    <li>
      <a href="<?= $site->page("about")->url() ?>">
        <?= $site->page("about")->title() ?>
      </a>
    </li>

    <li class="btns-langs">
        <?php
        $i = 0;
        foreach ($kirby->languages() as $language):
            $i++; ?>
            <a <?php e($kirby->language() == $language, ' class="active"'); ?>
                href="<?= $language->url() ?>"
                hreflang="<?= $language->code() ?>" data-no-swup>
                <?= html($language->code()) ?>
            </a>
            <?php if ($i < count($kirby->languages())): ?>
                <span class="separator">|</span>
            <?php endif; ?>
        <?php
        endforeach;
        ?>
    </li>

  </ul>
</nav>
