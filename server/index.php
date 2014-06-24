<?php

// Import(s)
require 'vendor/autoload.php';
require 'scripts/services/PhotosService.php';
require 'scripts/controllers/PhotosController.php';

// Constant(s)
$PHOTOS_PATH = './assets/images/photos';

// Register a new Slim app
$app = new \Slim\Slim();

// Medoo database settings
$database = new medoo(array(
  'database_type' => 'mysql',
  'database_name' => 'evelynvalle',
  'server' => 'database.evelynvalle.com',
  'username' => 'evelynvalle',
  'password' => 'lightupmylife'
));

// Initialize service(s)
$photosService = new PhotosService($database, $PHOTOS_PATH);

// Initialize controller(s)
$photosController = new PhotosController($app, $photosService);

// Initialize Slim app
$app->run();