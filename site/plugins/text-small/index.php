<?php

Kirby::plugin('theo/textsmall', [
    'tags' => [
        'text-small' => [
            'html' => function($tag) {
                return '<p class="text-small">' . $tag->value . '</>';
            }
        ]
    ]
]);