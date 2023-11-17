import { useWallet } from "@solana/wallet-adapter-react";
import { buyEggs, hatchEggs, sellEggs, initialize } from "@/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUmi } from "@/pages/useUmi";
import { useRouter } from 'next/router';

export default function Body() {
  const wallet: any = useWallet();
  const [buyAmount, setBuyAmount] = useState<any>(0);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const umi: any = useUmi();

  const buyEggsHandler = async () => {

    if(!wallet?.publicKey){
      toast.info("Connect Wallet!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    if(buyAmount <= 0){
      toast.info("Please set amount", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    const id = toast.loading("Waiting BuyEggs...", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });

    const res = await buyEggs(umi.rpc["connection"], wallet, buyAmount, router.query);

    toast.update(id, {
      render: res.success ? "Successfully bought" : "Error",
      type: res.success ? "success" : "error",
      autoClose: 2000,
      isLoading: false,
    });
  };

  const hatchEggsHandler = async () => {

    if(!wallet?.publicKey){
      toast.info("Connect Wallet!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    const id = toast.loading("Waiting HatchEggs...", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });

    const res = await hatchEggs(umi.rpc["connection"], wallet);

    toast.update(id, {
      render: res.success ? "Successfully hatched" : "Error",
      type: res.success ? "success" : "error",
      autoClose: 2000,
      isLoading: false,
    });
  };

  const sellEggsHandler = async () => {

    if(!wallet?.publicKey){
      toast.info("Connect Wallet!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    const id = toast.loading("Waiting SellEggs...", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });

    const res = await sellEggs(umi.rpc["connection"], wallet);

    toast.update(id, {
      render: res.success ? "Successfully sold" : "Error",
      type: res.success ? "success" : "error",
      autoClose: 2000,
      isLoading: false,
    });
  };

  const copyRef = async () =>{
    
    if(!wallet?.publicKey){
      toast.info("Connect Wallet!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    navigator.clipboard.writeText(`${window.location.href}?refer=${wallet?.publicKey.toString()}`);

    toast.success("Copied", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });  
  }

  const getFreeShrimp = async () => {
    toast.info("Coming soon!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <>
      <div className="jumbotron">
        <p className="lead"></p>

        <div className="container altcolor">
          <div className="row">
            <div className="col-md-4">
              <img
                src="/assets/shrimp.png"
                width="150"
                height="150"
                alt="Shrimp"
              />
            </div>
            <div className="col-md-6">
              <h2>
                <span className="numshrimp">0</span> 🦐
              </h2>
              <br />
              <h2>
                Producing <span id="production">0</span> eggs per hour
              </h2>
            </div>
          </div>
          <div className="row">
            <p>
              <a
                id="getfreeshrimp"
                className="btn btn-lg btn-success invis"
                onClick={() => getFreeShrimp()}
                role="button"
              >
                Get Free Shrimp!
              </a>
            </p>
          </div>
        </div>
        <div className="container altcolor">
          <div className="col-md-12">
            <img src="/assets/shrimpegg.png" width="50" height="50" alt="Egg" />
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2>
                <span className="numeggs">0</span> Eggs
                <br />(<span id="timeuntilfull">?</span> until hatchery full)
              </h2>
            </div>
          </div>

          <div className="row">
            <br />
            <div className="col-md-12">
              <p>
                <a
                  className="btn btn-lg btn-success"
                  onClick={() => {
                    hatchEggsHandler();
                  }}
                  role="button"
                >
                  Hatch <span id="hatchshrimpquantity">?</span> Shrimp
                </a>
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <p>
                <a
                  className="btn btn-lg btn-info"
                  onClick={() => sellEggsHandler()}
                  role="button"
                >
                  Sell For <span id="sellprice">?</span>
                </a>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p>
                <span id="sellsforexample">1 egg sells for ?</span>
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <p>
              <span>Each transaction costs 1-3 SOL</span>
            </p>
          </div>
          <div className="col-md-12">
            <p>
              <span id="contractBal">Contract Balance: ?</span>
            </p>
          </div>
        </div>
        <div className="container altcolor">
          <div className="row">
            <div className="col-md-4">
              <img
                src="/assets/tron.svg"
                width="150"
                height="150"
                alt="Shrimp"
              />
            </div>
            <div className="col-md-7">
              <a
                className="btn btn-lg btn-info"
                onClick={() => buyEggsHandler()}
                role="button"
              >
                Buy
              </a>
              <h2>
                <span id="eggstobuy">?</span> eggs for{" "}
              </h2>
              <input
                className="form-control"
                type="number"
                style={{ width: "130px" }}
                onChange={(e) => {setBuyAmount(e.target.value);}}
                value={buyAmount}
                id="ethtospend"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>

      <div className="row marketing">
        <div className="col-lg-6">
          <h4>Earn Solana farming shrimp!</h4>
          <p>
            SOLANA Shrimp Farm is the #1 shrimp farming simulator and idle game
            on the network. The more shrimp you have, the more eggs they lay
            (each shrimp lays at a rate of 1 per day). Hatch more shrimp with
            your eggs to multiply your production, or cash them out for SOLANA!
          </p>

          <h4>Powered by SolanaLink</h4>
          <p>
            This game requires the{" "}
            <a href="https://chrome.google.com/webstore/detail/solanalink/ibnejdfjmmkpcnlpebklmnkoeoihofec">
              SolanaLink
            </a>{" "}
            extension for Chrome.
          </p>
        </div>

        <div className="col-lg-6">
          <h4>Automated Market</h4>
          <p>
            SOLANA Shrimp Farm features a high tech automated market that lets
            you instantly buy or sell shrimp eggs with a single transaction.
            Driven by supply and demand, the price automatically adjusts as
            players trade.
          </p>

          <h4>Referrals</h4>
          <p>
            Earn <b>10%</b> of the number of all eggs hatched by anyone who
            starts playing using your  &nbsp;
            <a onClick={() => copyRef()} id="playerreflink">
              link:
            </a>
          </p>

          <input
            style={{ display: "none" }}
            type="text"
            value="Hello Worldfdgerh"
            id="copytextthing"
          />
        </div>
      </div>
    </>
  );
}
