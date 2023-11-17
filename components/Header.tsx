import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.css";

const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

export default function Header() {

  return (
    <>
      <div className="header clearfix">
        <div className={styles.wallet}>
          <WalletMultiButtonDynamic />
        </div>
        <nav>
          <ul className="nav nav-pills pull-right">
            <li role="presentation">
              <a href="/assets/qrcode.png">WeChat (微信)</a>
            </li>
            <li role="presentation">
              <a href="https://discord.gg/dSJesca">Discord</a>
            </li>
            <li role="presentation">
              <a href="https://t.me/realsolanashrimp">Telegram</a>
            </li>
            <li role="presentation">
              <a href="https://solscan.org/#/contract/TH3eYUrotXiAbEBbfjHvnxC3dQPA4ZbZWe">
                Contract
              </a>
            </li>
            <li role="presentation">
              <a href="/cn">CN</a>
            </li>
          </ul>
        </nav>
        <h3>SOLANA Shrimp Farm</h3>
      </div>
    </>
  );
}
