# Solana Shrimp

## How to config for project
- pages/_app.tsx

    const network = WalletAdapterNetwork.Devnet; // you can change your network

    const network = WalletAdapterNetwork.Mainnet;

    const network = WalletAdapterNetwork.Testnet;

    or

    const endpoint = useMemo(() => clusterApiUrl(network), [network]); // you can change your rpc url

    const endpoint = "https://api.mainnet-beta.solana.com"

    const endpoint = "https://api.devnet.solana.com";
    
    const endpoint = "http://localhost:8899"

- config.tsx

    export const SHRIMP_PROGRAM_ID = new PublicKey("9T95SiuoW8a5BFyJW39ZZuh6hfz3aTMiHzNVi4vfr2G9");

    export const DEV_WALLET = new PublicKey("A1AbmtDJqgU5PxJsCJkh9CMrzGCgeyrwu3UHn9tWyn3t");


