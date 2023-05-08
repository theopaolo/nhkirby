<div class="introduction grid bg-dark absolute z-index-2">
  <div class="w-full h-full">
    <?php $cover = $site->find('intro')->cover()->toFile() ?>
    <img
      src="<?= $cover->url() ?>"
      srcset="<?= $cover->srcset(['400w'  => ['width' => 400, 'format' => 'webp'],'800w'  => ['width' => 800, 'format' => 'webp'],'1200w' => ['width' => 1200, 'format' => 'webp']]) ?>" />
  </div>
  <section class="langs">
    <div class="en f-1 flex align-center h-full bg-dark justify-center">
      <div>
        <p> EN </p>
        <ul>
          <li>- DOUBLE CLICK TO OPEN THE IMAGES IN LARGE FORMAT</li>
          <li>- CLICK AND DRAG TO ROTATE THE SPHERE</li>
          <li>- SCROLL TO ZOOM IN OR OUT</li>
          <li>- RESET YOUR IMMERSION BY CLICKING ON "NICOLAS HERMANN"</li>
          <li>- FIND OUT MORE ABOUT HIS WORK BY CLICKING ON "SERIES"</li>
        </ul>
        <button class="btnintro" data-lang="en">→ enter</button>
      </div>
    </div>
    <div class="fr f-1 flex align-center h-full bg-dark justify-center">
      <div>
        <p> FR </p>
        <ul>
          <li>- DOUBLE CLIQUEZ POUR OUVRIR LES IMAGES EN GRAND FORMAT</li>
          <li>- CLIQUEZ ET DÉPLACEZ POUR TOURNER LA SPHERE</li>
          <li>- SCROLLEZ POUR ZOOMER OU DÉZOOMER</li>
          <li>- RÉINITIALISEZ VOTRE IMMERSION EN CLIQUANT SUR "NICOLAS HERMANN"</li>
          <li>- DÉCOUVREZ SON TRAVAIL PLUS EN PRÉCISION EN CLIQUANT SUR "SÉRIES"</li>
        </ul>
        <button class="btnintro" data-lang="fr">→ entrer</button>
      </div>
    </div>
  </section>
</div>