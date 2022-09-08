<?php

/** @var \Kirby\Cms\Block $block */
$alt     = $block->alt();
$position = $block->position();
$src     = null;

if ($image = $block->image()->toFile()) {
    $alt = $alt ?? $image->alt();
    $src = $image->url();
}
?>

<?php if ($src): ?>
  <img src="<?= $src ?>" alt="<?= $alt->esc() ?>">
<?php endif ?>