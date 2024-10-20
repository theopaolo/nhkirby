<nav class="main-nav">
  <div>
    <span></span>
      <ul>
        <?php foreach($navigation as $category): ?>
          <li>
              <h2><?= $category->category() ?></h2>
              <ul>
                <?php $pages = $category->menu_item_url()->toPages();
                foreach($pages as $item): ?>
                    <li><a href="<?= $item->url() ?>"><?= $item->title() ?></a></li>
                <?php endforeach ?>
              </ul>
          </li>
        <?php endforeach ?>
      </ul>
      <div class="main-item">
      <a href="<?= $site->page("about")->url()?>"><?= $site->page("about")->title()?></a>
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
      </div>
  </div>
</nav>
