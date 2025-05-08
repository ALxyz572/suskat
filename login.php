
<?php
$data = json_decode(file_get_contents("php://input"), true);
$user = $data["username"];
$pass = $data["password"];
$db = json_decode(file_get_contents("akun.json"), true);
foreach ($db as $akun) {
  if ($akun["user"] === $user && $akun["pass"] === $pass) {
    echo json_encode(["success" => true]);
    exit;
  }
}
echo json_encode(["success" => false, "message" => "Username atau password salah"]);
?>
