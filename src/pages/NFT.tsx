import { useGoPlus } from "@hooks/useGoPlus";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputWithButton from "@components/Input";
import ScoreDisplay from "@components/ScoreDisplay";

import { ReactComponent as Twitter } from "@svg/twitter.svg";
import { ReactComponent as Discord } from "@svg/discord.svg";
import { ReactComponent as Globe } from "@svg/globe.svg";
import { title } from "process";
const NFT = () => {
  const { getNftInfo } = useGoPlus();
  const [nftInfo, setNftInfo] = useState<any>(null);
  const [score, setScore] = useState<number>(0);
  const [scanner, setScanner] = useState<string>(
    "https://etherscan.io/address"
  );

  const [holderScore, setHolderScore] = useState<number>(0);
  const [verificationScore, setVerificationScore] = useState<number>(0);
  const [socialScore, setSocialScore] = useState<number>(0);
  const [technicalScore, setTechnicalScore] = useState<number>(0);
  const [scamScore, setScamScore] = useState<number>(0);

  const { address } = useParams();
  useEffect(() => {
    if (address) {
      getNftInfo("1", address).then((res) => {
        if (res === null) {
          alert("Invalid address");
          window.location.href = "/";
        }

        setNftInfo(res);
      });
    }
  }, [address]);

  useEffect(() => {
    if (nftInfo) {
      let score = 0;
      if (nftInfo?.transfer_without_approval?.value === 0) score = score + 20;
      if (nftInfo?.transfer_without_approval?.value === 0) score = score + 20;
      if (nftInfo?.metadata_frozen) score = score + 20;
      if (nftInfo?.privileged_burn?.value === 0) score = score + 20;
      if (nftInfo?.privileged_minting?.value === 0) score = score + 20;
      setScore(score);
    }
  }, [nftInfo]);

  return (
    <div className="w-full h-screen bg-[#3396FF] bg-opacity-10 relative overflow-auto">
      {!nftInfo && (
        <div className="absolute w-full h-screen bg-gray-300 bg-opacity-60">
          <svg
            aria-hidden="true"
            className="w-32 h-32 text-white animate-spin fill-blue-600 mx-auto my-64"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <div className="w-1/2 flex mx-auto flex-col">
        {/*<div className="text-center font-bold text-2xl">
          Type in address & Check your score!
        </div>
        <div className="text-center font-bold text-2xl">Want to try?</div>
        <InputWithButton
          buttonText="Submit"
          onButtonClick={async (value: any) => {
            const res = await getNftInfo("1", value);
            setNftInfo(res);
            setScore(90);
          }}
        />*/}
        {true && (
          <div className="flex mx-auto flex-col font-kanit">
            <div className="text-center text-3xl font-bold my-5">
              NFT Security Score
            </div>
            <ScoreDisplay score={score} />
            <div className="container p-8 mx-auto xl:px-0 flex w-full flex-col mt-4 items-center justify-center text-center">
              <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                {nftInfo?.nft_name}
              </h2>
              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                The NFT Security Score is a metric that measures the security of
                this NFT.
              </p>
            </div>
            <div id="FAQ"></div>
            <div className="container p-8 mx-auto xl:px-0 !p-0">
              <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
                <div className="mb-5">
                  <Drawer title="Security">
                    <div className="px-4 mt-5">
                      <div className="w-full h-36 bg-gray-200 rounded-xl shadow-md">
                        <div className="p-3 border-b-2 border-gray-300 flex flex-row">
                          Is the NFT Creator verified?
                          {nftInfo?.nft_verified === 1 ? (
                            <div className="ml-auto mr-1 font-bold rounded-[1000px] bg-green-300 px-4">
                              Good
                            </div>
                          ) : (
                            <div className="ml-auto mr-1 font-bold rounded-[1000px] bg-red-300 px-4">
                              Danger
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          The NFT creator is validated by GoPlus.
                          <br /> You can trust the NFT.
                        </div>
                      </div>
                    </div>
                  </Drawer>
                </div>
                <div className="mb-5">
                  <Drawer title="Transfer">
                    <div className="px-4 mt-5">
                      <div className="w-full h-36 bg-gray-200 rounded-xl shadow-md">
                        <div className="p-3 border-b-2 border-gray-300 flex flex-row">
                          Transfer without approval
                          {nftInfo?.transfer_without_approval?.value === 0 ? (
                            <div className="ml-auto mr-1 font-bold rounded-[1000px] bg-green-300 px-4">
                              Good
                            </div>
                          ) : (
                            <div className="ml-auto mr-1 font-bold rounded-[1000px] bg-red-300 px-4">
                              Danger
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          This NFT can not be transferred without approval.
                          <br />
                          Your asset is SAFE.
                        </div>
                      </div>
                    </div>
                  </Drawer>
                </div>
                <div className="mb-5">
                  <Drawer title="Metadata">
                    <div className="px-4 mt-5">
                      <div className="w-full h-36 bg-gray-200 rounded-xl shadow-md">
                        <div className="p-3 border-b-2 border-gray-300 flex flex-row">
                          Metadata Frozen
                          {nftInfo?.metadata_frozen ? (
                            <div className="ml-auto mr-1 font-bold rounded-[1000px] bg-green-300 px-4">
                              Good
                            </div>
                          ) : (
                            <div className="ml-auto mr-1 font-bold rounded-[1000px] bg-red-300 px-4">
                              Danger
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          Is metadata Frozen? If not, the NFT metadata can be
                          changed.
                        </div>
                      </div>
                    </div>
                  </Drawer>
                </div>
                <div className="mb-5">
                  <Drawer title="Privileged Action">
                    <div className="px-4 mt-5">
                      <div className="w-full h-36 bg-gray-200 rounded-xl shadow-md">
                        <div className="p-3 border-b-2 border-gray-300 flex flex-row">
                          Priviliged Burn
                          {nftInfo?.privileged_burn?.value === 0 ? (
                            <div className="ml-auto mr-1 font-bold rounded-[1000px] bg-green-300 px-4">
                              Good
                            </div>
                          ) : (
                            <div className="ml-auto mr-1 font-bold rounded-[1000px] bg-red-300 px-4">
                              Danger
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          This category is about if the NFT has an privileged
                          address that can burn random NFTs.
                        </div>
                      </div>
                    </div>
                    <div className="px-4 mt-5">
                      <div className="w-full h-36 bg-gray-200 rounded-xl shadow-md">
                        <div className="p-3 border-b-2 border-gray-300 flex flex-row">
                          Priviliged Mint
                          {nftInfo?.privileged_minting?.value === 0 ? (
                            <div className="ml-auto mr-1 font-bold rounded-[1000px] bg-green-300 px-4">
                              Good
                            </div>
                          ) : (
                            <div className="ml-auto mr-1 font-bold rounded-[1000px] bg-red-300 px-4">
                              Danger
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          This category is about if the NFT has an privileged
                          address that can mint random NFTs.
                        </div>
                      </div>
                    </div>
                  </Drawer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFT;

const Drawer = ({ children, title }: { children: any; title: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-blue-500 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200"
        id="headlessui-disclosure-button-:r2:"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <span className="flex flex-row gap-3 items-center text-xl text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {title}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          aria-hidden="true"
          className=" w-5 h-5 text-indigo-500 rotate-180"
        >
          <path
            fill-rule="evenodd"
            d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      {open && <div>{children}</div>}
    </>
  );
};
