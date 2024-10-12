<?php
/** @var \Kirby\Cms\Block $block */
$caption = $block->caption();

if (
  $block->location() == 'kirby' &&
  $video = $block->video()->toFile()
) {
  $url = $video->url();
} else {
  $url = $block->url();
}

if ($url):
?>

<div class="video-inner video-player">
  <iframe src="<?= $url ?>" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>


<?php endif; ?>