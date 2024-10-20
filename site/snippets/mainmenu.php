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
      <a class="main-item" href="<?= $site->page("about")->url()?>"><?= $site->page("about")->title()?></a>
  </div>
</nav>
