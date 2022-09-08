<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nicolas Hermann - <?= $page->title() ?></title>
    <meta name="description" content="Nicolas Hermann est un artiste visuel qui utilise la photographie, la vidéo et le son pour investir sa relation au monde et à autrui. En favorisant l’installation, l’expérimentation et les collaborations, il place la transversalité au coeur de sa pratique pour multiplier les moyens d’expressions et d’expériences.">

    <link rel="apple-touch-icon" sizes="180x180" href="fav/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="fav/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="fav/favicon-16x16.png">
    <link rel="manifest" href="fav/site.webmanifest">
    <link rel="mask-icon" href="fav/safari-pinned-tab.svg" color="#5bbad5">

    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <?= css('assets/css/style.css') ?>
</head>
<body <?php if($page->template() == "serie"):?>class='scroll <?php if($page->bgdark()->toBool() === true){ echo "bg-dark"; }?>' <?php endif ?> >