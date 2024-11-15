<?php

/** @var \Kirby\Cms\Block $block */
$alt     = $block->alt();
$position = $block->position();
$src     = null;
$srcset  = null;
$sizes = "(min-width: 2560px) 50vw,
          (min-width: 2048px) 50vw,
          (min-width: 1600px) 50vw,
          (min-width: 1440px) 50vw,
          (min-width: 1024px) 50vw,
          (min-width: 800px) 70vw,
          (min-width: 640px) 100vw,
          (min-width: 480px) 100vw,
          (min-width: 320px) 100vw,
          100vw";

if ($image = $block->image()->toFile()) {
  $alt = $alt ?? $image->alt();
  $src = $image->url();
  $srcset = $image->srcset();
}
?>

<?php if ($src): ?>
  <picture>
      <source
        srcset="<?= $image->srcset('webp') ?>"
        sizes="<?= $sizes ?>"
        type="image/webp"
      >
      <img
        alt="<?= $alt->esc() ?>"
        src="<?= $src ?>"
        srcset="<?= $srcset ?>"
        sizes="<?= $sizes ?>"
        loading="lazy"
    >
  </picture>
<?php endif ?>