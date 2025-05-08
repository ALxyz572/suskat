const userID = "admin";
const password = "12345";
const GITHUB_TOKEN = "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";
const REPO = "Alpin";
const OWNER = "ALxyz572";
const FILE_NAME = "AlpinDTB.json";
const BRANCH = "main";

function login() {
  const inputUser = document.getElementById("userID").value;
  const inputPass = document.getElementById("password").value;
  if (inputUser === userID && inputPass === password) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("addNomorSection").style.display = "block";
  } else {
    alert("Login gagal, coba lagi.");
  }
}

async function addNomor() {
  const nomor = document.getElementById("nomor").value.trim();
  const status = document.getElementById("status");
  if (!nomor) {
    status.innerText = "Nomor tidak boleh kosong.";
    return;
  }

  status.innerText = "Menyimpan...";
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_NAME}`;
  const headers = {
    "Authorization": `token ${GITHUB_TOKEN}`,
    "Accept": "application/vnd.github.v3+json"
  };

  const getFile = await fetch(url, { headers });
  const json = await getFile.json();
  let content = atob(json.content);
  let data = [];
  try {
    data = JSON.parse(content);
  } catch (e) {
    data = [];
  }

  data.push({ nomor });

  const updatedContent = btoa(JSON.stringify(data, null, 2));

  const body = {
    message: `Menambah nomor ${nomor}`,
    content: updatedContent,
    sha: json.sha,
    branch: BRANCH
  };

  const res = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body)
  });

  if (res.ok) {
    status.innerText = "Nomor berhasil ditambahkan!";
    document.getElementById("nomor").value = "";
  } else {
    status.innerText = "Gagal menyimpan.";
  }
}
