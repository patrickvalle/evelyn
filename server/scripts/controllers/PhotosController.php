<?php class PhotosController {

  private $app;
  private $service;

  public function __construct(&$app, $service) {
    $this->service = $service;
    $this->app = $app;
    $this->registerRoutes();
  }

  private function registerRoutes() {

    /**
     * Lists all photos
     */
    $this->app->get('/photos', function () {
      $data = $this->service->listPhotos();
      echo json_encode($data);
    });

    /**
     * Scans for new photos.
     * Yes, I know this is a hack, but I'm a new father and don't have time for this shit.
     */
    $this->app->get('/photos/refresh', function () {
      $data = $this->service->refreshPhotos();
      echo json_encode($data);
    });

  }
  
}