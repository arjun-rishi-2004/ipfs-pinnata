let files = [];

document.getElementById("uploadForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZTg0NzQ5MS0wNDMzLTQ3ZTMtYjcwOC03ZDU2ZTA1NTQ4ZDAiLCJlbWFpbCI6ImFyanVucmlzaGk0NzhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQzNzQ5YmQwYTMyOWJjMjQwNDMxIiwic2NvcGVkS2V5U2VjcmV0IjoiMjI3NzI4ZWI2ZTI1MTViZmQ1YzQ0YWFiNWI4ZGE5NDVlMmZlOWE3NjljZWVmM2Y4MDFlMjEzMGVlOTZlMTRmZSIsImlhdCI6MTcwODc5MDcyN30.XyvA5jKXVfvvZIL83ph85dUHL4oJ_UejZkM7yFcC3Tg"; // Replace with your JWT
  
  try {
    const res = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
    
    if (data.IpfsHash) {
      files.push({ name: formData.get("file").name, hash: data.IpfsHash });
      renderFiles();
    }
  } catch (error) {
    console.error(error);
  }
});

function renderFiles() {
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";
  
  files.forEach(file => {
    const fileItem = document.createElement("div");
    fileItem.textContent = file.name;
    
    const downloadLink = document.createElement("a");
    downloadLink.href = `https://gateway.pinata.cloud/ipfs/${file.hash}`;
    downloadLink.textContent = "Download";
    downloadLink.download = file.name;
    
    fileItem.appendChild(downloadLink);
    fileList.appendChild(fileItem);
  });
}
