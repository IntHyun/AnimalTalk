import React, { useState } from "react";

const SimpleUserList = (props) => {
  // Note::아래 변수는 임시로 구현했으며, 실제로는 API와 props를 사용합니다.
  const tmpImg = `${process.env.PUBLIC_URL}/assets/img/profile-man-small.png`;
  const isBtn = true;
  const userName = "사용자 이름";
  // Note::아래 셋 중 하나가 사용됩니다. nullish를 사용해서 0이 아닌 null 값이 들어가야 됩니다.
  const accountName = "계정 아이디";
  const content = "프로필 소개글";
  const chat = "마지막 대화 내역";
  // Note::useState(false)안의 인자값을 props로 받고 이벤트 발생 시 axios로 데이터를 전송하는 건 어떨까요?
  const [isFollow, setIsFollow] = useState(false);

  const handleIsFollow = () => {
    setIsFollow(!isFollow);
    // Note::form 대신 이 부분에서 axios를 통해서 데이터를 보내면 될 거 같습니다.
  };

  // Note::호출하는 부모태그(ul)에 mt-[20px]이 들어가야 합니다.
  return (
    <li className="w-[358px] h-[50px] mx-auto mb-[16px] flex justify-between items-center">
      <img src={tmpImg} alt="" className="w-[50px] h-[50px]" />
      <div className="mr-auto ml-[12px]">
        <strong className="font-medium">{userName}</strong>
        <p className="text-[12px] text-[#767676]">{accountName ?? content ?? chat}</p>
      </div>

      {isBtn ? (
        <button
          onClick={handleIsFollow}
          type="button"
          className={`btn-sm ${isFollow ? "btn-on text-white" : "btn-cancle text-[#767676]"}`}
        >
          {isFollow ? "팔로우" : "취소"}
        </button>
      ) : (
        <></>
      )}
    </li>
  );
};

export default SimpleUserList;
