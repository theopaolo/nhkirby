<div class="introduction grid bg-dark absolute z-index-2">
    <div class="w-full h-full">
      <canvas class="mini-sphere"></canvas>
    </div>
    <section class="langs bg-dark">
      <div class="en f-1 flex items-ends">
        <div>
          <p> ENGLISH </p>
          <ul>
            <li>DOUBLE CLICK TO OPEN THE IMAGES IN LARGE FORMAT</li>
            <li>CLICK AND DRAG TO ROTATE THE SPHERE</li>
            <li>SCROLL TO ZOOM IN OR OUT</li>
            <li>RESET YOUR IMMERSION BY CLICKING ON "NICOLAS HERMANN"</li>
            <li>FIND OUT MORE ABOUT HIS WORK BY CLICKING ON "SERIES"</li>
          </ul>
          <button class="btnintro" data-lang="en" href="<?=  $kirby->language('en')->url() ?>">→ enter</button>
        </div>
      </div>
      <div class="fr f-1 flex">
        <div>
          <p> FRANÇAIS </p>
          <ul>
            <li>DOUBLE CLIQUEZ POUR OUVRIR LES IMAGES EN GRAND FORMAT</li>
            <li>CLIQUEZ ET DÉPLACEZ POUR TOURNER LA SPHERE</li>
            <li>SCROLLEZ POUR ZOOMER OU DÉZOOMER</li>
            <li>RÉINITIALISEZ VOTRE IMMERSION EN CLIQUANT SUR "NICOLAS HERMANN"</li>
            <li>DÉCOUVREZ SON TRAVAIL PLUS EN PRÉCISION EN CLIQUANT SUR "SÉRIES"</li>
          </ul>
          <button class="btnintro" data-lang="fr" href="<?=  $kirby->defaultLanguage()->url() ?>">→ entrer</button>
        </div>
      </div>
    </section>
  </div>