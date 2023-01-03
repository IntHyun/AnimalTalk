import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import api from "../../api/axios";

const UserProfile = ({ pageProfile, setIsUpload, editAccountname }) => {
  const chatImg = `${process.env.PUBLIC_URL}/assets/img/icon-message-circle-line-profile.png`;
  const shareImg = `${process.env.PUBLIC_URL}/assets/img/icon-share.png`;
  const defaultProfile = `${process.env.PUBLIC_URL}/assets/img/profile-woman-large.png`;

  const [isFollow, setIsFollow] = useState(pageProfile.isfollow);
  const [followers, setFollowers] = useState(pageProfile.followerCount);
  const [followings, setFollowings] = useState(pageProfile.followingCount);

  const profileImg = pageProfile.image;
  const pageAccount = pageProfile.accountname;
  const intro = pageProfile.intro;
  const username = pageProfile.username;

  const { accountname } = useContext(UserContext);
  const [myAccountname, setMyAccountname] = useState(accountname);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    if (!editAccountname) return;
    setMyAccountname(editAccountname);
  }, [editAccountname]);

  const followReq = async () => {
    // 로그인한 사용자의 토큰으로 상대방 계정이 포함된 api url 통신을 하여야 함
    const res = await api.post(
      `/profile/${pageAccount}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIsFollow(res.data.profile.isfollow);
    setFollowers(res.data.profile.followerCount);
    setFollowings(res.data.profile.followingCount);
  };

  const unfollowReq = async () => {
    const res = await api.delete(`/profile/${pageAccount}/unfollow`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsFollow(res.data.profile.isfollow);
    setFollowers(res.data.profile.followerCount);
    setFollowings(res.data.profile.followingCount);
  };

  return (
    <section className="pt-[3rem] px-[5.5rem] pb-[2.6rem]">
      <h2 className="ir">유저 프로필</h2>
      <section className="flex flex-row items-center mx-[auto]">
        <Link
          to={`/profile/${pageAccount}/followers`}
          className="inline-block align-baseline text-[1rem] text-cst-gray"
        >
          <span className="block text-[1.8rem] font-bold text-center text-black">{followers}</span>
          followers
        </Link>
        <img
          onError={(e) => {
            e.target.src = defaultProfile;
          }}
          src={profileImg}
          alt=""
          className="inline-block w-[11rem] h-[11rem] ml-[4.1rem] mr-[4.1rem] rounded-[50%]"
        />
        <Link
          to={`/profile/${pageAccount}/followings`}
          className="inline-block align-baseline text-[1rem] text-cst-gray"
        >
          <span className="block text-[1.8rem] font-bold text-center text-black">{followings}</span>
          followings
        </Link>
      </section>
      <p className="w-fit mx-auto mt-[1.6rem] text-[1.6rem] font-bold">{username}</p>
      <p className="w-fit mx-auto text-[1.2rem] text-cst-gray">@ {pageAccount}</p>
      <p className="w-fit mx-auto mt-[1.6rem] mb-[2.4rem] text-cst-gray">{intro}</p>

      {pageAccount === myAccountname ? (
        <section className="block text-center">
          <button
            type="button"
            onClick={() => navigate(`/profile/${myAccountname}/edit`)}
            className="mr-[1.2rem] btn-lg btn-cancel text-cst-gray"
          >
            프로필 수정
          </button>
          <button
            type="button"
            onClick={() => navigate(`/profile/${myAccountname}/clubupload`)}
            className="btn-lg btn-cancel text-cst-gray"
          >
            모임 만들기
          </button>
        </section>
      ) : (
        <section className="block text-center mx-[auto]">
          <button
            type="button"
            onClick={() => navigate("/chat")}
            className="inline-flex justify-center items-center w-[3.4rem] h-[3.4rem] border-[0.1rem] border-cst-light-gray rounded-[30px] align-bottom cursor-pointer"
          >
            <img src={chatImg} alt="" className="w-[2rem] h-[2rem]" />
          </button>
          <button
            type="button"
            onClick={() => {
              isFollow ? unfollowReq() : followReq();
              setIsUpload((prev) => !prev);
            }}
            className={`mx-[1rem] btn-lg ${isFollow ? "btn-cancel text-cst-gray" : "btn-on text-white"}`}
          >
            {isFollow ? "언팔로우" : "팔로우"}
          </button>
          <button
            type="button"
            className="inline-flex justify-center items-center w-[3.4rem] h-[3.4rem] border-[0.1rem] border-cst-light-gray rounded-[30px] align-bottom cursor-pointer"
          >
            <img src={shareImg} alt="" className="w-[2rem] h-[2rem]" />
          </button>
        </section>
      )}
    </section>
  );
};

export default UserProfile;
