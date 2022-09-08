<?php snippet('header') ?>

<main data-router-wrapper>
  <section data-router-view="about" id="about">
    <a class="absolute mob-hide btn-close" style="right: -1rem; top: 0.5rem; left: unset;" href="#">
      <span class="close"></span>
    </a>

    <button class="nav-action fixed">+</button>

    <nav class="offscreen-nav">
      <span class="f-1">Nicolas Hermann</span>
      <div class="flex f-3 dir-column">
        <span class="mb-3">séries</span>
        <a class="mb-1" href="lookout.html">Look out</a>
        <a class="mb-1" href="salviadivinorum.html">Salvia Divinorum</a>
        <a class="mb-1" href="laniakea.html">Laniakea</a>
        <a class="mb-1" href="mark.html">Mark</a>
        <a class="mb-1" href="distortion.html">Distortion</a>
      </div>
      <a class="mb-4 f-1" href="./about.html">à propos</a>
      <a data-router-disabled class="mb-4" href="./index.html">expérience</a>
    </nav>

    <div class="about-grid">
      <div class="bio darkbg">
       <p>Nicolas Hermann est un artiste visuel qui utilise la photographie, la vidéo et le son pour investir sa relation au monde et à autrui. En favorisant l’installation, l’expérimentation et les collaborations, il place la transversalité au coeur de sa pratique pour multiplier les moyens d’expressions et d’expériences. Il intègre de façon continue de nouvelles techniques d’impression ou de prises de vue à son travail, que ce soit pour les tirages, le montage ou les livres. Influencé par le cinéma d’anticipation et l’astronomie, il évolue dans un univers hypersensibilisé, nocturne et liminaire, qui permet de décontextualiser êtres et objets et de les inscrire dans de nouvelles relations.</p>
      </div>

      <div class="parcour lighter-shadow flex dir-column">
        <p>Nicolas Hermann expose son premier travail, « Distortion », en 2016 aux Nuits Photographiques de Pierrevert et au 70e anniversaire de l’Union Méditerranéenne pour l’Art Moderne, à Menton, puis le montre en 2017 dans la catégorie film expérimental au festival du premier court-métrage de Pontault-Combault.En 2018, suite à deux résidences d’artiste à Marfa (États-Unis) avec les Beaux-Arts de Nantes, puis à la Galerie Artlab à Beyrouth (Liban), il expose pour la première fois « Laniakea » avec un solo show à la Galerie Artlab puis en 2019 à l’École des Beaux-Arts de Nantes. C’est également, en 2019 toujours, que le Studio f/16 à Paris, montre son travail « Mark ». En 2020, il participe à la 69e édition de « Jeune Création », à Komuna, à Romainville, puis au festival InCadaqués en Espagne. Son travail « Look Out » a été exposé du 30 janvier au 27 mars 2022 lors du « PEP New Talents 2021 », à la Kommunale Galerie de Berlin, (Allemagne). </br> Le film « 17 000 », dont il est le directeur de la photographie, a été projeté le 27.05.22 à Athènes lors du festival ADD. </p>
          <div class="contact flex mt-auto">
            <section>
              <p class="mb-1 mt-2">CONTACT</p>

              <div class="mb-1">
                <a class="block" href="mailto:contact@nicolashermann.com">CONTACT@NICOLASHERMANN.COM</a>

                <a href="">+33 6 14 86 82 76</a>
              </div>

              <ul class="justify-center mb-1">
                <li><a href="https://www.instagram.com/nicolashermann" target="_blank">INSTAGRAM</a></li>
                <li><a href="https://vimeo.com/nicolashermann" target="_blank">VIMEO</a></li>
                <li><a href="https://linktr.ee/nicolashermann" target="_blank">LINKTREE</a></li>
              </ul>

              <ul>
                <li><a href="http://siloenouyrit.fr/" target="_blank">Design : Siloé Nouyrit</a></li>
                <li><a href="https://shimsham.design/" target="_blank">Code : Théo Paolo G.</a></li>
              </ul>
            </section>
      </div>
    </div>

  </section>
</main>

<?= js ('assets/js/about.js') ?>
<?php snippet('footer') ?>
