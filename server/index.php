<?php

// Global config
require 'config.php';

// Import(s)
require 'vendor/autoload.php';
require 'scripts/services/PhotosService.php';
require 'scripts/controllers/PhotosController.php';

// Register a new Slim app
$app = new \Slim\Slim();

// Medoo database settings
$database = new medoo(array(
  'database_type' => $CONFIG['database']['type'],
  'database_name' => $CONFIG['database']['name'],
  'server'        => $CONFIG['database']['host'],
  'username'      => $CONFIG['database']['user'],
  'password'      => $CONFIG['database']['pass']
));

// Initialize service(s)
$photosService = new PhotosService($database, $CONFIG['app']['photos_path']);

// Initialize controller(s)
$photosController = new PhotosController($app, $photosService);

// Initialize Slim app
$app->run();