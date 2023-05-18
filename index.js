import './styles.css';

const inputMessage = document.getElementById("inputMessage");
const signButton = document.getElementById("signButton");
const outputMessage = document.getElementById('outputMessage');


signButton.addEventListener('click', handleMetamaskClick);

async function handleMetamaskClick() {
  if (typeof window.ethereum !== "undefined") {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    const message = inputMessage.value;

    if (message) {
      const params = [message, account];
      const method = "personal_sign";

      window.ethereum
        .request({ method, params })
        .then((signature) => {
          console.log("签名结果:", signature);
          outputMessage.textContent = `签名结果：${signature}`;
        })
        .catch((error) => {
          console.error("签名失败:", error);
          alert("签名失败，请查看控制台以获取详细信息。");
        });
    } else {
      alert("请输入要签名的字符串。");
    }
  } else {
    alert("请安装MetaMask插件。");
  }
}
