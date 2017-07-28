<?php

require './vendor/autoload.php';
use Phroute\Phroute\RouteCollector;
$router = new RouteCollector();
$router->post('/users/', ['controllers\User','displayUser']);



?>

