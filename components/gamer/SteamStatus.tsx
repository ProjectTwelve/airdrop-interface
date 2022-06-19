import Button from '../button';
import React, { useState } from 'react';
import classNames from 'classnames';
import { useAccount } from 'wagmi';
import { shortenSteamId } from '../../utils';
import { Tooltip } from '../tooltip';
import Pagination from 'rc-pagination';

export default function SteamStatus() {
  const { data: account } = useAccount();
  const [isSteamLogin] = useState(true);

  return (
    <div>
      {isSteamLogin ? (
        <div>
          <div className="mb-[30px] rounded-lg bg-p12-error/20 px-4 py-2 text-sm text-p12-error">
            We cannot find your profile. Please go to Privacy Settings, and set &apos;My profile&apos; to &apos;Public&apos;.
            &nbsp;&nbsp;
            <a className="text-p12-link" target="_blank" href="https://steamcommunity.com/id/linchengzzz/edit/info">
              Open on Steam &gt;
            </a>
          </div>
          <div className="flex items-center justify-between gap-4 md:flex-col md:items-start">
            <div className="flex gap-6">
              <img
                className="h-[78px] w-[78px] rounded-lg"
                src="https://avatars.cloudflare.steamstatic.com/6cfc2cdffb409479bc9551e5044b06a8c4260aa8_full.jpg"
                alt="avatar"
              />
              <div className="flex flex-col justify-around">
                <p className="text-[26px] font-medium">&quot;林成Zzz</p>
                <p className="">Steam ID: {shortenSteamId('76561198286964288')}</p>
              </div>
            </div>
            <div className="flex w-full max-w-[888px] rounded-2xl border border-p12-line py-[22px] xs:flex-col xs:py-0">
              {[
                { label: 'Total games', value: '--' },
                { label: 'Total playtime', value: '--' },
                {
                  label: (
                    <div className="flex items-center justify-center gap-1 text-p12-sub">
                      SS games
                      <Tooltip label="Super Saiyan Game: game playtime ≥ 1000 hours">
                        <img className="cursor-pointer" src="/svg/question.svg" alt="question" />
                      </Tooltip>
                    </div>
                  ),
                  value: '--',
                },
                {
                  label: (
                    <div className="flex items-center justify-center gap-1 text-p12-sub">
                      SS playtime
                      <Tooltip label="Total playtime of Super Saiyan games">
                        <img className="cursor-pointer" src="/svg/question.svg" alt="question" />
                      </Tooltip>
                    </div>
                  ),
                  value: '--',
                },
                { label: 'Steam years', value: '--' },
              ].map((item, index) => (
                <div
                  key={index}
                  className={classNames(
                    'flex flex-1 flex-col items-center justify-center border-r border-p12-line',
                    'xs:flex-row xs:gap-2 xs:border-r-0 xs:border-b xs:py-2',
                    'last:border-none',
                  )}
                >
                  <div className="text-sm text-p12-sub">{item.label}</div>
                  <div className="font-medium">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-8">
            <h3 className="mb-3 text-xl font-semibold">My Game List</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 md:grid-cols-1">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-2xl bg-p12-black/80 bg-[url(/img/bg_ss_game.png)] bg-right bg-no-repeat"
                >
                  <div className="relative z-10">
                    <div
                      className="float-left mr-4 flex h-[72px] w-full items-center justify-start bg-[#CEDCFF]/10 bg-cover"
                      style={{ maxWidth: 'min(33%, 168px)' }}
                    >
                      <img
                        src="https://cdn.p12.games/steam/apps/570/header.jpg"
                        className="h-auto w-full object-cover"
                        alt="header_image"
                      />
                    </div>
                    <div className="float-right h-[72px] pr-6 xs:hidden">
                      <div className="flex h-full items-center justify-center gap-3">
                        <p className="text-sm">Playtime</p>
                        <p className="font-['D-DIN'] text-2xl">1024 h</p>
                      </div>
                    </div>
                    <div className="truncate pt-3">
                      <p className="truncate font-medium">
                        <span className="mr-1.5 rounded bg-[#C859FF]/20 px-2 py-[1.5px] align-middle text-xs text-[#FC59FF]">
                          SS Game
                        </span>
                        DOTA 2
                      </p>
                      <div className="relative mt-1.5 flex h-[20px] flex-wrap gap-1.5">
                        <span className="rounded bg-p12-link/20 px-2 py-[1.5px] text-xs text-p12-link">Multi-player</span>
                      </div>
                    </div>
                    <div className="clear-both" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs">1-6 of 200</p>
              <Pagination simple total={200} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 xs:py-4">
          <Button type={account?.address ? 'bordered' : 'default'} className="w-[305px]" disabled={!account?.address}>
            Sign in with Steam
          </Button>
          <p className="mt-5 text-sm text-p12-sub">
            {account?.address
              ? 'We cannot access your profile. Please log in to your Steam account.'
              : 'Please connect your wallet first.'}
          </p>
        </div>
      )}
    </div>
  );
}
