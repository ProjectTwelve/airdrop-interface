import React from 'react';
import { useRecoilValue } from 'recoil';
import { arcanaOmgInviteCountAtom } from '../../../store/arcana/state';

// type OMGPredictionProps = {
//   isEnd?: boolean;
//   item?: PredictionItemData;
//   answer?: PredictionAnswer;
//   votes?: number;
// };

export default function OMGPrediction() {
  // const [isSubmit, setIsSubmit] = useRecoilState(arcanaPredictionOMGSubmitAtom);
  // const GAS_LIMIT = 200000;
  // const { chain } = useNetwork();
  // const { address } = useAccount();
  // const { mutateAsync } = useArcanaAnswer();
  // const arcanaContract = useArcanaContract();
  // const forwarderContract = useForwarderContract();
  // const { signTypedDataAsync } = useSignTypedData();
  // const isObserver = useRecoilValue(arcanaObserverAtom);
  // const omgAnswer = useRecoilValue(arcanaPredictionOMGAnswerAtom);
  const omgCount = useRecoilValue(arcanaOmgInviteCountAtom);
  // const setInviteDialog = useSetRecoilState(arcanaInviteDialogAtom);
  // const predictionAnswer = useRecoilValue(arcanaPredictionAnswerAtom);
  // const isGenesisNFTHolder = useRecoilValue(arcanaGenesisNFTHolderAtom);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [openDialog, setOpenDialog] = useState<boolean>(false);
  // const { switchNetwork, isLoading: isSwitchNetworkLoading } = useSwitchNetwork({ chainId: ARCANA_CHAIN_ID });
  // const answerSelect = useMemo(() => {
  //   if (answer && answer.answer && answer.answer[0]) return answer.answer[0];
  // }, [answer]);

  // const onDialogClick = () => {
  //   if (isObserver || !address || !isGenesisNFTHolder || isEnd) return;
  //   setOpenDialog(true);
  // };

  // const onSignAnswer = async () => {
  //   if (!address || !chain) return;
  //   if (chain.id !== ARCANA_CHAIN_ID) {
  //     switchNetwork?.();
  //     return;
  //   }
  //   if (!answerSelect) return;
  //   try {
  //     setIsLoading(true);
  //     const answers: PredictionAnswer[] = [];
  //     omgAnswer.forEach((item) => {
  //       if (item.answer && item.answer.length > 0) {
  //         answers.push({ predictionCode: item.predictionCode, answer: [objectSortByKey(item.answer[0])] });
  //       }
  //     });
  //     predictionAnswer.forEach((item) => {
  //       if (item.answer && item.answer.length > 0) {
  //         answers.push({ predictionCode: item.predictionCode, answer: [objectSortByKey(item.answer[0])] });
  //       }
  //     });
  //     const hash = await getIpfsAnswer({ answers });
  //     const ipfsURL = 'ipfs://' + hash;
  //     const tx = await arcanaContract.populateTransaction.updateAnswerUri(BigNumber.from(address), ipfsURL);
  //     const nonce = await forwarderContract.getNonce(address);
  //     tx.gasLimit = tx.gasLimit || GAS_LIMIT;
  //     const signature = await signTypedDataAsync(getArcanaSignTypeData(forwarderContract, tx, nonce));
  //     const params: PredictionAnswerParams = {
  //       walletAddress: address,
  //       ipfsUrl: ipfsURL,
  //       nonce: nonce.toString(),
  //       signature,
  //       txData: tx.data,
  //       gasLimit: tx.gasLimit,
  //       answers,
  //     };
  //     mutateAsync(params).then(({ code, msg }) => {
  //       if (code !== 200) {
  //         toast.error(<Message message={msg} title="Ah shit, here we go again" />);
  //         return;
  //       }
  //       toast.success(<Message message="Congratulations! Invite friends for more bounties!" title="Mission Complete" />);
  //       setIsSubmit(true);
  //     });
  //     setIsLoading(false);
  //   } catch (e: any) {
  //     if (e.code === 4001) setIsLoading(false);
  //   }
  // };

  return (
    <div className="relative w-full max-w-[412px]">
      <div className="grid grid-cols-1 gap-4">
        <div className="h-[136px] rounded-lg bg-omg-count bg-cover">
          <p className="mt-[28px] text-center text-sm font-medium">My OMG Invitees</p>
          <p className="mt-[20px] text-center font-ddin text-[36px] font-semibold text-p12-gold">{omgCount.inviteCount}</p>
        </div>
        <div className="h-[136px] rounded-lg bg-omg-count bg-cover">
          <p className="mt-[28px] text-center text-sm font-medium">Votes from Invitees</p>
          <p className="mt-[20px] text-center font-ddin text-[36px] font-semibold text-p12-gold">{omgCount.inviteVotes}</p>
        </div>
      </div>
    </div>
  );
}
