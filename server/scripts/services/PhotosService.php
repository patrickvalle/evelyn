<?php class PhotosService {

  private $database;
  private $photosPath;
  private $THUMBNAIL_APPEND = '_thumbnail';

  public function __construct($database, $photosPath) {
    $this->database = $database;
    $this->photosPath = $photosPath;
  }

  /**
   * Returns an array of all photos in the system
   */
  public function listPhotos() {
    $photos = array();
    $data = $this->database->select('photos', '*');
    foreach($data as $photo) {
      $photo['created'] = strtotime($photo['created']) * 1000;
      array_push($photos, $photo);
    }
    return $photos;
  }

  /**
   * Reads from the file system and adds any new photos to the system
   */
  public function refreshPhotos() {
    // Build an array of the dates that already have photos
    $existingPhotoDates = array();
    foreach($this->listPhotos() as $existingPhoto) {
      array_push($existingPhotoDates, $existingPhoto['created']);
    }
    // Loop over all the photos in the photos directory and determine what's new
    $newPhotos = array();
    foreach (new DirectoryIterator($this->photosPath) as $file) {
      if(!$file->isDot()) {
        $filenameWithExtension = $file->getFilename();
        $dateString = preg_replace('/\\.[^.\\s]{3,4}$/', '', $filenameWithExtension);
        $isThumbnail = strpos($dateString, $this->THUMBNAIL_APPEND) > -1;
        if($isThumbnail) {
          $dateString = substr($dateString, 0, strpos($dateString, $this->THUMBNAIL_APPEND));
        }
        if(!in_array(strtotime($dateString) * 1000, $existingPhotoDates)) {
          if($isThumbnail) {
            $newPhotos[$dateString]['thumbnail'] = $filenameWithExtension;
          }
          else {
            $newPhotos[$dateString]['image'] = $filenameWithExtension;
          }
        }
      }
    }
    // Add new photos to the database
    foreach($newPhotos as $date => &$photo) {
      if(array_key_exists('thumbnail', $photo) && array_key_exists('image', $photo)) {
        $this->database->insert('photos', [
          'thumbnail' => $photo['thumbnail'],
          'image' => $photo['image'],
          'created' => $date
        ]);
        $photo['added'] = true;
       }
       else {
        $photo['added'] = false;
       }
    }
    return $newPhotos;  
  }

}