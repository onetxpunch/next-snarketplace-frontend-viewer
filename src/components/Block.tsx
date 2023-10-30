import { DateTime } from "luxon";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { VscCheck } from "@react-icons/all-files/vsc/VscCheck";
import Link from "next/link";
import { VscChevronLeft } from "@react-icons/all-files/vsc/VscChevronLeft";
import { VscChevronRight } from "@react-icons/all-files/vsc/VscChevronRight";

const BlockQuery = graphql`
  query BlockQuery($blockHeight: Int!) {
    block(query: { blockHeight: $blockHeight }) {
      snarkFees
      blockHeight
      creatorAccount {
        publicKey
      }
      dateTime
      canonical
      creator
      receivedTime
      stateHash
      stateHashField
      txFees
      winnerAccount {
        publicKey
      }
    }
  }
`;

const Block = ({ blockHeight }: { blockHeight: number }) => {
  const { block } = useLazyLoadQuery<any>(BlockQuery, { blockHeight });
  return (
    <div className="flex flex-col gap-2">
      <h2 className="mb-4 text-3xl">
        <span className="font-black">Block</span> #{block.blockHeight}{" "}
        <div className="inline-flex gap-2">
          <Link href={`/block/${blockHeight - 1}`}>
            <VscChevronLeft className="bg-slate-200 text-slate-800 hover:text-emerald-800 rounded-lg border-[1px] border-slate-400 hover:bg-slate-100 cursor-pointer" />
          </Link>
          <Link href={`/block/${blockHeight + 1}`}>
            <VscChevronRight className="bg-slate-200 text-slate-800 hover:text-emerald-800 rounded-lg border-[1px] border-slate-400 hover:bg-slate-100 cursor-pointer" />
          </Link>
        </div>
      </h2>
      <div className="p-4 bg-white border-[1px] rounded-xl flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-800">Status:</span>
          <div className="text-green-600 p-2 border-[1px] border-green-600 bg-green-100 rounded flex gap-2 text-sm items-center">
            <VscCheck className="w-5 h-5 text-emerald-800" />{" "}
            <div>Finalized</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-800">
            Timestamp:
          </span>
          <div>
            {DateTime.fromISO(block.dateTime).toRelative()} ({block.dateTime})
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-800">
            Fee Recipient:
          </span>{" "}
          <Link href={`/address/${block.winnerAccount.publicKey}`}>
            {block.winnerAccount.publicKey.slice(0, 6) +
              "..." +
              block.winnerAccount.publicKey.slice(-6)}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-800">Tx Fees:</span>{" "}
          <span>{block.txFees / 10 ** 9} MINA</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-800">
            Snark Worker Fees:
          </span>{" "}
          <span>{block.snarkFees / 10 ** 9} MINA</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-800">
            State Hash:
          </span>
        </div>{" "}
        <div className="p-4 rounded border-[1px] border-slate-200 break-words bg-slate-100">
          {block.stateHashField}
        </div>
      </div>
    </div>
  );
};

export default Block;
