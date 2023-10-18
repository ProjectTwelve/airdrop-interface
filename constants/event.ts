export enum EventCategory {
  Global = 'global',
  Assets = 'assets',
}

export enum EventName {
  // wallet
  ConnectWallet = 'connect_wallet',
  ConnectResult = 'connect_result',
  DisconnectWallet = 'disconnect_wallet',
  ToLandingsite = 'to_landingsite',
  ToBridge = 'to_bridge',
  // invitation
  ToInvitation = 'to_invitation',
  CopyRefLink = 'copy_ref_link',
  ShareRefLink = 'share_ref_link',
  RefDetail = 'ref_detail',
  // collab
  CollabBanner = 'collab_banner',
  CollabCard = 'collab_card',
  // to sbt
  SbtEntrance = 'sbt_entrance',
  // sbt detail
  GetNftTask = 'get_nft_task',
  ClaimSbt = 'claim_sbt',
  UpgradeSbt = 'upgrade_sbt',
  SectionTab = 'section_tab',
  // arcana tab
  BecomeVoter = 'become_voter',
  CreateNow = 'create_now',
  DownloadPopup = 'download_popup',
  DownloadLink = 'download_link',
  EditorLoginVerify = 'editor_login_verify',
  ArcanaProfile = 'arcana_profile',
  ConnectTelegram = 'connect_telegram',
  ConnectTwitter = 'connect_twitter',
  ProfileSave = 'profile_save',
  ProfileCancel = 'profile_cancel',
  ViewCreations = 'view_creations',
  GetPl = 'get_pl',
  ReferralCopy = 'referral_copy',
  // steam gamer
  SignInSteam = 'sign_in_steam',
  ErrorReload = 'error_reload',
  OpenSteam = 'open_steam',
  ReloadStatus = 'reload_status',
  MyPoster = 'my_poster',
  // steam developer
  AddAppid = 'add_appid',
  GenerateCode = 'generate_code',
  CopyCode = 'copy_code',
  VerifyAppid = 'verify_appid',
  GuideClick = 'guide_click',
}
