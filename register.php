
<?php
$data = json_decode(file_get_contents("php://input"), true);
$user = $data["username"];
$pass = $data["password"];
$db = json_decode(file_get_contents("akun.json"), true);
foreach ($db as $akun) {
  if ($akun["user"] === $user) {
    echo json_encode(["success" => false, "message" => "Username sudah terdaftar"]);
    exit;
  }
}
$db[] = ["user" => $user, "pass" => $pass];
file_put_contents("akun.json", json_encode($db, JSON_PRETTY_PRINT));
echo json_encode(["success" => true, "message" => "Berhasil daftar"]);
?>
