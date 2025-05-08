
<?php
$data = json_decode(file_get_contents("php://input"), true);
$nomor = $data["nomor"];
$file = "nomor.json";
$db = json_decode(file_get_contents($file), true);
if (!in_array($nomor, $db)) {
  $db[] = $nomor;
  file_put_contents($file, json_encode($db, JSON_PRETTY_PRINT));

  // Push ke GitHub
  $githubToken = "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";
  $repo = "ALxyz572/Alpin";
  $path = "AlpinDTBS.json";

  $url = "https://api.github.com/repos/$repo/contents/$path";
  $content = base64_encode(json_encode($db, JSON_PRETTY_PRINT));
  $sha = json_decode(file_get_contents($url), true)["sha"];
  $data = [
    "message" => "Menambahkan nomor baru",
    "content" => $content,
    "sha" => $sha
  ];
  $opts = [
    "http" => [
      "method" => "PUT",
      "header" => "Content-Type: application/json\r\nAuthorization: token $githubToken\r\nUser-Agent: PHP",
      "content" => json_encode($data)
    ]
  ];
  file_get_contents($url, false, stream_context_create($opts));
  echo json_encode(["success" => true, "message" => "Nomor ditambahkan & diupload ke GitHub"]);
} else {
  echo json_encode(["success" => false, "message" => "Nomor sudah ada"]);
}
?>
