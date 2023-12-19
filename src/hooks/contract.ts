import { useContract, useContractWrite } from "@thirdweb-dev/react";
import myBeautyNftContract from "../../../artifacts/contracts/MyBeautyNft.sol/MyBeautyNft.json";
export const contractAddresse = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// export const { contract: contractThirdWeb } = useContract(contractAddresse, myBeautyNftContract.abi);

export function useMyBeautyNftContract() {
    const { contract } = useContract(contractAddresse, myBeautyNftContract.abi);
    const { mutateAsync: mint } = useContractWrite(contract, "mint");
    const { mutateAsync: presale } = useContractWrite(contract, "presale");

    return {
        contract,
        writtable: {
            mint,
            presale,
        },
    };
}
