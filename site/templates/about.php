<?php snippet('header') ?>

<main id="swup" class="transition-fade">
  <section id="about">
    <a class="absolute mob-hide btn-close"  href="<?= $site->url() ?>">
      <span class="close"></span>
    </a>
    <?php snippet('mobnav') ?>

    <div class="about-grid">
      <div class="bio darkbg">
        <p><?= $site->find('about')->textleft() ?></p>
      </div>

      <div class="parcour flex dir-column">
      <p><?= $site->find('about')->textright() ?></p>
          <div class="contact flex mt-auto">
            <section>
            <div class="mb-1">
              <a class="block"  href="mailto:<?= Str::encode($site->mail()) ?>">
                <?= Str::encode($site->mail()) ?>
              </a>
              <a href="tel:<?= $site->phone() ?>"><?= $site->phone() ?></a>
            </div>

              <ul class="justify-center mb-2">
                <li><a href="<?= $site->instagram() ?>" target="_blank">INSTAGRAM</a></li>
                <li><a href="<?= $site->vimeo() ?>" target="_blank">VIMEO</a></li>
                <li><a href="<?= $site->linktree() ?>" target="_blank">LINKTREE</a></li>
              </ul>

              <ul class="credits">
                <li><a href="#">SOUND : GUILLAUME BONNEAU</a></li>
                <li><a href="http://siloenouyrit.fr/" target="_blank">Design : Siloé Nouyrit</a></li>
                <li><a href="https://shimsham.design/" target="_blank">Code : Théo Paolo G.</a></li>
              </ul>
            </section>
      </div>
    </div>

  </section>
</main>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/gsap.min.js"></script>
<?= js ('assets/js/about.js') ?>
<?php snippet('footer') ?>
