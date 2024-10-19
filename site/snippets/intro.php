<div class="introduction grid bg-dark absolute z-index-2">
    <div class="w-full h-full">
      <canvas class="mini-sphere"></canvas>
    </div>
    <section class="langs bg-dark">
      <div class="en f-1 flex items-ends">
        <div>
          <button class="btnintro" data-lang="en" href="<?= $kirby
              ->language("en")
              ->url() ?>">→ enter</button>
        </div>
      </div>
      <div class="fr f-1 flex">
        <div>
          <button class="btnintro" data-lang="fr" href="<?= $kirby
              ->defaultLanguage()
              ->url() ?>">→ entrer</button>
        </div>
      </div>
    </section>
  </div>
