import { Amount, ErgoAddress, OutputBuilder, SByte, SColl, SConstant, SGroupElement, SSigmaProp, TransactionBuilder } from "@fleet-sdk/core";
import { first } from "@fleet-sdk/common";

const ERGONAMES_PROXY_ADDRESS = "34sQ9WYJ67tfGss9Za6jpiM6s1F9QAV2GR2Cvc3N5zJFVTuqTo68R9tBktFuwTZ7C67QX8xutEsV7Rsn8wUZno67EcRAf9hJ8wKZr6NDseFK6J3aCk76i3VWD3uqrnwqkQX1hEK8MVu1uXhoizUuKkuNQtKwYeMUK6yG3B3id4SoeQzgx24pqJEgw6cTjrNirjib7ossgbk3WDMCGpQt6htYDZWcmBPALxaxjrZWBRBsdNeVWFZckZ";

declare var ergo: {
    get_utxos(amount: number): Promise<any>;
    sign_tx(tx: any): Promise<any>;
    submit_tx(tx: any): Promise<any>;
  }
  

export async function sendTransaction(name: string, receiverAddress: string) {
    console.log("sendTransaction", name, receiverAddress);
    let currentHeight = await getCurrentHeight();
    let amountToSend = 1000000000 + 1100000;
    let amount: Amount = amountToSend.toString();
    let inputs = await ergo.get_utxos(amountToSend);
    console.log("inputs", inputs);

    let receiverErgoAddress = ErgoAddress.fromBase58(receiverAddress);

    let nameInHex = Buffer.from(name, "utf8").toString("hex");

    const unsignedTransaction = new TransactionBuilder(currentHeight)
        .from(inputs)
        .to(new OutputBuilder(amount, ERGONAMES_PROXY_ADDRESS)
            .setAdditionalRegisters({
                R4: SConstant(SColl(SByte, nameInHex)),
                R5: SConstant(SSigmaProp(SGroupElement(first(receiverErgoAddress.getPublicKeys())))),
            })
        )
        .sendChangeTo(receiverAddress)
        .payMinFee()
        .build()
        .toEIP12Object();

    let signedTransaction = await ergo.sign_tx(unsignedTransaction);
    let txInfo = await ergo.submit_tx(signedTransaction);
    return { transactionInfo: txInfo };
}

async function getCurrentHeight() {
    let url = "https://api-testnet.ergoplatform.com/api/v1/info";
    let response = await fetch(url);
    let json = await response.json();
    return json.height;
}