<?php

return function ($page, $site) {

    $navigation = $site->navigation()->toStructure();

    return [
        'navigation' => $navigation
    ];

};