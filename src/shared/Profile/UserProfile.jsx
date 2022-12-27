import { Link } from "react-router-dom";

const UserProfile = ({ userProfile, follow, setFollow }) => {
  const chatImg = `${process.env.PUBLIC_URL}/assets/img/icon-message-circle-line-profile.png`;
  const shareImg = `${process.env.PUBLIC_URL}/assets/img/icon-share.png`;

  const profileImg = userProfile.image;
  const followers = userProfile.followerCount;
  const followings = userProfile.followingCount;
  const accountname = userProfile.accountname;
  const intro = userProfile.intro;
  const username = userProfile.username;

  return (
    <section className="pt-[3rem] px-[5.5rem] pb-[2.6rem]">
      <h2 className="ir">유저 프로필</h2>
      <Link to="/profile/:accountname/followers" className="inline-block">
        <button type="button" className="text-[1rem] text-cst-gray">
          <span className="block text-[1.8rem] font-bold text-black">{followers}</span>
          followers
        </button>
      </Link>
      <img src={profileImg} alt="" className="inline-block w-[11rem] h-[11rem] ml-[4.3rem] mr-[3.6rem]" />
      <Link to="/profile/:accountname/followings" className="inline-block">
        <button type="button" className="text-[1rem] text-cst-gray">
          <span className="block text-[1.8rem] font-bold text-black">{followings}</span>
          followings
        </button>
      </Link>
      <p className="w-fit mx-auto mt-[1.6rem] text-[1.6rem] font-bold">{username}</p>
      <p className="w-fit mx-auto text-[1.2rem] text-cst-gray">@ {accountname}</p>
      <p className="w-fit mx-auto mt-[1.6rem] mb-[2.4rem] text-cst-gray">{intro}</p>
      <Link
        to="/chat"
        className="inline-flex justify-center items-center w-[3.4rem] h-[3.4rem] border-[0.1rem] border-cst-light-gray rounded-[30px] ml-[3.6rem] align-bottom"
      >
        <img src={chatImg} alt="" className="w-[2rem] h-[2rem]" />
      </Link>
      <button
        type="button"
        onClick={() => setFollow(!follow)}
        className={`h-[3.4rem] mx-[1rem] btn-lg ${follow ? "btn-on text-white" : "btn-cancle text-cst-gray"}`}
      >
        {follow ? "팔로우" : "언팔로우"}
      </button>
      <button
        type="button"
        to="/"
        className="inline-flex justify-center items-center w-[3.4rem] h-[3.4rem] border-[0.1rem] border-cst-light-gray rounded-[30px] align-bottom"
      >
        <img src={shareImg} alt="" className="w-[2rem] h-[2rem]" />
      </button>
    </section>
  );
};

export default UserProfile;